import { NextResponse } from "next/server";
import { connectDB } from "@/lib/prisma";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: "✅ MongoDB Connected!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Connection failed" });
  }
}