import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, nickname, password } = await req.json();

  if (!email || !nickname || !password) {
    return NextResponse.json({ message: "필수값 누락" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "이미 존재하는 이메일입니다." },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "회원가입 성공", userId: user.id },
    { status: 201 }
  );
}
