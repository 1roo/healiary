import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  // 세션이 없으면 401 Unauthorized 응답
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 세션이 있으면 userId를 이용해 최신 일기 불러오기
    const diary = await prisma.diary.findFirst({
      where: { userId: Number(session.user.id) },
      orderBy: { createdAt: "desc" }, // 최신 일기부터
    });

    // 일기가 없으면 diary: null 반환
    if (!diary) {
      return NextResponse.json({ diary: null });
    }

    // 일기가 있으면 반환
    return NextResponse.json({ diary });
  } catch (error) {
    console.error("일기 불러오기 실패", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
