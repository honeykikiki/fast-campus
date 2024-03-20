import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse, StoreType } from '@/interface';

import prisma from '@/db';
import axios from 'axios';

interface queryProps {
  page?: string;
  id?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page = '', id, limit = '10', q, district }: queryProps = req.query;
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
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.floor(count / 10),
      });
    } else {
      const stores = await prisma.store.findMany({
        orderBy: { id: 'asc' },
        where: { id: id ? parseInt(id) : {} },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
