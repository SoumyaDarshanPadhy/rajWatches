// app/watches/category/[slug]/page.jsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

export default async function CategoryPage({ params, searchParams }) {
  const slug = params.slug; 
  const brand = searchParams?.brand || null; 

  // Map URL slug to DB category (Logic Unchanged)
  const categoryMap = {
    men: "Guys Watch",
    women: "Girls Watch",
    wallclocks: "Wall Watch",
    all: "all",
  };

  const dbCategory = categoryMap[slug?.toLowerCase()];

  if (!dbCategory) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-10 text-xl text-gray-500 font-medium">
        Invalid category "{slug}"
      </div>
    );
  }

  // Build Prisma query (Logic Unchanged)
  const where = {};
  if (dbCategory !== "all") where.category = { equals: dbCategory, mode: "insensitive" };
  if (brand) where.brand = { contains: brand, mode: "insensitive" };

  // Fetch watches from database (Logic Unchanged)
  const watches = await prisma.watch.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  if (!watches.length) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-10 text-xl text-gray-600">
        <p className="mb-2">
          No products found for **{slug}**
          {brand ? <span className="font-semibold"> with brand "{brand}"</span> : ""}
        </p>
        {/* Link color changed to a shade of gray/slate */}
        <Link href="/watches/category/all" className="flex items-center text-slate-600 hover:text-slate-800 transition duration-300">
          <ArrowRight className="w-4 h-4 mr-1" /> Browse All Watches
        </Link>
      </div>
    );
  }

  return (
    // Main background changed to white
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto bg-white"> 
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-gray-800 capitalize tracking-tight">
        {/* Highlight color changed to a shade of gray/slate */}
        {brand ? (
            <span className="text-slate-600">{brand}</span>
        ) : (
            <span className="text-slate-600">Explore</span>
        )}{" "}
        {slug} Watches
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {watches.map((watch) => (
          <Link
            key={watch.id}
            href={`/watches/product/${watch.id}`}
            // Card background changed to a little darker shade (light gray)
            className="group block rounded-xl p-3 bg-gray-50 border border-gray-200 shadow-sm transition duration-300 transform hover:shadow-lg hover:scale-[1.02] overflow-hidden" 
          >
            {/* Image Container with Aspect Ratio */}
            <div className="relative w-full aspect-[4/5] md:h-72 lg:h-64 mb-4 overflow-hidden">
              <Image
                src={watch.images?.[0] || "/placeholder.jpg"}
                alt={watch.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="rounded-lg object-cover transition duration-500 group-hover:scale-105" 
                priority={true} 
              />
            </div>

            {/* Product Details */}
            <h2 className="text-base md:text-lg font-bold text-gray-800 truncate group-hover:text-slate-700 transition">
              {watch.name}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">{watch.brand}</p>

            {/* Price Display */}
            <div className="mt-2 flex items-baseline gap-2">
              {/* Price color changed to a shade of gray/slate */}
              <span className="text-xl font-extrabold text-slate-700"> 
                ₹{watch.discountedPrice || watch.price}
              </span>
              {watch.discountedPrice && (
                <span className="text-gray-400 line-through text-sm font-medium">
                  ₹{watch.price}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}