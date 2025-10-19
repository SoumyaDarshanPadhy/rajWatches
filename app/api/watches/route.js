import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    // Filters
    const maxPrice = searchParams.get("price");
    const category = searchParams.get("category"); // category filter
    const brandsString = searchParams.get("brands");
    const brands = brandsString ? brandsString.split(",") : [];

    // Build where clause
    const whereClause = {};

    // Category filter applied only if provided and not "all"
    if (category && category.toLowerCase() !== "all") {
      whereClause.category = { equals: category, mode: "insensitive" };
    }

    // Price filter applied only if provided
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      whereClause.price = { lte: parseFloat(maxPrice) };
    }

    // Brand filter applied only if provided
    if (brands.length > 0) {
      whereClause.brand = { in: brands };
    }

    // Total count for pagination (always consider category)
    const totalWatches = await prisma.watch.count({ where: whereClause });
    const totalPages = Math.ceil(totalWatches / limit) || 1;

    // Fetch paginated watches
    const watches = await prisma.watch.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        discountedPrice: true,
        images: true,
        category: true,
        inStock: true,
        modelNumber: true,
        description: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        page,
        totalPages,
        count: watches.length,
        data: watches,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching watches:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve watches.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}