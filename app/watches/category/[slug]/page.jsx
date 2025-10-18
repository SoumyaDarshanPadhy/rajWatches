// app/watches/category/[slug]/page.jsx

import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react"; 

// A Helper component to display the price, extracted for clean rendering
const PriceDisplay = ({ price, discountedPrice }) => {
    // Format the number for Indian Rupees (₹)
    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const finalPrice = discountedPrice || price;

    return (
        <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-gray-900"> 
                {formatPrice(finalPrice)}
            </span>
            {discountedPrice && (
                <span className="text-gray-400 line-through text-sm font-medium">
                    {formatPrice(price)}
                </span>
            )}
        </div>
    );
};

export default async function CategoryPage({ params, searchParams }) {
    // FIX APPLIED: Await params and searchParams before accessing properties.
    const slug = await params.slug; 
    const brand = await searchParams?.brand || null; 

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
            <div className="min-h-[50vh] flex items-center justify-center p-10 text-xl text-gray-500 font-medium bg-white w-full">
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

    const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
    
    // -------------------------------------------------------------------------
    // RENDER: NO RESULTS FOUND
    // -------------------------------------------------------------------------
    if (!watches.length) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-10 bg-white text-gray-800">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
                <h2 className="text-2xl font-semibold mb-2">No Products Available</h2>
                <p className="mb-6 text-gray-600 text-center max-w-md">
                    We couldn't find any watches for the criteria: 
                    <span className="font-semibold text-gray-800"> {categoryTitle} </span>
                    {brand && <span className="font-semibold text-gray-800"> in the "{brand}" brand.</span>}
                </p>
                <Link 
                    href="/watches/category/all" 
                    className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition duration-300 border border-indigo-500 hover:border-indigo-800 px-4 py-2 rounded-full"
                >
                    Browse All Watches <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>
        );
    }
    
    // -------------------------------------------------------------------------
    // RENDER: PRODUCT LISTING
    // -------------------------------------------------------------------------
    return (
        <section className="bg-white min-h-screen w-full"> 
            <div className="max-w-7xl mx-auto py-16 px-4 md:px-8">
                
                {/* Header / Title Section */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        {brand ? (
                            <span className="text-indigo-600">{brand}'s</span>
                        ) : (
                            <span className="text-indigo-600">Shop</span>
                        )}{" "}
                        {categoryTitle} Watches
                    </h1>
                    <p className="mt-2 text-xl text-gray-500">
                        Showing {watches.length} items.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
                    {watches.map((watch) => {
                        
                        // 🔥 FIX FOR IMAGE URL CONCATENATION/INVALID UPSTREAM RESPONSE:
                        // Safely convert the 'images' field to an array if it's stored as a comma-separated string,
                        // otherwise use it directly (assuming it's already an array from Prisma).
                        const imagesArray = Array.isArray(watch.images) 
                            ? watch.images 
                            : (typeof watch.images === 'string' ? watch.images.split(',') : []); 

                        return (
                            <Link
                                key={watch.id}
                                href={`/watches/product/${watch.id}`}
                                className="group block rounded-xl p-4 bg-white transition duration-300 transform hover:shadow-2xl hover:scale-[1.03] overflow-hidden" 
                            >
                                {/* Image Container with Aspect Ratio */}
                                <div className="relative w-full aspect-[4/5] h-56 mb-4 overflow-hidden rounded-lg shadow-md bg-gray-100">
                                    <Image
                                        // Use the first element of the safely processed array
                                        src={imagesArray[0] || "/placeholder.jpg"}
                                        alt={watch.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className="object-cover transition duration-500 group-hover:scale-105" 
                                        priority={true} 
                                    />
                                </div>

                                {/* Product Details */}
                                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{watch.brand}</p>
                                <h2 className="text-base md:text-lg font-bold text-gray-800 truncate transition mt-1">
                                    {watch.name}
                                </h2>

                                {/* Price Display using the helper component */}
                                <PriceDisplay price={watch.price} discountedPrice={watch.discountedPrice} />
                                
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}