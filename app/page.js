// /ecommerce/app/page.jsx (Renamed from Home.jsx)

import Link from "next/link";
// Client Components must be imported here
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StorySection from "../components/StorySection";
import Contact from "@/components/Contact";
import ProductGrid from "../components/ProductGrid"; // Assuming this handles popular watches display

// Icons
import { ChevronRight } from "lucide-react";

// Server-side data fetching utility (MUST be marked async)
import { getPopularWatches } from "../lib/watchService";

// Images (Static imports are fine in Server Components)
import Fastracklogo from '../assets/Fastrack_logo.svg.png';
import Sonatalogo from '../assets/sonata_logo.jpg';
import Titanlogo from '../assets/titan.png';
import Timexlogo from '../assets/timex.png';
import Fossillogo from '../assets/Fossil-Logo.png';
import Policelogo from '../assets/Police-logo.png';
import Menswatch from '../assets/Menswatchcollection.webp'; // Used for generic image placeholder
import Womenswatch from '../assets/Womenswatchcollection.webp';
import wallclock from "../assets/wallcolock.avif"
import HeroSlideshow from "@/components/HeroSlideshow";


const imageArr = ["https://ik.imagekit.io/5qrepdiow/store_frontend/1.HEIC",
"https://ik.imagekit.io/5qrepdiow/store_frontend/3.HEIC",
"https://ik.imagekit.io/5qrepdiow/store_frontend/4.HEIC",
"https://ik.imagekit.io/5qrepdiow/store_frontend/5.HEIC",
"https://ik.imagekit.io/5qrepdiow/store_frontend/6.HEIC",
"https://ik.imagekit.io/5qrepdiow/store_frontend/7.HEIC"]

// Component Structure: This is now a Server Component
export default async function HomePage() {
  
  // ----------------------------------------------------
  // SERVER SIDE LOGIC: Data Fetching (PRISMA INTEGRATION)
  // ----------------------------------------------------
  // The result of this is passed to client components or rendered directly
  const popularWatches = await getPopularWatches();

  // Static Data (Can stay here in the Server Component)
  const brands = [
    { name: "Fastrack", logo: Fastracklogo, slug: "Fastrack" },
    { name: "Titan", logo: Titanlogo, slug: "Titan" },
    { name: "Sonata", logo: Sonatalogo, slug: "Sonata" },
    { name: "Timex", logo: Timexlogo, slug: "Timex" },
    { name: "Fossil", logo: Fossillogo, slug: "Fossil" },
    { name: "Police", logo: Policelogo, slug: "Police" },
  ];
  
  // Responsive utility class mapping for category section
  const categoryData = [
    { 
        name: "Gents' Collection", 
        image: Menswatch.src, // Use .src for Next.js Image import paths
        link: "/watches/category/men" 
    },
    { 
        name: "Ladies' Collection", 
        image: Womenswatch.src,
        link: "/watches/category/women" 
    },
    { 
        name: "Wall Watches", 
        image: wallclock.src, // Using wallclock image for placeholder
        link: "/watches/category/wallclocks" 
    },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar /> 

      <main>
        {/* HERO SECTION - Responsive Placeholder */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full bg-gradient-to-br from-indigo-50 to-white overflow-hidden flex items-center justify-center">
            {/* Background Image/Style */}
            {/* <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: `url(${Menswatch.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/40"></div>
            </div> */}

            {/* Content */}
            {/* <div className="relative z-10 text-center text-white p-6 max-w-4xl">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
                    Timeless Style, Modern Precision.
                </h1>
                <p className="mt-4 text-lg sm:text-xl font-light drop-shadow-md">
                    Explore the Titan family's finest collections. Authenticity guaranteed.
                </p>
                <Link href="/watches/category/all" className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gray-600 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]">
                    Shop All Watches
                    <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
            </div> */}
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
                            <img 
                                src={category.image}
                                alt={category.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay and Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <h3 className="text-3xl font-extrabold text-white z-10">{category.name}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>


        {/* ---------------------------------------------------- */}
        {/* SHOP BY BRAND (The part you provided) */}
        {/* ---------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Top Brands
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                
                {/* Fastrack Collection (Filter by Brand=Fastrack) */}
                <div className="relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
                    <Link href="/watches/category/all?brand=Fastrack"> {/* Query Parameter is crucial */}
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-700/90 to-transparent group-hover:from-indigo-800/90 transition duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-2xl font-bold text-white z-10">Fastrack</h3>
                            <p className="text-sm text-indigo-200">Youthful & Sporty</p>
                        </div>
                        <img 
                            src={Fastracklogo.src} 
                            alt="Fastrack Watches" 
                            className="w-full h-full object-contain p-8 bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </Link>
                </div>

                {/* Sonata Collection (Filter by Brand=Sonata) */}
                <div className="relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
                    <Link href="/watches/category/all?brand=Sonata">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-700/90 to-transparent group-hover:from-blue-800/90 transition duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-2xl font-bold text-white z-10">Sonata</h3>
                            <p className="text-sm text-blue-200">Affordable Elegance</p>
                        </div>
                        <img 
                            src={Sonatalogo.src} 
                            alt="Sonata Watches" 
                            className="w-full h-full object-contain p-8 bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </Link>
                </div>

                {/* Titan Collection (Filter by Brand=Titan) */}
                <div className="relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
                    <Link href="/watches/category/all?brand=Titan">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-700/90 to-transparent group-hover:from-gray-800/90 transition duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-2xl font-bold text-white z-10">Titan</h3>
                            <p className="text-sm text-gray-200">The Premium Flagship</p>
                        </div>
                        <img 
                            src={Titanlogo.src} 
                            alt="Titan Watches" 
                            className="w-full h-full object-contain p-8 bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </Link>
                </div>
                
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
            <ProductGrid watches={popularWatches} />
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