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
    const category = searchParams.get("category");
    const brandsString = searchParams.get("brands");
    const sort = searchParams.get("sort"); // ✅ new: sort param
    const brands = brandsString ? brandsString.split(",") : [];

    const whereClause = {};

    // ✅ Category filter
    if (category && category.toLowerCase() !== "all") {
      whereClause.category = { equals: category, mode: "insensitive" };
    }

    // ✅ Price filter
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      whereClause.price = { lte: parseFloat(maxPrice) };
    }

    // ✅ Brand filter (case-insensitive)
    if (brands.length > 0) {
      whereClause.brand = {
        in: brands.map((b) => b.toLowerCase()),
        mode: "insensitive",
      };
    }

    // ✅ Sorting logic
    let orderBy = { createdAt: "desc" };
    if (sort === "asc") orderBy = { price: "asc" };
    if (sort === "desc") orderBy = { price: "desc" };

    // ✅ Count total
    const totalWatches = await prisma.watch.count({ where: whereClause });
    const totalPages = Math.ceil(totalWatches / limit) || 1;

    // ✅ Fetch paginated watches
    const watches = await prisma.watch.findMany({
      where: whereClause,
      orderBy,
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
  