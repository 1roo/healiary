import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Received params:", params); // params가 제대로 들어오는지 확인

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is missing" }, { status: 400 });
  }

  try {
    const diary = await prisma.diary.findUnique({
      where: { id: Number(id) },
    });

    if (!diary) {
      return NextResponse.json({ error: "Diary not found" }, { status: 404 });
    }

    return NextResponse.json({ diary });
  } catch (error) {
    console.error("Error while fetching diary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
