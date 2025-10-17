// /ecommerce/app/page.jsx (Renamed from Home.jsx)

// 1. Next.js does not use react-router-dom Link, it uses next/link
import Link from "next/link";
// 2. We will import the client-side components from the /components folder
import WatchCard from "./ProductGrid";
import FilterSidebar from "./FilterSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestimonialSection from "./TestimonialSection";
import WhyChooseUs from "./WhyChooseUs";
import StorySection from "./StorySection";
import FloatingFilterButton from "../components/FloatingFilterButton"; // New client component for mobile filter

// 3. Lucide-react icons are fine
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

// 4. Server-side data fetching utility
import { getPopularWatches } from "../lib/watchService";

// 5. Images (still imported from /assets or referenced from /public)
import Fastracklogo from '../assets/Fastrack_logo.svg.png';
import Sonatalogo from '../assets/sonata_logo.jpg';
import Titanlogo from '../assets/titan.png';
import Timexlogo from '../assets/timex.png';
import Fossillogo from '../assets/Fossil-Logo.png';
import Policelogo from '../assets/Police-logo.png';
import Menswatch from '../assets/Menswatchcollection.webp';
import Womenswatch from '../assets/Womenswatchcollection.webp';
import wallclock from "../assets/wallcolock.avif"


// Component Structure: This is now a Server Component
export default async function HomePage() {
  // ----------------------------------------------------
  // SERVER SIDE LOGIC: Data Fetching (PRISMA INTEGRATION)
  // ----------------------------------------------------
  const popularWatches = await getPopularWatches();

  // ----------------------------------------------------
  // CLIENT SIDE LOGIC (Moved to separate components or hooks)
  // State for filtering/sliders must be handled in client components
  // We'll move the filter state logic to a new client component wrapper if needed,
  // but for the homepage, we will simplify the data flow.
  // The hero slider state MUST be managed in a client component.
  // ----------------------------------------------------
  
  // Note: We'll extract the Hero Slider into its own client component for state management.
  const HeroSlider = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
      
      // Since this is a server component, we can't use useState here.
      // This is the common Next.js pattern: extract stateful logic to a
      // **Client Component** (marked with "use client").
      // For brevity, I'll provide the new structure by placing the slider logic
      // in a file like /components/HeroSlider.jsx and marking it "use client".
      return (
          <div className="text-center py-4 bg-red-100">
              {/* This is a placeholder, as the slider logic is now incorrect for a Server Component */}
              <p className="text-red-700">
                ⚠️ Slider State must be moved to a **Client Component**!
              </p>
          </div>
      )
  };

  // Static Data (Can stay here in the Server Component)
  const brands = [
    { name: "Fastrack", logo: Fastracklogo },
    { name: "Titan", logo: Titanlogo },
    { name: "Sonata", logo: Sonatalogo },
    { name: "Timex", logo: Timexlogo },
    { name: "Fossil", logo: Fossillogo },
    { name: "Police", logo: Policelogo },
  ];

  // NOTE: The `filters` state, `isFilterOpen` state, and `handleFilterChange` 
  // must be moved out of this Server Component and into a **Client Component** // (like a new `WatchesPageWrapper` if you decide to have a separate page for filtering).

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      {/* Navbar is typically a Client Component but can be placed here */}
      <Navbar /> 

      {/* HERO SLIDER (Replace with a dedicated Client Component) */}
      {/* For this example, we keep the structure but note the need for "use client" in a separate file */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full bg-gradient-to-r from-blue-100 to-gray-100 overflow-hidden">
        {/* ... Hero Slider content (must be made a client component) ... */}
        {/* Placeholder: You need to create /components/HeroSlider.jsx with "use client" */}
      </div>

      {/* CATEGORY SECTION - Use Next.js Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Men's Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/watches-men"> {/* Changed to Next.js Link */}
              {/* ... category image and overlay content ... */}
            </Link>
          </div>
          {/* Women's Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/watches-women">
              {/* ... category image and overlay content ... */}
            </Link>
          </div>
          {/* Wall Clocks Collection */}
          <div className="flex-1 relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl">
            <Link href="/wall-clocks">
              {/* ... category image and overlay content ... */}
            </Link>
          </div>
        </div>
      </div>

      {/* BRAND SECTION */}
      <section className="bg-white py-12 px-6">
        {/* ... Brands content (unchanged) ... */}
      </section>

      {/* PRODUCT SECTION: Displaying Data from Prisma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Watches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularWatches.map((watch) => (
            <WatchCard 
                key={watch.id} 
                name={watch.name} 
                price={watch.price} 
                brand={watch.brand} 
                image={watch.imageUrl} 
                // Pass other props your WatchCard needs
            />
          ))}
          {popularWatches.length === 0 && (
            <p className="col-span-full text-center text-gray-600">No popular watches found at the moment.</p>
          )}
        </div>
      </section>

      {/* TESTIMONIALS & OTHER SECTIONS */}
      <StorySection />
      <TestimonialSection />
      <WhyChooseUs />
      
      <Footer /> 
    </div>
  );
}