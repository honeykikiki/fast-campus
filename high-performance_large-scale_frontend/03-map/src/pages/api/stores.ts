import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse, StoreType } from '@/interface';

import prisma from '@/db';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

interface queryProps {
  page?: string;
  id?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const { page = '', id, limit = '10', q, district }: queryProps = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else if (req.method === 'PUT') {
    // 데이터 수정
    const formData = req.body;
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    // 데이터 삭제
    if (id) {
      const result = await prisma.store.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json(result);
    } else {
      return res.status(500).json(null);
    }
  } else {
    // GET 요청 처리
    if (page) {
      const count = await prisma.store.count();
      const skipPage = parseInt(page) - 1;
      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        take: parseInt(limit),
        skip: skipPage * 10,
        where: {
          name: q ? { contains: q } : {},
          address: district ? { contains: district } : {},
        },
      });

      res.status(200).json({
        data: stores,
        page: parseInt(page),
        totalCount: count,
        totalPage: Math.floor(count / 10),
      });
    } else {
      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: {
          id: id ? parseInt(id) : {},
        },
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {},
          },
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
