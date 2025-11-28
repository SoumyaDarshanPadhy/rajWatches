"use client";
import React from "react";

const StorySection = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#faf8f3] text-[#3c3c3c] max-w-3xl mx-auto px-5 sm:px-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#a18432] mb-9 tracking-wide">
          Our Journey Through Time
        </h2>
        <div className="space-y-4 text-[1.06rem] sm:text-lg leading-normal text-justify font-light">
          <p>
            Every great story starts small — ours began in the early 1990s, when passion met perseverance. In a time when craftsmanship defined character, our founder <span className="font-medium text-[#a18432]">Rajkumar Chhatwani</span> set out to build more than a business — he began shaping a legacy.
          </p>
          <p>
            From a modest repair shop to a name that resonates with trust and precision, his vision has always been rooted in authenticity and dedication. He believed that <span className="text-[#a18432] italic">true luxury lies not in excess, but in excellence.</span>
          </p>
          <p>
            Over the years, we’ve evolved into a <span className="font-medium text-[#a18432]">trusted name in fine timekeeping</span>, honoring craftsmanship and celebrating artistry with every moment we measure.
          </p>
          <p>
            Today, we proudly curate world-class timepieces — from <span className="font-medium text-[#a18432]">Fossil, Tommy Hilfiger, Casio, Police, Kenneth Cole</span> to Indian icons like <span className="font-medium text-[#a18432]">Titan</span> and <span className="font-medium text-[#a18432]">Sonata</span>. Each model stands as a testament to grace, precision, and timeless design.
          </p>
          <p>
            Our watches are companions through life’s defining moments, reflecting individuality and the values you hold dear.
          </p>
        </div>
        {/* Luxe Quote with minimalist style */}
        <div className="mt-12">
          <p className="text-xl sm:text-2xl font-serif italic font-medium text-[#a18432] leading-snug text-center">
            “We don’t just mark time — we celebrate it, one masterpiece at a time.”
          </p>
          <div className="w-24 h-[2px] bg-[#cbb36a] mx-auto mt-6 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
// "use client";
// import React from "react";

// const features = [
//   {
//     title: "Exquisite Craftsmanship",
//     description: "Hand-selected pieces from top global & Indian brands."
//   },
//   {
//     title: "Certified Authenticity",
//     description: "Every timepiece comes with a guarantee of originality."
//   },
//   {
//     title: "Personalized Experience",
//     description: "Expert guidance in finding the perfect match for your style."
//   },
//   {
//     title: "Legacy of Trust",
//     description: "Decades of excellence, reputation and customer care."
//   }
// ];

// const StorySection = () => {
//   return (
//     <section className="relative bg-gradient-to-tr from-[#f8f4e3] via-[#f9f7ee] to-[#f6ecd0] py-14 sm:py-16 text-[#3a321a] shadow-[0_4px_32px_-8px_rgba(175,155,66,0.22)] rounded-2xl max-w-3xl mx-auto mt-6 border border-[#efddb0]">
//       <div className="max-w-2xl mx-auto px-5 sm:px-7 text-center">
//         {/* Heading */}
//         <h2 className="text-[2rem] sm:text-[2.75rem] font-serif font-extrabold text-[#a08436] mb-8 tracking-wide">
//           Our Journey Through Time
//         </h2>

//         {/* Story */}
//         <div className="space-y-5 text-[1.08rem] sm:text-lg leading-normal text-justify font-light">
//           <p>
//             Every great story starts small — ours began in the early 1990s, when passion met perseverance. In a time when craftsmanship defined character, our founder <span className="font-medium text-[#a08436]">Rajkumar Chhatwani</span> set out to build more than a business — he began shaping a legacy.
//           </p>
//           <p>
//             From a modest repair shop to a name that resonates with trust and precision, his vision has always been rooted in authenticity and dedication. He believed that <span className="text-[#b89a44] italic">true luxury lies not in excess, but in excellence.</span>
//           </p>
//           <p>
//             Over the years, we’ve evolved into a <span className="font-semibold text-[#aea15b]">trusted name in fine timekeeping</span>, honoring craftsmanship and celebrating artistry with every moment we measure.
//           </p>
//           <p>
//             Today, we proudly curate world-class timepieces — from <span className="font-medium text-[#ad983a]">Fossil, Tommy Hilfiger, Casio, Police, Kenneth Cole</span> to Indian icons like <span className="font-medium text-[#ad983a]">Titan</span> and <span className="font-medium text-[#ad983a]">Sonata</span>. Each model stands as a testament to grace, precision, and timeless design.
//           </p>
//           <p>
//             Our watches are companions through life’s defining moments, reflecting individuality and the values you hold dear.
//           </p>
//         </div>

