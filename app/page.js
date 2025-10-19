import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StorySection from "../components/StorySection";
import Contact from "@/components/Contact";
import HeroSlideshow from "@/components/HeroSlideshow";

const KennethColelogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/kenneth-cole-logo.png";
const Tommylogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/Tommy_Hilfiger_Logo.png";
const Ajantalogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/ajanta-logo.jpg";
const Sonatalogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/sonata_logo.jpg";
const Titanlogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/titan.png";
const Fastracklogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/Fastrack_logo.svg.png";
const Casiologo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/casio_logo.webp";
const Policelogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/police_logo.png";
const Sflogo = "https://ik.imagekit.io/rajstorage1/store_frontend/Logos/sf_logo.png";

const Menswatch = "https://ik.imagekit.io/rajstorage1/RAJ_WATCHES_Brand_1/3Fastrack/images/112-3184_QM02/1_112-3184_QM02.jpg";
const Womenswatch = "https://ik.imagekit.io/5qrepdiow/frontend/Womenswatchcollection.webp?updatedAt=1760790199449";
const wallclock = "https://ik.imagekit.io/5qrepdiow/frontend/wallcolock.avif?updatedAt=17607911075554";

export default async function HomePage() {
  const brands = [
    { name: "Fastrack", logo: Fastracklogo },
    { name: "Titan", logo: Titanlogo },
    { name: "Sonata", logo: Sonatalogo },
    { name: "Kenneth Cole", logo: KennethColelogo },
    { name: "Ajanta", logo: Ajantalogo },
    { name: "SF", logo: Sflogo },
    { name: "Tommy Hilfiger", logo: Tommylogo },
    { name: "Police", logo: Policelogo },
    { name: "Casio", logo: Casiologo },
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
                <a href={category.link} className="block w-full h-full">
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
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* BRANDS (static beautiful grid) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Our Top Brands
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative w-full max-w-[260px] h-[200px] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  width={160}
                  height={80}
                  className="object-contain mb-3 group-hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <StorySection />
        <TestimonialSection />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}