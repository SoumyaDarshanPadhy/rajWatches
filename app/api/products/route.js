import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params; // must await

    // Try by string id first, then by numeric id if not found
    let product = await prisma.watch.findUnique({ where: { id } });

    if (!product) {
      const maybeNum = Number(id);
      if (!Number.isNaN(maybeNum)) {
        product = await prisma.watch.findUnique({ where: { id: maybeNum } });
      }
    }

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


// import prisma from "@/lib/prisma";

// export async function GET(request, { params }) {
//   try {
//     // CRITICAL: await params before using its properties in Next.js dynamic route handlers
//     const { id } = await params;

//     // If your Prisma id is numeric, uncomment the next line:
//     // const where = { id: Number(id) };
//     const where = { id };

//     const product = await prisma.watch.findUnique({
//       where,
//     });

//     if (!product) {
//       return new Response(JSON.stringify({ error: "Product not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify(product), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// import prisma from "@/lib/prisma";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     // read query params
//     const brand = searchParams.get("brand");
//     const category = searchParams.get("category");

//     // build where filter dynamically
//     const where = {};

//     if (brand) {
//       where.brand = {
//         contains: brand,
//         mode: "insensitive", // case-insensitive
//       };
//     }

//     if (category) {
//       where.category = {
//         contains: category,
//         mode: "insensitive",
//       };
//     }

//     const products = await prisma.watch.findMany({
//       where,
//       orderBy: { createdAt: "desc" },
//     });

//     return new Response(JSON.stringify(products), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to fetch products" }),
//       { status: 500 }
//     );
//   }
// }
