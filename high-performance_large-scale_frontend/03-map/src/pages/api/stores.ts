import type { NextApiRequest, NextApiResponse } from 'next';
import { StoreApiResponse, StoreType } from '@/interface';

import prisma from '@/db';

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
