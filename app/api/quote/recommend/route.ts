// app/api/quote/recommend/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const quotes = await prisma.quote.findMany({
    take: 10,
  });

  if (!quotes.length) {
    return NextResponse.json({ error: "No quotes found" }, { status: 404 });
  }

  return NextResponse.json({ quotes });
}
