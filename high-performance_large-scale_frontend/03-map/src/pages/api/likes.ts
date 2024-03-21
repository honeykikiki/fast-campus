import type { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import prisma from '@/db';
import { authOptions } from './auth/[...nextauth]';
import { LikeType } from '@/interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeType | LikeType[] | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    // 권한 없음
    return res.status(401);
  }

  if (req.method === 'POST') {
    // 찜하기 로직
    const { storeId }: { storeId: number } = req.body;

    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: session.user.id,
      },
    });

    // 이미 찝을 한 경우 해당 like 데이터 삭제 아닌경우 생성
    if (like) {
      like = await prisma.like.delete({
        where: { id: like.id },
      });

      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user.id,
        },
      });

      return res.status(201).json(like);
    }
  } else if (req.method === 'GET') {
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId: session.user.id,
      },
      include: {
        store: true,
      },
    });

    return res.status(200).json(likes);
  }
}
