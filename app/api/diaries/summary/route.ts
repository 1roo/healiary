import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { formatKoreanDate, toKSTDateString } from "@/utils/formatKoreanDate";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const diaries = await prisma.diary.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        createdAt: true,
        moodColor: true,
      },
    });

    const summary = diaries.map((d) => ({
      id: d.id,
      date: toKSTDateString(d.createdAt),
      formattedDate: formatKoreanDate(d.createdAt),
      moodColor: d.moodColor,
    }));

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching diary summaries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
