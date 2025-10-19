import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await prisma.watch.findUnique({ where: { id } });

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  // Normalize image URLs
  const imageUrls = Array.isArray(product?.images)
    ? product.images.flatMap((s) =>
        typeof s === "string" ? s.match(/https?:\/\/\S+/g) || [] : []
      )
    : [];

  return (
    <section className="p-6 md:p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl">
      <div>
        {imageUrls.length ? (
          <Image
            src={imageUrls[0]}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover w-full h-auto shadow-md"
          />
        ) : (
          <div className="bg-gray-100 w-full h-[400px] flex items-center justify-center text-gray-400 rounded-xl">
            No Image
          </div>
        )}

        {imageUrls.length > 1 && (
          <div className="flex gap-3 mt-3 overflow-x-auto">
            {imageUrls.slice(1).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                width={100}
                height={100}
                className="rounded-md object-cover cursor-pointer hover:opacity-80 transition"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            {product.name}
          </h1>
          <p className="text-gray-500 text-lg mb-4">{product.brand}</p>

          <div className="flex items-center gap-4 mb-5">
            <span className="text-2xl font-semibold text-blue-600">
              ₹{product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹{product.price}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Link
            href={`/checkout?productId=${product.id}`}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Buy Now
          </Link>

          <Link
            href={`/watches/category/all`}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Shop
          </Link>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {product.inStock > 0
            ? `In Stock: ${product.inStock}`
            : "Out of stock"}
        </p>
      </div>
    </section>
  );
}