//         {/* Features */}
//         <div className="flex flex-wrap justify-center gap-4 mt-8 mb-2">
//           {features.map((feature, idx) => (
//             <div key={idx} className="bg-[#f6efd8] border border-[#e6d09f] rounded-xl px-4 py-3 min-w-[140px] max-w-xs shadow-[0_1px_6px_rgba(150,130,50,0.09)]">
//               <h4 className="text-[#927821] text-lg font-semibold">{feature.title}</h4>
//               <p className="text-[#6c5b1f] text-[0.97rem] mt-1">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quote */}
//         <div className="mt-10">
//           <div className="bg-[#fffae6] border-l-8 border-[#d8bd68] p-5 rounded-r-lg shadow-md">
//             <p className="text-xl sm:text-2xl font-serif italic font-medium text-[#ae972e] leading-snug text-center">
//               “We don’t just mark time — we celebrate it, one masterpiece at a time.”
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StorySection;

// // "use client";
// // import React from "react";

// // const StorySection = () => {
// //   return (
// //     <section className="relative bg-gradient-to-br from-[#faf6f0] via-[#fffefb] to-[#f7f0e7] py-20 sm:py-24 overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(198,174,94,0.35)] max-w-5xl mx-auto px-8 sm:px-12 lg:px-20">
// //       {/* Decorative soft golden glow orbs */}
// //       <div className="absolute top-[-10rem] left-[-10rem] w-[28rem] h-[28rem] bg-gradient-to-br from-[#d3af57] to-[#b1923f] rounded-full opacity-20 blur-[96px] pointer-events-none mix-blend-soft-light" />
// //       <div className="absolute bottom-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-gradient-to-tr from-[#bb9f4d] to-[#d6bb68] rounded-full opacity-25 blur-[112px] pointer-events-none mix-blend-soft-light" />

// //       {/* Main Content */}
// //       <div className="relative mx-auto text-center">
// //         <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#846f30] mb-14 leading-tight tracking-wide drop-shadow-sm">
// //           Our Journey Through Time
// //         </h2>

// //         <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-10 sm:p-12 space-y-10 border-t-6 border-yellow-600 hover:shadow-[0_0_45px_-10px_rgba(200,180,90,0.5)] transition-shadow duration-600">
          
// //           <p className="text-[#625517] text-lg leading-relaxed border-l-6 border-yellow-500 pl-6 italic font-light max-w-3xl mx-auto tracking-normal">
// //             Every great story starts small — ours began in the early 1990s, in an era where dreams were built with dedication. Our founder,{" "}
// //             <span className="font-semibold">Rajkumar Chhatwani</span>, transformed a humble repair shop into a lasting legacy.
// //           </p>

// //           <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gradient-to-br from-[#fff9dc] to-[#fefcf5] rounded-3xl border border-yellow-400 p-8 shadow-inner max-w-4xl mx-auto hover:shadow-md transition-shadow duration-400">
// //             <div className="w-44 h-44 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-md flex items-center justify-center text-6xl font-bold text-white select-none">
// //               R
// //             </div>
// //             <div className="text-left max-w-lg">
// //               <h3 className="text-2xl font-serif font-semibold text-[#6b5e27] mb-4 tracking-wide">
// //                 A Visionary’s Dedication
// //               </h3>
// //               <p className="text-[#7b6e2f] text-base leading-relaxed font-light">
// //                 Rajkumar Chhatwani taught us that true luxury is passion — dedication to timeless craftsmanship and precision.
// //               </p>
// //             </div>
// //           </div>

// //           <p className="text-[#6b5c2a] text-lg leading-relaxed max-w-3xl mx-auto tracking-normal px-4 md:px-0">
// //             From humble beginnings, we have become a <span className="font-semibold text-yellow-600">trusted name in luxury timekeeping</span>, symbolizing artistry and grace.
// //           </p>

