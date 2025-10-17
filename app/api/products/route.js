import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // read query params
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    // build where filter dynamically
    const where = {};

    if (brand) {
      where.brand = {
        contains: brand,
        mode: "insensitive", // case-insensitive
      };
    }

    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive",
      };
    }

    const products = await prisma.watch.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
