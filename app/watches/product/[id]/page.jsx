import useWishlist from '@/components/useWishlist';
import prisma from "@/lib/prisma";
import LuxeButtons from "@/components/LuxeButtons";
import Gallery from "@/components/Gallery";
import { Heart, User, ShoppingBag } from "lucide-react";

/**
 * ProductPage - server component
 */
export default async function ProductPage({ params }) {
  const { id } = params;

  const product = await prisma.watch.findUnique({ where: { id } });

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  const imageUrls = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const DEBUG_LOCAL_IMAGE = "/mnt/data/Screenshot 2025-11-24 at 15.32.07.png";
  const galleryImages = imageUrls.length ? imageUrls : [DEBUG_LOCAL_IMAGE];

  function highlight(label, ...keys) {
    const desc = product?.description || "";
    for (let key of keys) {
      const regex = new RegExp(`${key}\\s*:?\\s*(.+)`, "i");
      const match = desc.split("*").map(l => l.trim()).find(l => regex.test(l));
      if (match) return match.match(regex)?.[1]?.trim();
    }
    return null;
  }
  function ProductActions({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();

  const inWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <button
      onClick={() => toggleWishlist(product)}
      aria-label="Add to wishlist"
      className={`flex items-center justify-center w-10 h-10 rounded-full border transition
        ${inWishlist ? 'bg-[#c2ab72] text-white border-[#c2ab72]' : 'bg-white text-[#c2ab72] border-[#c2ab72]'}`}
    >
      <Heart
        size={18}
        className={inWishlist ? 'fill-current' : ''}
      />
    </button>
  );
}
  const highlights = [
    { label: "Brand", value: product.brand },
    { label: "Gender", value: highlight("Gender", "gender") },
    { label: "Strap Material", value: highlight("Strap Material", "strap material") },
    { label: "Strap Color", value: highlight("Strap Color", "strap color") },
    { label: "Glass Material", value: highlight("Glass Material", "glass material") },
    { label: "Warranty", value: highlight("Warranty", "warranty period", "warranty detail") },
    { label: "Dial Color", value: highlight("Dial Color", "dial color") },
    { label: "Movement", value: highlight("Movement", "movement") },
  ].filter(h => h.value);

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-[#f6f3ee] min-h-screen w-full flex py-0">
      <div className="w-full flex flex-col lg:flex-row max-w-[1600px] mx-auto px-0 pt-10 gap-12">
        {/* Gallery */}
        <div className="flex-1 flex flex-col items-center xl:items-end pl-0 xl:pl-36">
          <Gallery images={galleryImages} productName={product.name} />
        </div>

        {/* Product details */}
        <div className="flex-1 flex flex-col justify-center px-6 xl:pl-0 xl:pr-28">

          {/* ICONS: Wishlist, Account, Cart */}
          <div className="flex items-center space-x-8 text-[#232323] mb-4">
            <a href="/wishlist" className="hover:text-[#c2ab72]" aria-label="Wishlist">
              <Heart size={26} />
            </a>
            <a href="/account" className="hover:text-[#c2ab72]" aria-label="User Account">
              <User size={26} />
            </a>
            <a href="/cart" className="hover:text-[#c2ab72]" aria-label="Shopping Cart">
              <ShoppingBag size={26} />
            </a>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-[2.7rem] xl:text-5xl font-extrabold text-[#23221d] mt-6 mb-7 leading-tight tracking-tight"
            style={{ letterSpacing: '-0.015em', lineHeight: '1.09' }}
          >
            {product.name}
          </h1>

          <div className="flex items-center gap-8 mb-8">
            <span className="uppercase font-sans text-lg font-bold tracking-widest text-[#b89f56]">
              {product.brand}
            </span>
            <span className="text-[2.2rem] font-extrabold text-[#23221d] pt-1">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="bg-[#fff9ed] border border-[#ead199] rounded-2xl py-9 px-9 shadow mb-12 max-w-2xl">
            <h2 className="text-[1.25rem] font-serif font-bold text-[#ac9247] mb-5 tracking-widest">
              Product Highlights
            </h2>
            <table className="w-full text-[1.09rem] font-medium">
              <tbody>
                {highlights.map((h, idx) => (
                  <tr key={idx} className="border-b border-[#eedfa2]/40 last:border-0">
                    <td className="pr-3 py-3 text-[#7f7755] w-56" style={{ fontWeight: 540 }}>
                      {h.label}
                    </td>
                    <td className="pl-3 py-3 text-[#23221d]">{h.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LuxeButtons product={product} />
        </div>
      </div>
    </div>
  );
}



// // app/watches/product/page.jsx
// import prisma from "@/lib/prisma";
// import LuxeButtons from "@/components/LuxeButtons";
// import Gallery from "@/components/Gallery";
// import { Heart, User, ShoppingBag } from "lucide-react";


// /**
//  * ProductPage - server component
//  * Ensure params usage is correct: params is passed as prop { params }
//  */
// export default async function ProductPage({ params }) {
//   const { id } = params;

//   const product = await prisma.watch.findUnique({ where: { id } });

//   if (!product) {
//     return (
//       <div className="p-10 text-center text-red-600 font-semibold">
//         Product not found.
//       </div>
//     );
//   }

//   // === SIMPLE, RELIABLE IMAGE PARSING ===
//   // product.images is expected to be an array of image URLs (strings).
//   // Do NOT attempt to re-parse with regex; just filter falsy values.
//   const imageUrls = Array.isArray(product.images) ? product.images.filter(Boolean) : [];

//   // Debug/test fallback: if imageUrls empty, include local debug screenshot path
//   // (Developer note: your environment may not serve /mnt/data paths - this is only for local debugging)
//   const DEBUG_LOCAL_IMAGE = "/mnt/data/Screenshot 2025-11-24 at 15.32.07.png";
//   const galleryImages = imageUrls.length ? imageUrls : [DEBUG_LOCAL_IMAGE];

//   // Highlight parsing (keeps previous approach but safe)
//   function highlight(label, ...keys) {
//     const desc = product?.description || "";
//     for (let key of keys) {
//       const regex = new RegExp(`${key}\\s*:?\\s*(.+)`, "i");
//       const match = desc.split("*").map(l => l.trim()).find(l => regex.test(l));
//       if (match) return match.match(regex)?.[1]?.trim();
//     }
//     return null;
//   }
//   const highlights = [
//     { label: "Brand", value: product.brand },
//     { label: "Gender", value: highlight("Gender", "gender") },
//     { label: "Strap Material", value: highlight("Strap Material", "strap material") },
//     { label: "Strap Color", value: highlight("Strap Color", "strap color") },
//     { label: "Glass Material", value: highlight("Glass Material", "glass material") },
//     { label: "Warranty", value: highlight("Warranty", "warranty period", "warranty detail") },
//     { label: "Dial Color", value: highlight("Dial Color", "dial color") },
//     { label: "Movement", value: highlight("Movement", "movement") },
//   ].filter(h => h.value);

//   const formatPrice = (value) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(value);

//   return (
//     <div className="bg-[#f6f3ee] min-h-screen w-full flex py-0">
//       <div className="w-full flex flex-col lg:flex-row max-w-[1600px] mx-auto px-0 pt-10 gap-12">
//         {/* Gallery */}
//         <div className="flex-1 flex flex-col items-center xl:items-end pl-0 xl:pl-36">
//           <Gallery images={galleryImages} productName={product.name} />
//         </div>

//         {/* Product details */}
//         <div className="flex-1 flex flex-col justify-center px-6 xl:pl-0 xl:pr-28">
//           <h1
//             className="font-serif text-[2.7rem] xl:text-5xl font-extrabold text-[#23221d] mt-6 mb-7 leading-tight tracking-tight"
//             style={{ letterSpacing: '-0.015em', lineHeight: '1.09' }}
//           >
//             {product.name}
//           </h1>

//           <div className="flex items-center gap-8 mb-8">
//             <span className="uppercase font-sans text-lg font-bold tracking-widest text-[#b89f56]">
//               {product.brand}
//             </span>
//             <span className="text-[2.2rem] font-extrabold text-[#23221d] pt-1">
//               {formatPrice(product.price)}
//             </span>
//           </div>

//           <div className="bg-[#fff9ed] border border-[#ead199] rounded-2xl py-9 px-9 shadow mb-12 max-w-2xl">
//             <h2 className="text-[1.25rem] font-serif font-bold text-[#ac9247] mb-5 tracking-widest">
//               Product Highlights
//             </h2>
//             <table className="w-full text-[1.09rem] font-medium">
//               <tbody>
//                 {highlights.map((h, idx) => (
//                   <tr key={idx} className="border-b border-[#eedfa2]/40 last:border-0">
//                     <td className="pr-3 py-3 text-[#7f7755] w-56" style={{ fontWeight: 540 }}>
//                       {h.label}
//                     </td>
//                     <td className="pl-3 py-3 text-[#23221d]">{h.value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <LuxeButtons product={product} />
//         </div>
//       </div>
//     </div>
//   );
// }




// // import prisma from "@/lib/prisma";
// // import LuxeButtons from "@/components/LuxeButtons";
// // import Gallery from "@/components/Gallery"; // Make sure this is in your components/

// // export default async function ProductPage({ params }) {
// //   const { id } = await params;
// //   const product = await prisma.watch.findUnique({ where: { id } });

// //   if (!product) {
// //     return (
// //       <div className="p-10 text-center text-red-600 font-semibold">
// //         Product not found.
// //       </div>
// //     );
// //   }

// //   // Parse images for gallery
// //   const imageUrls = Array.isArray(product.images)
// //   ? product.images.flatMap(s => typeof s === "string"
// //       ? s.match(/https?:\/\/\S+/g) || []
// //       : [])
// //   : [];

// // //   const imageUrls = Array.isArray(product.images)
// // //     ? product.images.flatMap((s) =>
// // //         typeof s === "string"
// // //           ? s.match(/https?:\/\/\S+/g) || []
// // //           : []
// // //       )
// // //     : [];

// //   // Improved highlight parsing
// //   function highlight(label, ...keys) {
// //     const desc = product?.description || "";
// //     for (let key of keys) {
// //       const regex = new RegExp(`${key}\\s*:?\\s*(.+)`, "i");
// //       const match = desc.split("*").map(l => l.trim()).find(l => regex.test(l));
// //       if (match) return match.match(regex)?.[1]?.trim();
// //     }
// //     return null;
// //   }
// //   const highlights = [
// //     { label: "Brand", value: product.brand },
// //     { label: "Gender", value: highlight("Gender", "gender") },
// //     { label: "Strap Material", value: highlight("Strap Material", "strap material") },
// //     { label: "Strap Color", value: highlight("Strap Color", "strap color") },
// //     { label: "Glass Material", value: highlight("Glass Material", "glass material") },
// //     { label: "Warranty", value: highlight("Warranty", "warranty period", "warranty detail") },
// //     { label: "Dial Color", value: highlight("Dial Color", "dial color") },
// //     { label: "Movement", value: highlight("Movement", "movement") },
// //   ].filter(h => h.value);

// //   const formatPrice = (value) =>
// //     new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       maximumFractionDigits: 0,
// //     }).format(value);

// //   return (
// //     <div className="bg-[#f6f3ee] min-h-screen w-full flex py-0">
// //       <div className="w-full flex flex-col lg:flex-row max-w-[1600px] mx-auto px-0 pt-10 gap-12">
// //         {/* Gallery */}
// //         <div className="flex-1 flex flex-col items-center xl:items-end pl-0 xl:pl-36">
// //           <Gallery images={imageUrls} productName={product.name} />
// //         </div>
// //         {/* Product details */}
// //         <div className="flex-1 flex flex-col justify-center px-6 xl:pl-0 xl:pr-28">
// //           <h1
// //             className="font-serif text-[2.7rem] xl:text-5xl font-extrabold text-[#23221d] mt-6 mb-7 leading-tight tracking-tight"
// //             style={{ letterSpacing: '-0.015em', lineHeight: '1.09' }}
// //           >
// //             {product.name}
// //           </h1>
// //           <div className="flex items-center gap-8 mb-8">
// //             <span className="uppercase font-sans text-lg font-bold tracking-widest text-[#b89f56]">
// //               {product.brand}
// //             </span>
// //             <span className="text-[2.2rem] font-extrabold text-[#23221d] pt-1">
// //               {formatPrice(product.price)}
// //             </span>
// //           </div>
// //           <div className="bg-[#fff9ed] border border-[#ead199] rounded-2xl py-9 px-9 shadow mb-12 max-w-2xl">
// //             <h2 className="text-[1.25rem] font-serif font-bold text-[#ac9247] mb-5 tracking-widest">
// //               Product Highlights
// //             </h2>
// //             <table className="w-full text-[1.09rem] font-medium">
// //               <tbody>
// //                 {highlights.map((h, idx) => (
// //                   <tr key={idx} className="border-b border-[#eedfa2]/40 last:border-0">
// //                     <td className="pr-3 py-3 text-[#7f7755] w-56" style={{ fontWeight: 540 }}>
// //                       {h.label}
// //                     </td>
// //                     <td className="pl-3 py-3 text-[#23221d]">{h.value}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //           <LuxeButtons product={product} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // import prisma from "@/lib/prisma";
// // import LuxeButtons from "@/components/LuxeButtons";
// // import Gallery from "@/components/Gallery"; // See notes below

// // export default async function ProductPage({ params }) {
// //   const { id } = params;
// //   const product = await prisma.watch.findUnique({ where: { id } });

// //   if (!product) {
// //     return (
// //       <div className="p-10 text-center text-red-600 font-semibold">
// //         Product not found.
// //       </div>
// //     );
// //   }

// //   // Get image array
// //   const imageUrls = Array.isArray(product.images)
// //     ? product.images.flatMap((s) =>
// //         typeof s === "string"
// //           ? s.match(/https?:\/\/\S+/g) || []
// //           : []
// //       )
// //     : [];

// //   // Parse/categorize highlights
// //   const description = product?.description || "";
// //   function highlight(label, ...keys) {
// //     for (let key of keys) {
// //       const regex = new RegExp(`${key}\\s*:?\\s*(.+)`, "i");
// //       const match = description.split("*").map(l => l.trim()).find(l => regex.test(l));
// //       if (match) return match.match(regex)?.[1]?.trim();
// //     }
// //     return null;
// //   }
// //   const highlights = [
// //     { label: "Brand", value: product.brand },
// //     { label: "Gender", value: highlight("Gender", "gender") },
// //     { label: "Strap Material", value: highlight("Strap Material", "strap material") },
// //     { label: "Strap Color", value: highlight("Strap Color", "strap color") },
// //     { label: "Glass Material", value: highlight("Glass Material", "glass material") },
// //     { label: "Warranty", value: highlight("Warranty", "warranty period", "warranty detail") },
// //     { label: "Dial Color", value: highlight("Dial Color", "dial color") },
// //     { label: "Movement", value: highlight("Movement", "movement") },
// //     // Add more fields as needed for your schema/brand standards
// //   ].filter(h => h.value);

// //   const formatPrice = (v) => new Intl.NumberFormat("en-IN", {
// //     style: "currency",
// //     currency: "INR",
// //     maximumFractionDigits: 0
// //   }).format(v);

// //   return (
// //     <div className="bg-[#f6f3ee] min-h-screen w-full flex py-0">
// //       <div className="w-full flex flex-col lg:flex-row max-w-[1600px] mx-auto px-0 pt-10 gap-12">
// //         {/* Left: Image Gallery (Gallery is client component below or import from /components) */}
// //         <div className="flex-1 flex flex-col items-center xl:items-end pl-0 xl:pl-36">
// //           <Gallery images={imageUrls} productName={product.name} />
// //         </div>
// //         {/* Right: Product Details */}
// //         <div className="flex-1 flex flex-col justify-center px-6 xl:pl-0 xl:pr-28">
// //           <h1
// //             className="font-serif text-[2.7rem] xl:text-5xl font-extrabold text-[#23221d] mt-6 mb-7 leading-tight tracking-tight"
// //             style={{ letterSpacing: '-0.015em', lineHeight: '1.09' }}
// //           >
// //             {product.name}
// //           </h1>
// //           <div className="flex items-center gap-8 mb-8">
// //             <span className="uppercase font-sans text-lg font-bold tracking-widest text-[#b89f56]">
// //               {product.brand}
// //             </span>
// //             <span className="text-[2.2rem] font-extrabold text-[#23221d] pt-1">
// //               {formatPrice(product.price)}
// //             </span>
// //           </div>
// //           <div className="bg-[#fff9ed] border border-[#ead199] rounded-2xl py-9 px-9 shadow mb-12 max-w-2xl">
// //             <h2 className="text-[1.25rem] font-serif font-bold text-[#ac9247] mb-5 tracking-widest">
// //               Product Highlights
// //             </h2>
// //             <table className="w-full text-[1.09rem] font-medium">
// //               <tbody>
// //                 {highlights.map((h, idx) => (
// //                   <tr key={idx} className="border-b border-[#eedfa2]/40 last:border-0">
// //                     <td className="pr-3 py-3 text-[#7f7755] w-56" style={{ fontWeight: 540 }}>
// //                       {h.label}
// //                     </td>
// //                     <td className="pl-3 py-3 text-[#23221d]">{h.value}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //           <LuxeButtons product={product} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // import prisma from "@/lib/prisma";
// // // import Image from "next/image";
// // // import LuxeButtons from "@/components/LuxeButtons"; // Add this line

// // // export default async function ProductPage({ params }) {
// // //   const { id } = params;
// // //   const product = await prisma.watch.findUnique({ where: { id } });

// // //   if (!product) {
// // //     return (
// // //       <div className="p-10 text-center text-red-600 font-semibold">
// // //         Product not found.
// // //       </div>
// // //     );
// // //   }

// // //   const imageUrls = Array.isArray(product?.images)
// // //     ? product.images.flatMap((s) =>
// // //         typeof s === "string" ? s.match(/https?:\/\/\S+/g) || [] : []
// // //       )
// // //     : [];

// // //   const highlights = (product?.description || "")
// // //     .split("*")
// // //     .map((line) => line.trim())
// // //     .filter(Boolean);

// // //   const formatPrice = (value) =>
// // //     new Intl.NumberFormat("en-IN", {
// // //       style: "currency",
// // //       currency: "INR",
// // //       maximumFractionDigits: 0,
// // //     }).format(value);

// // //   return (
// // //     <div className="bg-[#fcf9f4] min-h-screen w-full flex flex-col items-center py-12">
// // //       <div className="max-w-6xl w-full rounded-3xl shadow-2xl bg-white grid md:grid-cols-2 gap-12 p-8 md:p-14">
// // //         {/* Images */}
// // //         <div>
// // //           <div className="bg-[#f8f5ee] rounded-2xl shadow-lg flex items-center justify-center mb-6 py-8 h-[400px]">
// // //             {imageUrls.length ? (
// // //               <Image
// // //                 src={imageUrls[0]}
// // //                 alt={product.name}
// // //                 width={360}
// // //                 height={360}
// // //                 className="rounded-xl object-contain shadow-md"
// // //               />
// // //             ) : (
// // //               <div className="w-80 h-80 flex items-center justify-center text-gray-400 text-lg bg-gray-100 rounded-xl">
// // //                 No Image
// // //               </div>
// // //             )}
// // //           </div>
// // //           <div className="flex flex-wrap gap-3 justify-center">
// // //             {imageUrls.slice(1).map((img, idx) => (
// // //               <Image
// // //                 key={idx}
// // //                 src={img}
// // //                 alt={`${product.name} - ${idx + 1}`}
// // //                 width={70}
// // //                 height={70}
// // //                 className="rounded-lg object-cover ring-1 ring-[#b89f56]/30 hover:ring-[#b89f56] transition shadow-md cursor-pointer"
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Details */}
// // //         <div className="flex flex-col justify-between space-y-12">
// // //           <div>
// // //             <h1 className="text-4xl md:text-5xl font-serif font-extrabold mb-4 text-[#25221b] leading-tight">
// // //               {product.name}
// // //             </h1>
// // //             <div className="flex items-baseline gap-3 mb-6">
// // //               <span className="uppercase text-lg font-bold tracking-wide text-[#b89f56]">{product.brand}</span>
// // //               <span className="text-2xl md:text-3xl font-extrabold text-[#25221b]">
// // //                 {formatPrice(product.price)}
// // //               </span>
// // //             </div>
// // //             <div className="my-7 bg-[#f8f4ed] rounded-xl p-6 shadow">
// // //               <h2 className="text-[#b89f56] font-serif font-extrabold text-xl mb-5 tracking-wider">
// // //                 Product Highlights
// // //               </h2>
// // //               <table className="w-full text-md table-auto">
// // //                 <tbody>
// // //                   {highlights.map((item, ix) => (
// // //                     <tr
// // //                       key={ix}
// // //                       className="border-b border-[#eedfa2]/40 last:border-0"
// // //                     >
// // //                       <td className="py-1 pr-3 text-[#232323]">{item}</td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //           {/* Use client component */}
// // //           <LuxeButtons product={product} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // // import prisma from "@/lib/prisma";
// // // // import Image from "next/image";
// // // // import Link from "next/link";

// // // // export default async function ProductPage({ params }) {
// // // //   const { id } = await params;

// // // //   const product = await prisma.watch.findUnique({ where: { id } });

// // // //   if (!product) {
// // // //     return (
// // // //       <div className="p-10 text-center text-red-600 font-semibold">
// // // //         Product not found.
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Normalize image URLs
// // // //   const imageUrls = Array.isArray(product?.images)
// // // //     ? product.images.flatMap((s) =>
// // // //         typeof s === "string" ? s.match(/https?:\/\/\S+/g) || [] : []
// // // //       )
// // // //     : [];

// // // //   return (
// // // //     <section className="p-6 md:p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl">
// // // //       <div>
// // // //         {imageUrls.length ? (
// // // //           <Image
// // // //             src={imageUrls[0]}
// // // //             alt={product.name}
// // // //             width={600}
// // // //             height={600}
// // // //             className="rounded-xl object-cover w-full h-auto shadow-md"
// // // //           />
// // // //         ) : (
// // // //           <div className="bg-gray-100 w-full h-[400px] flex items-center justify-center text-gray-400 rounded-xl">
// // // //             No Image
// // // //           </div>
// // // //         )}

// // // //         {imageUrls.length > 1 && (
// // // //           <div className="flex gap-3 mt-3 overflow-x-auto">
// // // //             {imageUrls.slice(1).map((img, idx) => (
// // // //               <Image
// // // //                 key={idx}
// // // //                 src={img}
// // // //                 alt={`${product.name}-${idx}`}
// // // //                 width={100}
// // // //                 height={100}
// // // //                 className="rounded-md object-cover cursor-pointer hover:opacity-80 transition"
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <div className="flex flex-col justify-between">
// // // //         <div>
// // // //           <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
// // // //             {product.name}
// // // //           </h1>
// // // //           <p className="text-gray-500 text-lg mb-4">{product.brand}</p>

// // // //           <div className="flex items-center gap-4 mb-5">
// // // //             <span className="text-2xl font-semibold text-blue-600">
// // // //               ₹{product.discountedPrice || product.price}
// // // //             </span>
// // // //             {product.discountedPrice && (
// // // //               <span className="text-gray-400 line-through text-lg">
// // // //                 ₹{product.price}
// // // //               </span>
// // // //             )}
// // // //           </div>

// // // //           <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
// // // //         </div>

// // // //         <div className="flex items-center gap-4 mb-4">
// // // //           <Link
// // // //             href={`/checkout?productId=${product.id}`}
// // // //             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
// // // //           >
// // // //             Buy Now
// // // //           </Link>

// // // //           <Link
// // // //             href={`/watches/category/all`}
// // // //             className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
// // // //           >
// // // //             Back to Shop
// // // //           </Link>
// // // //         </div>

// // // //         <p className="mt-2 text-sm text-gray-500">
// // // //           {product.inStock > 0
// // // //             ? `In Stock: ${product.inStock}`
// // // //             : "Out of stock"}
// // // //         </p>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }