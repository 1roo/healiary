import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const diary = await prisma.diary.findFirst({
    where: { userId: Number(session.user.id) },
    orderBy: { createdAt: "desc" },
  });

  if (!diary) {
    return NextResponse.json({ diary: null });
  }

  return NextResponse.json({ diary });
}
