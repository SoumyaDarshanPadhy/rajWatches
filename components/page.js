import Link from "next/link";
import Image from "next/image";
import WatchCard from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialSection from "@/components/TestimonialSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import StorySection from "@/components/StorySection";
import HeroSlideshow from "@/components/HeroSlideshow";
import FloatingFilterButton from "@/components/FloatingFilterButton";

// 3. Lucide-react icons are fine (used in client/server components)
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

// 4. Server-side data fetching utility
import { getPopularWatches } from "../lib/watchService";

// Component Structure: This is now a Server Component
export default async function HomePage() {
  // ----------------------------------------------------
  // SERVER SIDE LOGIC: Data Fetching (PRISMA INTEGRATION)
  // ----------------------------------------------------
  let popularWatches = [];
  try {
    // Only fetch the minimum data needed for the homepage product grid
    popularWatches = await getPopularWatches();
  } catch (error) {
    console.error("Failed to fetch popular watches:", error);
    // Continue with an empty array if data fetching fails
  }

  // ----------------------------------------------------
  // STATIC DATA - Uncomment once image paths are fixed
  // ----------------------------------------------------
  /*
  const brands = [
    { name: "Fastrack", logo: Fastracklogo },
    { name: "Titan", logo: Titanlogo },
    { name: "Sonata", logo: Sonatalogo },
    { name: "Timex", logo: Timexlogo },
    { name: "Fossil", logo: Fossillogo },
    { name: "Police", logo: Policelogo },
  ];
  */

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar />

      {/* HERO SLIDER - Must be a "use client" component */}
      <HeroSlideshow />

      {/* CATEGORY SECTION - Using Next.js Link and image paths from /public */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Men's Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/watches-men">
              <div className="absolute inset-0 bg-black/30 z-10 transition-opacity group-hover:bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold z-20">
                  Men&apos;s Watches
                </span>
              </div>
              {/* Using a direct path if asset is in /public/assets */}
              <Image
                src="/assets/Menswatchcollection.webp"
                alt="Men's Watch Collection"
                width={400}
                height={220}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Women's Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/watches-women">
              <div className="absolute inset-0 bg-black/30 z-10 transition-opacity group-hover:bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold z-20">
                  Women&apos;s Watches
                </span>
              </div>
              <Image
                src="/assets/Womenswatchcollection.webp"
                alt="Women's Watch Collection"
                width={400}
                height={220}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Wall Clocks Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/wall-clocks">
              <div className="absolute inset-0 bg-black/30 z-10 transition-opacity group-hover:bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold z-20">
                  Wall Clocks
                </span>
              </div>
              <Image
                src="/assets/wallcolock.avif"
                alt="Wall Clock Collection"
                width={400}
                height={220}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* BRAND SECTION */}
      {/* ⚠️ To fix this section, you must either fix the image imports or use direct paths from the public folder. */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Brands
        </h2>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {/* Replace with a mapping of the 'brands' array once images are fixed */}
          <div className="h-10 w-24 flex items-center justify-center">
            <Image
              src="/assets/titan.png"
              alt="Titan Logo"
              width={96}
              height={40}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="h-10 w-24 flex items-center justify-center">
            <Image
              src="/assets/Fastrack_logo.svg.png"
              alt="Fastrack Logo"
              width={96}
              height={40}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="h-10 w-24 flex items-center justify-center">
            <Image
              src="/assets/Fossil-Logo.png"
              alt="Fossil Logo"
              width={96}
              height={40}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION: Displaying Data from Prisma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Popular Watches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularWatches.map((watch) => (
            <WatchCard
              key={watch.id}
              name={watch.name}
              price={watch.price}
              brand={watch.brand}
              image={watch.imageUrl}
            />
          ))}
          {popularWatches.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No popular watches found at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Floating Filter Button (Client Component) for mobile */}
      <FloatingFilterButton />

      {/* TESTIMONIALS & OTHER SECTIONS */}
      <StorySection />
      <TestimonialSection />
      <WhyChooseUs />

      <Footer />
    </div>
  );
}
