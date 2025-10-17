import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
  try {
    const data = await prisma.watch.findMany(); // example query
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}