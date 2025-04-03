import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { quoteId } = await req.json();

  const exists = await prisma.favoriteQuote.findFirst({
    where: {
      userId: session.user.id,
      quoteId,
    },
  });

  if (exists) {
    return NextResponse.json({ message: "Already favorited" });
  }

  await prisma.favoriteQuote.create({
    data: {
      userId: session.user.id,
      quoteId,
    },
  });

  return NextResponse.json({ message: "Favorited!" });
}
