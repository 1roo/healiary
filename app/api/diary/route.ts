import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hexToHSL, getMoodFromHSL } from "@/lib/colorUtils";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, moodColor } = await req.json();

  // ✅ 명확하게 숫자로 변환
  const userId = Number(session.user.id);

  // 🔍 타입 확인 로그
  console.log("userId value:", userId, "type:", typeof userId);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  // ✅ HEX → HSL 변환
  const { hue, saturation, lightness } = hexToHSL(moodColor);

  // ✅ 감정 자동 분류
  const interpretedMood = getMoodFromHSL(hue, lightness);

  await prisma.diary.create({
    data: {
      userId,
      title,
      content,
      moodColor,
      moodHue: hue,
      moodSaturation: saturation,
      moodLightness: lightness,
      interpretedMood,
    },
  });

  return NextResponse.json({ message: "Created" });
}