// //           <p className="text-[#695d23] text-lg leading-relaxed max-w-4xl mx-auto px-6 py-6 rounded-xl border-y border-yellow-400 bg-[#f8f7e6] shadow-inner font-semibold tracking-wide text-center">
// //             We proudly feature collections from revered global brands like <span className="text-yellow-600">Fossil, Tommy Hilfiger, Casio, Police</span>, <span className="text-yellow-600">Kenneth Cole</span>, alongside Indian icons <span className="text-yellow-600">Titan</span> and <span className="text-yellow-600">Sonata</span>.
// //           </p>

// //           <p className="text-[#625817] text-lg leading-relaxed max-w-3xl mx-auto tracking-normal px-4 md:px-0 text-center">
// //             Our timepieces are reflections of individuality — companions in life’s meaningful moments. Our customers are part of our enduring legacy.
// //           </p>

// //           <p className="text-[#554d20] text-2xl md:text-3xl leading-snug font-extrabold border-l-8 border-yellow-500 pl-8 bg-yellow-100 p-6 rounded-r-xl italic max-w-3xl mx-auto text-center shadow-md tracking-widest">
// //             “We don’t just mark time — we honor it with elegance, craftsmanship, and grace.”
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default StorySection;

// // // "use client";
// // // import React from "react";

// // // const StorySection = () => {
// // //   return (
// // //     <section className="relative bg-gradient-to-br from-[#faf6f0] via-[#fffefb] to-[#f7f0e7] py-32 sm:py-40 overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(198,174,94,0.35)] max-w-7xl mx-auto px-10 md:px-16 lg:px-24">
// // //       {/* Decorative soft golden glow orbs */}
// // //       <div className="absolute top-[-12rem] left-[-12rem] w-[36rem] h-[36rem] bg-gradient-to-br from-[#d3af57] to-[#b1923f] rounded-full opacity-20 blur-[112px] pointer-events-none mix-blend-soft-light" />
// // //       <div className="absolute bottom-[-12rem] right-[-12rem] w-[38rem] h-[38rem] bg-gradient-to-tr from-[#bb9f4d] to-[#d6bb68] rounded-full opacity-25 blur-[128px] pointer-events-none mix-blend-soft-light" />

// // //       {/* Main Content */}
// // //       <div className="relative max-w-5xl mx-auto text-center">
// // //         <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-[#846f30] mb-20 leading-tight tracking-widest drop-shadow-lg">
// // //           Our Journey Through Time
// // //         </h2>

// // //         <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl p-14 md:p-20 space-y-16 border-t-8 border-[#d8b857] hover:shadow-[0_0_60px_-5px_rgba(200,180,90,0.5)] transition-shadow duration-700">
          
// // //           <p className="text-[#625517] text-xl leading-relaxed border-l-8 border-[#dec46c] pl-8 italic font-light max-w-4xl mx-auto tracking-wide">
// // //             Every great story starts small — ours began in the early 1990s, in an era where dreams were forged with patience and dedication. At the center of it all was{" "}
// // //             <span className="font-semibold">Rajkumar Chhatwani</span>, a visionary who transformed a humble repair shop into an enduring legacy.
// // //           </p>

// // //           <div className="flex flex-col md:flex-row items-center md:items-start gap-12 bg-gradient-to-br from-[#fdf9e4] to-[#fffdf6] rounded-3xl border border-[#e1d29f] p-10 shadow-inner max-w-5xl mx-auto hover:shadow-lg transition-shadow duration-500">
// // //             <div className="w-52 h-52 rounded-full bg-gradient-to-br from-[#c5ae4d] to-[#a48e2d] shadow-lg flex items-center justify-center text-7xl font-extrabold text-white select-none cursor-default">
// // //               R
// // //             </div>
// // //             <div className="text-left max-w-xl">
// // //               <h3 className="text-3xl font-serif font-semibold text-[#675e27] mb-6 tracking-wide">
// // //                 A Visionary’s Dedication
// // //               </h3>
// // //               <p className="text-[#7b6e2f] text-lg leading-relaxed font-light">
// // //                 “Rajkumar Chhatwani instilled in us the belief that true luxury lies not in the price but in passion — a dedication to craftsmanship, timeless precision, and trust. His humble beginnings remain the soul of every masterpiece we create.”
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <p className="text-[#6b5c2a] text-xl leading-relaxed max-w-3xl mx-auto tracking-wide px-4 md:px-0">
// // //             From these beginnings, we have grown into a <span className="font-semibold text-[#bfa949]">trusted name in luxurious timekeeping</span>, symbolizing accuracy, artistry, and timeless grace.
// // //           </p>

