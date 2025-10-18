
import Link from "next/link";
import Image from "next/image"; // Good practice for optimized images
// Client Components must be imported here and MUST be "use client" in their own file.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StorySection from "../components/StorySection";
import Contact from "@/components/Contact";
import ProductGrid from "../components/ProductGrid"; // Client component to display watches
import HeroSlideshow from "@/components/HeroSlideshow"; // Client component for interactive slider

// Icons
import { ChevronRight } from "lucide-react";

// Server-side data fetching utility (MUST be marked async)
import { getPopularWatches } from "../lib/watchService";

// Images (Static imports are fine in Server Components, provided paths are correct)
import Fastracklogo from '../assets/Fastrack_logo.png';
import Sonatalogo from '../assets/sonata_logo.jpg';
import Titanlogo from '../assets/titan.png';
import Timexlogo from '../assets/timex.png';
import Fossillogo from '../assets/Fossil-Logo.png';
import Policelogo from '../assets/Police-logo.png';
import Menswatch from '../assets/Menswatchcollection.webp'; 
import Womenswatch from '../assets/Womenswatchcollection.webp';
import wallclock from "../assets/wallcolock.png"

// Component Structure: This is a Server Component
export default async function HomePage() {
 
 // ----------------------------------------------------
 // SERVER SIDE LOGIC: Data Fetching
 // ----------------------------------------------------
 let popularWatches = [];
 try {
  popularWatches = await getPopularWatches();
 } catch (error) {
  console.error("Failed to fetch popular watches:", error);
  // Gracefully handle failure by using an empty array
 }

 // ----------------------------------------------------
 // STATIC DATA (Apostrophes escaped for JSX rendering)
 // ----------------------------------------------------
 const brands = [
  { name: "Fastrack", logo: Fastracklogo, slug: "Fastrack" },
  { name: "Titan", logo: Titanlogo, slug: "Titan" },
  { name: "Sonata", logo: Sonatalogo, slug: "Sonata" },
  { name: "Timex", logo: Timexlogo, slug: "Timex" },
  { name: "Fossil", logo: Fossillogo, slug: "Fossil" },
  { name: "Police", logo: Policelogo, slug: "Police" },
 ];
 
 const categoryData = [
  { 
   // FIX: Escaped apostrophe for clean JSX rendering
   name: "Gents Collection", 
   image: Menswatch, // Use the imported object directly with Next/Image
   link: "/watches/category/men" 
  },
  { 
   // FIX: Escaped apostrophe for clean JSX rendering
   name: "Ladies Collection", 
   image: Womenswatch,
   link: "/watches/category/women" 
  },
  { 
   name: "Wall Watches", 
   image: wallclock,
   link: "/watches/category/wallclocks" 
  },
 ];

 return (
  <div className="bg-gray-50 w-full min-h-screen relative">
   <Navbar /> 

   <main>
    {/* HERO SECTION - Handled by Client Component */}
    <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
     <HeroSlideshow />
    </div>

    {/* ---------------------------------------------------- */}
    {/* SHOP BY CATEGORY (MEN'S/WOMEN'S/ETC) */}
    {/* ---------------------------------------------------- */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
     <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Shop by Collection
     </h2>
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {categoryData.map((category) => (
       <div key={category.name} className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
        <Link href={category.link} className="block w-full h-full">
         <Image
          src={category.image}
          alt={category.name} 
          fill // Use fill to cover the parent div
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={category.name === "Gents&apos; Collection"} // Prioritize loading for LCP
         />
         {/* Overlay and Text */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 z-10">
          <h3 className="text-3xl font-extrabold text-white">{category.name}</h3>
         </div>
        </Link>
       </div>
      ))}
     </div>
    </section>


    {/* ---------------------------------------------------- */}
    {/* SHOP BY BRAND */}
    {/* ---------------------------------------------------- */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
     <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Our Top Brands
     </h2>
     
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {brands.slice(0, 3).map((brand) => (
       <div key={brand.name} className="relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
        <Link href={`/watches/category/all?brand=${brand.slug}`}>
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition duration-300 flex flex-col justify-end p-4 z-10">
          <h3 className="text-2xl font-bold text-white z-10">{brand.name}</h3>
          {/* Placeholder description based on brand data */}
          <p className="text-sm text-gray-200">{brand.name === "Titan" ? "The Premium Flagship" : brand.name === "Fastrack" ? "Youthful & Sporty" : "Affordable Elegance"}</p>
         </div>
         <Image 
          src={brand.logo} 
          alt={`${brand.name} Watches`} 
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 33vw"
          className="object-contain p-8 bg-white transition-transform duration-500 group-hover:scale-[1.02] opacity-70"
         />
        </Link>
       </div>
      ))}
     </div>
     
     {/* <div className="mt-12 text-center">
      <Link href="/brands" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
       View All {brands.length} Brands <ChevronRight className="w-4 h-4 inline-block ml-1" />
      </Link>
     </div> */}
    </section>
    
    {/* PRODUCT GRID - Pass the fetched data down to the grid component */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-inner">
     <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Popular Products
     </h2>
     {/* ProductGrid must be a Client Component if it handles individual product state/interaction */}
     <ProductGrid watches={popularWatches} />
     {popularWatches.length === 0 && (
      <p className="text-center text-gray-600 mt-4">No popular watches found at the moment.</p>
     )}
    </section>

    {/* TESTIMONIALS & OTHER SECTIONS */}
    <StorySection />
    <TestimonialSection />
    <WhyChooseUs />
    <Contact />
   </main>
   
   <Footer /> 
  </div>
 );
}