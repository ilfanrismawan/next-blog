import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  content: { params: { id: string } }
) => {
  const id = Number(content.params.id) || 0;

  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ post });
};