// // //           <p className="text-[#695d23] text-xl leading-relaxed max-w-5xl mx-auto px-6 py-8 rounded-xl border-y border-[#d2bb6c] bg-[#f8f7e6] shadow-inner font-semibold tracking-wide text-center">
// // //             Reputed collections from iconic global brands like <span className="text-[#b99733]">Fossil, Tommy Hilfiger, Casio, Police</span>, <span className="text-[#b99733]">Kenneth Cole</span>, and favourites like <span className="text-[#b99733]">Titan</span> and <span className="text-[#b99733]">Sonata</span> exemplify our passion for excellence.
// // //           </p>

// // //           <p className="text-[#625817] text-xl leading-relaxed max-w-4xl mx-auto tracking-wide px-4 md:px-0 text-center">
// // //             Our timepieces are more than watches; they are reflections of your elegance and aspirations. Our esteemed customers enrich our legacy with every moment shared.
// // //           </p>

// // //           <p className="text-[#554d20] text-3xl md:text-4xl leading-snug font-extrabold border-l-10 border-[#d8bf68] pl-10 bg-[#fff9e7] p-8 rounded-r-xl italic max-w-3xl mx-auto shadow-lg tracking-widest">
// // //             “We don’t just mark time — we honor it. Each tick epitomizes our commitment to timeless beauty and thoughtful craftsmanship.”
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default StorySection;

// // // // "use client";
// // // // import React from "react";
// // // // import Image from "next/image";
// // // // import { motion } from "framer-motion";

// // // // const StorySection = () => {
// // // //   return (
// // // //     <section className="relative bg-gradient-to-br from-[#f9f6f1] via-[#fdfdfb] to-[#f6f1e8] py-24 sm:py-32 overflow-hidden">
// // // //       {/* Background pattern layer */}
// // // //       <div
// // // //         className="absolute inset-0 bg-cover bg-center opacity-10"
// // // //         style={{
// // // //           backgroundImage:
// // // //             "url('https://ik.imagekit.io/rajstorage1/store_frontend/7.HEIC?tr=f-webp')",
// // // //         }}
// // // //         aria-hidden="true"
// // // //       ></div>

// // // //       {/* Subtle gold orbs for depth */}
// // // //       <div className="absolute top-0 left-0 w-[25rem] h-[25rem] bg-[#d4af37]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
// // // //       <div className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-[#c0a060]/40 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slow delay-500" />

// // // //       {/* Main Content */}
// // // //       <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
// // // //         <motion.h2
// // // //           initial={{ opacity: 0, y: 40 }}
// // // //           whileInView={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.8 }}
// // // //           className="text-4xl sm:text-6xl font-serif font-extrabold text-center mb-16 tracking-tight text-[#2b2b2b]"
// // // //         >
// // // //           <span className="bg-gradient-to-r from-[#b89b4f] to-[#d6bf77] bg-clip-text text-transparent drop-shadow-md">
// // // //             Our Journey Through Time
// // // //           </span>
// // // //         </motion.h2>

// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 50 }}
// // // //           whileInView={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.9 }}
// // // //           className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 sm:p-16 space-y-10 border-t-[6px] border-[#c9a34e] hover:shadow-[0_0_45px_-12px_rgba(201,163,78,0.4)] transition-all duration-700"
// // // //         >
// // // //           {/* Opening Paragraph */}
// // // //           <p className="text-[#3f3f3f] text-lg sm:text-xl leading-relaxed border-l-4 border-[#d4b66a] pl-5 italic font-light">
// // // //             Every timeless story begins humbly — ours started in the early 1990s,
// // // //             when dreams were forged through dedication and craftsmanship. At the
// // // //             heart of it was one man — our founder,{" "}
// // // //             <span className="font-semibold text-[#a07d2c]">
// // // //               Rajkumar Chhatwani
// // // //             </span>
// // // //             — who transformed a small repair shop into the cornerstone of a legacy
// // // //             that still defines us today.
// // // //           </p>

// // // //           {/* Founder Section */}
// // // //           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-gradient-to-br from-[#faf7f0] to-[#fefcf8] p-8 rounded-3xl border border-[#e7d8a1]/60 hover:shadow-lg transition-all duration-500">
// // // //             {/* Portrait */}
// // // //             <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[5px] border-[#d1b45a] shadow-xl hover:scale-105 transition-all duration-500">
// // // //               <Image
// // // //                 src="https://ik.imagekit.io/rajstorage1/store_frontend/6.HEIC?tr=f-webp"
// // // //                 alt="Portrait of Rajkumar Chhatwani"
// // // //                 fill
// // // //                 className="object-cover object-center scale-125"
// // // //               />
// // // //             </div>

