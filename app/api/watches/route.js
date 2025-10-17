import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxPrice = searchParams.get("price");
    const gender = searchParams.get("gender"); // reserved
    const brandsString = searchParams.get("brands");
    const brands = brandsString ? brandsString.split(",") : [];
    const category = searchParams.get("category"); // ⚡ NEW: category filter

    const whereClause = {};

    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      whereClause.price = { lte: parseFloat(maxPrice) };
    }

    if (category && category.toLowerCase() !== "all") {
      whereClause.category = { equals: category, mode: "insensitive" };
    }

    if (brands.length > 0) {
      whereClause.brand = { in: brands };
    }

    const watches = await prisma.watch.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        images: true,
        modelNumber: true,
        discountedPrice: true,
        category: true,
        description: true,
        inStock: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { status: "success", count: watches.length, data: watches },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching filtered watches:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to retrieve watch listings.", details: error.message },
      { status: 500 }
    );
  }
}