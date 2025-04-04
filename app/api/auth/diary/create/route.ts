import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { message: "인증되지 않았습니다." },
      { status: 401 }
    );
  }

  const { title, content, moodColor } = await req.json();

  try {
    const diary = await prisma.diary.create({
      data: {
        userId: Number(session.user.id),
        title,
        content,
        moodColor,
        moodHue: 0, // 추후 색상 분석 시 계산
        moodSaturation: 0,
        moodLightness: 0,
        interpretedMood: "분석 예정",
      },
    });

    return NextResponse.json({ message: "일기 저장 완료", diary });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "서버 에러" }, { status: 500 });
  }
}