// // // //             {/* Founder Text */}
// // // //             <div className="text-center sm:text-left max-w-2xl">
// // // //               <h3 className="text-2xl font-semibold text-[#2a2a2a] mb-2 font-serif">
// // // //                 A Visionary’s Dedication
// // // //               </h3>
// // // //               <p className="text-[#4a4a4a] text-base sm:text-lg leading-relaxed font-light">
// // // //                 “Rajkumar Chhatwani taught us that true luxury lies not in price,
// // // //                 but in passion — the pursuit of excellence, precision, and trust.
// // // //                 From a humble workshop to a name synonymous with craftsmanship,
// // // //                 his journey continues to inspire every piece we create.”
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           {/* Company Evolution */}
// // // //           <p className="text-[#3e3e3e] text-lg sm:text-xl leading-relaxed font-light">
// // // //             From those beginnings, we’ve evolved into a{" "}
// // // //             <span className="font-medium text-[#9f7b25]">
// // // //               trusted name in timekeeping
// // // //             </span>
// // // //             — one that celebrates honesty, artistry, and precision.
// // // //           </p>

// // // //           {/* Brand Range */}
// // // //           <p className="text-[#2f2f2f] text-lg sm:text-xl leading-relaxed bg-[#fdfaf3] p-5 rounded-xl border-y border-[#e2c987]/70 font-light">
// // // //             Today, we proudly curate masterpieces from world-renowned houses like{" "}
// // // //             <span className="font-semibold text-[#b4903c]">
// // // //               Fossil, Tommy Hilfiger, Casio, Police
// // // //             </span>
// // // //             , and{" "}
// // // //             <span className="font-semibold text-[#b4903c]">Kenneth Cole</span>,
// // // //             alongside Indian icons such as{" "}
// // // //             <span className="font-semibold text-[#b4903c]">Titan</span> and{" "}
// // // //             <span className="font-semibold text-[#b4903c]">Sonata</span>.  
// // // //             Every collection embodies refinement, heritage, and the beauty of
// // // //             perfect timing.
// // // //           </p>

// // // //           {/* Closing Statement */}
// // // //           <p className="text-[#3b3b3b] text-lg sm:text-xl leading-relaxed font-light">
// // // //             Each timepiece we offer reflects individuality and aspiration — a
// // // //             companion in life’s most meaningful moments. Our customers are not
// // // //             merely patrons; they are part of our enduring legacy.
// // // //           </p>

// // // //           <p className="text-[#2c2c2c] text-xl sm:text-2xl leading-snug font-semibold border-l-8 border-[#d6b05d] pl-6 bg-[#fcf8ef] p-4 rounded-r-xl italic">
// // // //             “We don’t just measure time — we honor it.  
// // // //             Every tick echoes our promise of elegance, craftsmanship, and grace.”
// // // //           </p>
// // // //         </motion.div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default StorySection;


// // // // // "use client";
// // // // // import React from "react";
// // // // // import Image from "next/image";

// // // // // const StorySection = () => {
// // // // //   return (
// // // // //     <section className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 py-24 sm:py-32 overflow-hidden">
// // // // //       {/* Background image layer */}
// // // // //       <div
// // // // //         className="absolute inset-0 bg-cover bg-center opacity-10"
// // // // //         style={{
// // // // //           backgroundImage:
// // // // //             "url('https://ik.imagekit.io/rajstorage1/store_frontend/7.HEIC?tr=f-webp')",
// // // // //         }}
// // // // //         aria-hidden="true"
// // // // //       ></div>

// // // // //       {/* Decorative blur orbs */}
// // // // //       <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse" />
// // // // //       <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse delay-500" />

// // // // //       {/* Main Content */}
// // // // //       <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
// // // // //         <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 text-center mb-16 tracking-tight drop-shadow-sm">
// // // // //           <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
// // // // //             Our Journey Through Time
// // // // //           </span>
// // // // //         </h2>

