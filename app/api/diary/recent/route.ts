import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 최근 7일간의 일기 불러오기
    const diaries = await prisma.diary.findMany({
      where: {
        userId: Number(session.user.id),
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // 최근 7일
        },
      },
      orderBy: {
        createdAt: "desc", // 최신 순으로
      },
    });

    return NextResponse.json({ diaries });
  } catch (error) {
    console.error("최근 7일 일기 불러오기 실패", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
