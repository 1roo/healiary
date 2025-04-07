// app/api/diary/today/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // KST 기준 오늘 날짜 범위 계산
  const now = new Date();
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const startOfDayKST = new Date(
    kstNow.getFullYear(),
    kstNow.getMonth(),
    kstNow.getDate()
  );
  const startOfDayUTC = new Date(startOfDayKST.getTime() - 9 * 60 * 60 * 1000);
  const endOfDayUTC = new Date(startOfDayUTC.getTime() + 24 * 60 * 60 * 1000);

  const diary = await prisma.diary.findFirst({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfDayUTC,
        lt: endOfDayUTC,
      },
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ diary });
}
