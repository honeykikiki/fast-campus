import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { CommentApiResponse, CommentType } from "@/interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ResponseType {
  id?: string;
  user?: boolean;
  page?: string;
  limit?: string;
  storeId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentApiResponse | CommentType>
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    id,
    user = false,
    page = "1",
    limit = "10",
    storeId = "",
  }: ResponseType = req.query;

  if (req.method === "POST") {
    if (!session?.user) {
      // 권한 없음
      return res.status(401);
    }

    // 댓글 생성
    const { storeId, body } = req.body;
    let data = await prisma.comment.create({
      data: {
        storeId: storeId,
        body: body,
        userId: session.user.id,
      },
    });

    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    if (!session?.user || !id) {
      // 권한 없음
      return res.status(401);
    }

    const result = await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json(result);
  } else if (req.method === "GET") {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
    });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
        store: true,
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalCount: count,
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
