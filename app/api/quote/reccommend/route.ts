import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 가장 최근 다이어리 가져오기
  const latestDiary = await prisma.diary.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!latestDiary) {
    return NextResponse.json({ error: "No diary found" }, { status: 404 });
  }

  const emotion = latestDiary.interpretedMood; // 예: "슬픔", "행복"

  // 감정 태그가 일치하는 명언 중 하나 추천
  const quotes = await prisma.quote.findMany({
    where: { emotionTag: emotion },
  });

  if (!quotes.length) {
    return NextResponse.json({ error: "No quote found for this emotion" }, { status: 404 });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return NextResponse.json({ quote: randomQuote });
}