// // // // //         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 sm:p-16 space-y-10 border-t-8 border-blue-600/70 hover:shadow-[0_0_50px_-12px_rgba(37,99,235,0.4)] transition-all duration-500">
// // // // //           {/* Opening Paragraph */}
// // // // //           <p className="text-gray-800 text-lg sm:text-xl leading-relaxed border-l-4 border-pink-400 pl-5 italic">
// // // // //             Every great story starts small — ours began in the early 1990s, when
// // // // //             times were tough and dreams were harder to chase. In the heart of
// // // // //             that era, one young man — our founder,{" "}
// // // // //             <span className="font-bold text-blue-700">
// // // // //               Rajkumar Chhatwani
// // // // //             </span>{" "}
// // // // //             — dared to dream big. With a simple repair shop and a few tools, he
// // // // //             set out to build something lasting — a legacy that would stand the
// // // // //             test of time.
// // // // //           </p>

// // // // //           {/* Founder Section */}
// // // // //           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-gradient-to-br from-blue-50/80 to-white p-8 rounded-3xl border border-blue-200 hover:shadow-lg transition-all duration-300">
// // // // //             {/* Portrait */}
// // // // //             <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[6px] border-blue-400 shadow-xl hover:scale-105 transition-all duration-500">
// // // // //               <Image
// // // // //                 src="https://ik.imagekit.io/rajstorage1/store_frontend/6.HEIC?tr=f-webp"
// // // // //                 alt="Portrait of Rajkumar Chhatwani"
// // // // //                 fill
// // // // //                 className="object-cover object-center scale-125"
// // // // //               />
// // // // //             </div>

// // // // //             {/* Founder Text */}
// // // // //             <div className="text-center sm:text-left max-w-2xl">
// // // // //               <h3 className="text-2xl font-bold text-gray-900 mb-2">
// // // // //                 A Visionary’s Dedication
// // // // //               </h3>
// // // // //               <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
// // // // //                 “Our founder, Rajkumar Chhatwani, instilled in us a philosophy
// // // // //                 that goes beyond mere commerce. It’s about a commitment to
// // // // //                 quality, a passion for precision, and an unwavering belief in
// // // // //                 the value of every tick and tock. His journey from a humble
// // // // //                 repair shop to a trusted name is the heartbeat of our brand.”
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Company Evolution */}
// // // // //           <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
// // // // //             From those humble beginnings, we’ve evolved into a{" "}
// // // // //             <span className="font-semibold text-blue-700">
// // // // //               trusted name for wristwatches and wall clocks
// // // // //             </span>{" "}
// // // // //             — a name that has come to symbolize honesty, skill, and dedication.
// // // // //           </p>

// // // // //           {/* Brand Range */}
// // // // //           <p className="text-gray-800 text-lg sm:text-xl leading-relaxed bg-blue-50/50 p-4 rounded-xl border-y border-blue-200">
// // // // //             Today, we’re proud to offer something for everyone and every
// // // // //             occasion. From iconic global names like{" "}
// // // // //             <span className="font-bold text-blue-700">
// // // // //               Fossil, Tommy Hilfiger, Casio, Police
// // // // //             </span>{" "}
// // // // //             and{" "}
// // // // //             <span className="font-bold text-blue-700">Kenneth Cole</span> to
// // // // //             trusted Indian classics like{" "}
// // // // //             <span className="font-bold text-blue-700">Titan</span> and{" "}
// // // // //             <span className="font-bold text-blue-700">Sonata</span>, our range
// // // // //             reflects every shade of ambition and occasion — keeping you on time
// // // // //             and in style.
// // // // //           </p>

// // // // //           {/* Closing Statement */}
// // // // //           <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
// // // // //             Our timepieces adorn countless wrists and walls, each one reflecting
// // // // //             who you are and where you’re headed. Because for us, time is
// // // // //             personal — and so are you. Our customers aren’t just clients;
// // // // //             they’re family. Every purchase, every visit, every shared story
// // // // //             continues to shape who we are.
// // // // //           </p>

// // // // //           <p className="text-gray-900 text-xl sm:text-2xl leading-snug font-extrabold border-l-8 border-pink-500 pl-6 bg-pink-50/70 p-4 rounded-r-xl italic">
// // // // //             “We don’t just measure time. We celebrate it — one masterpiece at a
// // // // //             time. As we move forward, our vision remains the same: to keep
// // // // //             creating timepieces that don’t just tell time, but inspire people to
// // // // //             make the most of it.”
// // // // //           </p>
// // // // //         </div>
// // // // //       </div> {/* ✅ Added missing closing div */}
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default StorySection;
