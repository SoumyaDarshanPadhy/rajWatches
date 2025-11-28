import React from 'react';
import { Shield, Truck, Award, Clock, Star } from 'lucide-react';

function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Assured Warranty",
      description:
        "Comprehensive warranty coverage on all our premium timepieces with free servicing",
    },
    {
      icon: <Truck className="h-7 w-7" />,
      title: "Free Shipping",
      description:
        "Complimentary shipping on all orders above ₹2000 with express delivery options",
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Certified Quality",
      description:
        "All watches are certified for authenticity and quality by international standards",
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Expert Craftsmanship",
      description:
        "Over 56 years of expertise in creating exceptional timepieces",
    },
    {
      icon: <Star className="h-7 w-7" />,
      title: "Premium Experience",
      description:
        "Luxury shopping experience with personalized service and exclusive collections",
    },
  ];

  const cardClass =
    "w-full max-w-[420px] bg-white/60 backdrop-blur-xl border border-[#e3ca8d] rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 text-center p-8 group";

  const cardStyle = { boxShadow: '0 6px 32px -12px rgba(198,174,94,0.22)' };

  return (
    <section className="py-18 sm:py-24 bg-gradient-to-tr from-[#251e10] via-[#ece2c9] to-[#dccca3] relative overflow-hidden">
      {/* GOLDEN GLOW OVERLAYS */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-[#c9a048]/70 via-[#fae9b6]/30 to-[#bda763]/40 rounded-full opacity-60 blur-[85px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-gradient-to-tr from-[#94732f]/60 via-[#fff7e2]/30 to-[#dac48c]/50 rounded-full opacity-70 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#907029] drop-shadow-[0_2px_5px_rgba(160,123,48,0.12)] mb-5 tracking-tight">
            Why Choose Raj Watches
          </h2>
          <p className="text-lg sm:text-xl text-[#634e17] max-w-2xl mx-auto font-light">
            Where heritage meets modern elegance—experience the elevated world of fine watches and exclusive service
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className={cardClass} style={cardStyle}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#e5c97b] to-[#b59741] text-white rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#967727] mb-2 font-serif group-hover:text-[#bb993d] transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-[#3c3314] text-[1.04rem] leading-normal font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {features.slice(3).map((feature, idx) => (
            <div key={idx + 3} className={cardClass} style={cardStyle}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#e5c97b] to-[#b59741] text-white rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#967727] mb-2 font-serif group-hover:text-[#bb993d] transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-[#3c3314] text-[1.04rem] leading-normal font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Luxe Community Section */}
        {/* Luxe Community Section */}
<div className="mt-20 flex flex-col items-center">
  <div className="bg-white/40 border border-[#ede1bb] backdrop-blur-xl px-8 py-10 rounded-3xl shadow-xl max-w-3xl w-full">
    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#aa9039] mb-3 text-center tracking-wide">
      Join Our Premium Community
    </h3>
    <p className="text-lg text-[#a48940] mb-6 font-light text-center max-w-2xl mx-auto">
      Become part of an exclusive circle—enjoy special privileges, early access to new collections, and tailored recommendations.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-7">
      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-b from-[#f7c948] to-[#d79b2d] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(247,201,72,0.45)]">
          50,000+
        </div>
        <div className="text-sm text-[#7b6f45] font-medium">Happy Customers</div>
      </div>

      <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />

      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-b from-[#f7c948] to-[#d79b2d] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(247,201,72,0.45)]">
          56+
        </div>
        <div className="text-sm text-[#7b6f45] font-medium">Years of Excellence</div>
      </div>

      <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />

      <div className="text-center">
        <div className="text-3xl font-bold bg-gradient-to-b from-[#f7c948] to-[#d79b2d] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(247,201,72,0.45)]">
          3,000+
        </div>
        <div className="text-sm text-[#7b6f45] font-medium">Premium Timepieces</div>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}

export default WhyChooseUs;



// import React from 'react';
// import { Shield, Truck, Award, Clock, Star } from 'lucide-react';

// function WhyChooseUs() {
//   // Reordered so the two previously-last items sit in the middle visually
//   const features = [
//     {
//       icon: <Shield className="h-7 w-7" />,
//       title: "Assured Warranty",
//       description:
//         "Comprehensive warranty coverage on all our premium timepieces with free servicing",
//     },
//     {
//       icon: <Truck className="h-7 w-7" />,
//       title: "Free Shipping",
//       description:
//         "Complimentary shipping on all orders above ₹2000 with express delivery options",
//     },

//     // moved here to be in-between the top row and the remaining items
//     {
//       icon: <Clock className="h-7 w-7" />,
//       title: "Expert Craftsmanship",
//       description:
//         "Over 56 years of expertise in creating exceptional timepieces",
//     },

//     {
//       icon: <Award className="h-7 w-7" />,
//       title: "Certified Quality",
//       description:
//         "All watches are certified for authenticity and quality by international standards",
//     },

//     // also moved into the middle region
//     {
//       icon: <Star className="h-7 w-7" />,
//       title: "Premium Experience",
//       description:
//         "Luxury shopping experience with personalized service and exclusive collections",
//     },
//   ];

//   return (
//     <section className="py-18 sm:py-24 bg-gradient-to-tr from-[#251e10] via-[#ece2c9] to-[#dccca3] relative overflow-hidden">
//       {/* GOLDEN GLOW OVERLAYS */}
//       <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-[#c9a048]/70 via-[#fae9b6]/30 to-[#bda763]/40 rounded-full opacity-60 blur-[85px] pointer-events-none"></div>
//       <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-gradient-to-tr from-[#94732f]/60 via-[#fff7e2]/30 to-[#dac48c]/50 rounded-full opacity-70 blur-[100px] pointer-events-none"></div>

//       <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#907029] drop-shadow-[0_2px_5px_rgba(160,123,48,0.12)] mb-5 tracking-tight">
//             Why Choose Raj Watches
//           </h2>
//           <p className="text-lg sm:text-xl text-[#634e17] max-w-2xl mx-auto font-light">
//             Where heritage meets modern elegance—experience the elevated world of fine watches and exclusive service
//           </p>
//         </div>

//         {/* Features grid:
//             - on large screens three columns (top row 3 items)
//             - the remaining two items automatically wrap to a second row centered,
//               because we use justify-items-center and each card has a fixed max width
//         */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="w-full max-w-[420px] bg-white/60 backdrop-blur-xl border border-[#e3ca8d] rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 text-center p-8 group"
//               style={{ boxShadow: '0 6px 32px -12px rgba(198,174,94,0.22)' }}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#e5c97b] to-[#b59741] text-white rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                 {feature.icon}
//               </div>
//               <h3 className="text-lg font-semibold text-[#967727] mb-2 font-serif group-hover:text-[#bb993d] transition-colors duration-200">
//                 {feature.title}
//               </h3>
//               <p className="text-[#3c3314] text-[1.04rem] leading-normal font-light">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Luxe Community Section */}
//         <div className="mt-20 flex flex-col items-center">
//           <div className="bg-white/40 border border-[#ede1bb] backdrop-blur-xl px-8 py-10 rounded-3xl shadow-xl max-w-3xl w-full">
//             <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#aa9039] mb-3 text-center tracking-wide">
//               Join Our Premium Community
//             </h3>
//             <p className="text-lg text-[#a48940] mb-6 font-light text-center max-w-2xl mx-auto">
//               Become part of an exclusive circle—enjoy special privileges, early access to new collections, and tailored recommendations.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-7">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">50,000+</div>
//                 <div className="text-sm text-[#7b6f45] font-medium">Happy Customers</div>
//               </div>
//               <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">56+</div>
//                 <div className="text-sm text-[#7b6f45] font-medium">Years of Excellence</div>
//               </div>
//               <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">3,000+</div>
//                 <div className="text-sm text-[#7b6f45] font-medium">Premium Timepieces</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default WhyChooseUs;
























// // import React from 'react';
// // import { Shield, Truck, Award, Headphones, Clock, Star } from 'lucide-react';

// // function WhyChooseUs() {
// //   const features = [
// //     {
// //       icon: <Shield className="h-7 w-7" />,
// //       title: "Assured Warranty",
// //       description: "Comprehensive warranty coverage on all our premium timepieces with free servicing",
// //     },
// //     {
// //       icon: <Truck className="h-7 w-7" />,
// //       title: "Free Shipping",
// //       description: "Complimentary shipping on all orders above ₹2000 with express delivery options",
// //     },
// //     {
// //       icon: <Award className="h-7 w-7" />,
// //       title: "Certified Quality",
// //       description: "All watches are certified for authenticity and quality by international standards",
// //     },
// //     // {
// //     //   icon: <Headphones className="h-7 w-7" />,
// //     //   title: "24/7 Support",
// //     //   description: "Round-the-clock customer support for all your queries and service needs",
// //     // },
// //     {
// //       icon: <Clock className="h-7 w-7" />,
// //       title: "Expert Craftsmanship",
// //       description: "Over 56 years of expertise in creating exceptional timepieces",
// //     },
// //     {
// //       icon: <Star className="h-7 w-7" />,
// //       title: "Premium Experience",
// //       description: "Luxury shopping experience with personalized service and exclusive collections",
// //     },
// //   ];

// //   return (
// //     <section className="py-18 sm:py-24 bg-gradient-to-tr from-[#251e10] via-[#ece2c9] to-[#dccca3] relative overflow-hidden">
// //       {/* GOLDEN GLOW OVERLAYS */}
// //       <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-[#c9a048]/70 via-[#fae9b6]/30 to-[#bda763]/40 rounded-full opacity-60 blur-[85px] pointer-events-none"></div>
// //       <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-gradient-to-tr from-[#94732f]/60 via-[#fff7e2]/30 to-[#dac48c]/50 rounded-full opacity-70 blur-[100px] pointer-events-none"></div>
      
// //       <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <h2 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#907029] drop-shadow-[0_2px_5px_rgba(160,123,48,0.12)] mb-5 tracking-tight">
// //             Why Choose Raj Watches
// //           </h2>
// //           <p className="text-lg sm:text-xl text-[#634e17] max-w-2xl mx-auto font-light">
// //             Where heritage meets modern elegance—experience the elevated world of fine watches and exclusive service
// //           </p>
// //         </div>

// //         {/* Features */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {features.map((feature, idx) => (
// //             <div
// //               key={idx}
// //               className="bg-white/60 backdrop-blur-xl border border-[#e3ca8d] rounded-2xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 text-center p-8 group"
// //               style={{ boxShadow: '0 6px 32px -12px rgba(198,174,94,0.22)' }}
// //             >
// //               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#e5c97b] to-[#b59741] text-white rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
// //                 {feature.icon}
// //               </div>
// //               <h3 className="text-lg font-semibold text-[#967727] mb-2 font-serif group-hover:text-[#bb993d] transition-colors duration-200">
// //                 {feature.title}
// //               </h3>
// //               <p className="text-[#3c3314] text-[1.04rem] leading-normal font-light">
// //                 {feature.description}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Luxe Community Section */}
// //         <div className="mt-20 flex flex-col items-center">
// //           <div className="bg-white/40 border border-[#ede1bb] backdrop-blur-xl px-8 py-10 rounded-3xl shadow-xl max-w-3xl w-full">
// //             <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#aa9039] mb-3 text-center tracking-wide">
// //               Join Our Premium Community
// //             </h3>
// //             <p className="text-lg text-[#a48940] mb-6 font-light text-center max-w-2xl mx-auto">
// //               Become part of an exclusive circle—enjoy special privileges, early access to new collections, and tailored recommendations.
// //             </p>
// //             <div className="flex flex-col sm:flex-row items-center justify-center gap-7">
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">50,000+</div>
// //                 <div className="text-sm text-[#7b6f45] font-medium">Happy Customers</div>
// //               </div>
// //               <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">56+</div>
// //                 <div className="text-sm text-[#7b6f45] font-medium">Years of Excellence</div>
// //               </div>
// //               <div className="h-8 w-[2.5px] bg-gradient-to-b from-[#d4bc71] via-[#ecd898] to-[#fff7db] rounded-full hidden sm:block" />
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold text-[#bfa03a] drop-shadow-sm">3,000+</div>
// //                 <div className="text-sm text-[#7b6f45] font-medium">Premium Timepieces</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default WhyChooseUs;













// // import React from 'react';
// // import { Shield, Truck, Award, Headphones, Clock, Star } from 'lucide-react';

// // function WhyChooseUs() {
// //   const features = [
// //     {
// //       icon: <Shield className="h-8 w-8" />,
// //       title: "Assured Warranty",
// //       description:
// //         "Comprehensive warranty coverage on all our premium timepieces with free servicing",
// //     },
// //     {
// //       icon: <Truck className="h-8 w-8" />,
// //       title: "Free Shipping",
// //       description:
// //         "Complimentary shipping on all orders above ₹2000 with express delivery options",
// //     },
// //     {
// //       icon: <Award className="h-8 w-8" />,
// //       title: "Certified Quality",
// //       description:
// //         "All watches are certified for authenticity and quality by international standards",
// //     },
// //     {
// //       icon: <Headphones className="h-8 w-8" />,
// //       title: "24/7 Support",
// //       description:
// //         "Round-the-clock customer support for all your queries and service needs",
// //     },
// //     {
// //       icon: <Clock className="h-8 w-8" />,
// //       title: "Expert Craftsmanship",
// //       description:
// //         "Over 56 years of expertise in creating exceptional timepieces",
// //     },
// //     {
// //       icon: <Star className="h-8 w-8" />,
// //       title: "Premium Experience",
// //       description:
// //         "Luxury shopping experience with personalized service and exclusive collections",
// //     },
// //   ];

// //   return (
// //     <section className="py-16 bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Section Header */}
// //         <div className="text-center mb-12">
// //           <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
// //             Why Choose Raj & Raj Watches
// //           </h2>
// //           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //             Experience the perfect blend of tradition, innovation, and exceptional service that sets us apart
// //           </p>
// //         </div>

// //         {/* Features Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {features.map((feature, index) => (
// //             <div
// //               key={index}
// //               className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
// //             >
// //               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
// //                 {feature.icon}
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">
// //                 {feature.title}
// //               </h3>
// //               <p className="text-gray-600 leading-relaxed">{feature.description}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Community Section */}
// //         <div className="mt-16 bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 lg:p-12 text-center text-white">
// //           <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
// //             Join Our Premium Community
// //           </h3>
// //           <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
// //             Become part of an exclusive community of watch enthusiasts and enjoy special privileges, 
// //             early access to new collections, and personalized recommendations.
// //           </p>
// //           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
// //             <div className="text-center">
// //               <div className="text-3xl font-bold text-yellow-400">50,000+</div>
// //               <div className="text-sm text-gray-300">Happy Customers</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="text-3xl font-bold text-yellow-400">56+</div>
// //               <div className="text-sm text-gray-300">Years of Excellence</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="text-3xl font-bold text-yellow-400">3000+</div>
// //               <div className="text-sm text-gray-300">Premium Timepieces</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // export default WhyChooseUs;