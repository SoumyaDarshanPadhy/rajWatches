// app/api/products/[id]/route.js
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // IMPORTANT: await params before using its properties
    const { id } = await params;

    // Try by string id first
    let product = await prisma.watch.findUnique({ where: { id } });

    // If not found and id looks numeric, try Number(id)
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












// // app/api/products/[id]/route.js
// import prisma from "@/lib/prisma";

// export async function GET(request, { params }) {
//   try {
//     // IMPORTANT: await params before using its properties
//     const { id } = await params;

//     // Try by string id first
//     let product = await prisma.watch.findUnique({ where: { id } });

//     // If not found and id looks numeric, try Number(id)
//     if (!product) {
//       const maybeNum = Number(id);
//       if (!Number.isNaN(maybeNum)) {
//         product = await prisma.watch.findUnique({ where: { id: maybeNum } });
//       }
//     }

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












// // import prisma from "@/lib/prisma";

// // export async function GET(request, { params }) {
// //   try {
// //     const { id } = params;

// //     const product = await prisma.watch.findUnique({
// //       where: { id },
// //     });

// //     if (!product) {
// //       return new Response(
// //         JSON.stringify({ error: "Product not found" }),
// //         { status: 404 }
// //       );
// //     }

// //     return new Response(JSON.stringify(product), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   } catch (error) {
// //     console.error("Error fetching product:", error);
// //     return new Response(
// //       JSON.stringify({ error: "Failed to fetch product" }),
// //       { status: 500 }
// //     );
// //   }
// // }