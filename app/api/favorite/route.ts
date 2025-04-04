import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// 좋아요 여부 확인
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ liked: false });

  const { searchParams } = new URL(req.url);
  const quoteId = Number(searchParams.get("quoteId"));

  if (!quoteId) {
    return NextResponse.json({ liked: false });
  }

  const existing = await prisma.favoriteQuote.findUnique({
    where: {
      userId_quoteId: {
        userId: Number(session.user.id), // 🔥 중요!
        quoteId,
      },
    },
  });

  return NextResponse.json({ liked: !!existing });
}

// 좋아요 추가
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { quoteId } = body;
  if (!quoteId) {
    return NextResponse.json({ error: "Missing quoteId" }, { status: 400 });
  }

  try {
    await prisma.favoriteQuote.create({
      data: {
        userId: Number(session.user.id),
        quoteId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "이미 좋아요 되어 있음 또는 DB 오류" },
      { status: 500 }
    );
  }
}

// 좋아요 취소
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { quoteId } = body;
  if (!quoteId) {
    return NextResponse.json({ error: "Missing quoteId" }, { status: 400 });
  }

  try {
    await prisma.favoriteQuote.delete({
      where: {
        userId_quoteId: {
          userId: Number(session.user.id),
          quoteId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
