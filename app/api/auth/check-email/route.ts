import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "이메일이 필요합니다." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  return NextResponse.json({ exists: !!user });
}
