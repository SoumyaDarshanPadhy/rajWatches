
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StorySection from "../components/StorySection";
import Contact from "@/components/Contact";
// import RandomProductGrid from "../components/ProductGrid";
import HeroSlideshow from "@/components/HeroSlideshow";
// import { getPopularWatches } from "../lib/watchService";

const KennethColelogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/kenneth-cole-logo.png";
const Tommylogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
const Ajantalogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/ajanta-logo.jpg";
const Sonatalogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/sonata_logo.jpg";
const Titanlogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/titan.png";
const Fastracklogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/Fastrack_logo.svg.png";

const Menswatch = "https://ik.imagekit.io/5qrepdiow/frontend/Menswatchcollection.webp?updatedAt=1760790199282";
const Womenswatch = "https://ik.imagekit.io/5qrepdiow/frontend/Womenswatchcollection.webp?updatedAt=1760790199449";
const wallclock = "https://ik.imagekit.io/5qrepdiow/frontend/wallcolock.avif?updatedAt=17607911075554";
export default async function HomePage() {
  // let popularWatches = [];
  // try {
  //   popularWatches = await getPopularWatches();
  // } catch (error) {
  //   console.error("Failed to fetch popular watches:", error);
  // }

  const brands = [
    { name: "Fastrack", logo: Fastracklogo, slug: "Fastrack" },
    { name: "Titan", logo: Titanlogo, slug: "Titan" },
    { name: "Sonata", logo: Sonatalogo, slug: "Sonata" },
    { name: "KennethCole", logo: KennethColelogo, slug: "KennethCole" },
    { name: "Ajanta", logo: Ajantalogo, slug: "Ajanta" },
    { name: "TommyHilfigher", logo: Tommylogo, slug: "TommyHilfigher" },
  ];

  const categoryData = [
    { name: "Gents Collection", image: Menswatch, link: "/watches/category/men" },
    { name: "Ladies Collection", image: Womenswatch, link: "/watches/category/women" },
    { name: "Wall Clocks", image: wallclock, link: "/watches/category/wallclocks" },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen relative">
      <Navbar />

      <main>
        {/* HERO */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
          <HeroSlideshow />
        </div>

        {/* CATEGORY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categoryData.map((category) => (
              <div
                key={category.name}
                className="relative h-[280px] rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link href={category.link} className="block w-full h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    priority={category.name === "Gents Collection"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 z-10">
                    <h3 className="text-3xl font-extrabold text-white">{category.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* BRANDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Top Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative h-[220px] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl"
              >
                <Link href={`/watches/category/all?brand=${brand.slug}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition duration-300 flex flex-col justify-end p-4 z-10">
                    <h3 className="text-2xl font-bold text-white">{brand.name}</h3>
                    <p className="text-sm text-gray-200">
                      {brand.name === "Titan"
                        ? "The Premium Flagship"
                        : brand.name === "Fastrack"
                        ? "Youthful & Sporty"
                        : "Affordable Elegance"}
                    </p>
                  </div>
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Watches`}
                    fill
                    className="object-contain p-8 bg-white transition-transform duration-500 group-hover:scale-[1.02] opacity-80"
                    sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR PRODUCTS */}
        {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-inner">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Products</h2>
          <RandomProductGrid watches={popularWatches} />
          {popularWatches.length === 0 && (
            <p className="text-center text-gray-600 mt-4">
              No popular watches found at the moment.
            </p>
          )}
        </section> */}

        <StorySection />
        <TestimonialSection />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
