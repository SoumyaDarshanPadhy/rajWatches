import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

const quickLinks = [
  { name: "Men", href: "/watches/category/men" },
  { name: "Women", href: "/watches/category/women" },
  { name: "Wall Clocks", href: "/watches/category/wallclocks" },
  { name: "New Arrivals", href: "/watches/category/all" },
  { name: "Sale", href: "/watches/category/all" },
];

const Heading = ({ children }) => (
  <div className="inline-block mb-6 px-3 py-1 rounded-lg bg-white/80 shadow-xl">
    <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3d2e0b] tracking-wider drop-shadow-lg">{children}</h2>
  </div>
);

const Footer = () => (
  <footer className="relative bg-gradient-to-br from-[#161308] via-[#201a05] to-[#3d2e0b] text-[#f9ebc2] py-20 px-8 sm:px-20 overflow-hidden">
    {/* Subtle golden orbs for luxe accent */}
    <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#e4ca70] to-[#f6dd7e] opacity-25 blur-3xl" />
    <div className="absolute -bottom-24 -right-28 w-96 h-96 rounded-full bg-gradient-to-bl from-[#bca544] to-[#e9d784] opacity-20 blur-4xl" />

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      {/* Brand Info */}
      <div>
        <Heading>Raj Watches</Heading>
        <p className="text-base leading-relaxed text-[#fae58f] max-w-sm">
          Premium timepieces combining timeless style, unmatched quality, and precision craftsmanship.<br />
          Discover the watch that defines you.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <Heading>Quick Links</Heading>
        <ul className="flex flex-col gap-4 text-[#f6e675] text-base font-semibold">
          {quickLinks.map(({ name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className="hover:text-white hover:underline transition-colors duration-300"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
  <Heading>Get in Touch</Heading>
  <ul className="flex flex-col gap-6 text-[#f6e675] text-base font-semibold">
    {/* Removed email item */}
    <li className="flex items-center gap-3">
      <Phone className="w-6 h-6 text-[#fff9a4]" />
      <span className="hover:text-white transition-colors duration-300">+91 89845 09091</span>
    </li>
  </ul>
</div>

      {/* <div>
        <Heading>Get in Touch</Heading>
        <ul className="flex flex-col gap-6 text-[#f6e675] text-base font-semibold">
          <li className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#fff9a4]" />
            <a
              href="mailto:Praveen.chhatwani@gmail.com"
              className="hover:text-white hover:underline transition-colors duration-300"
            >
              Praveen.chhatwani@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-[#fff9a4]" />
            <span className="hover:text-white transition-colors duration-300">+91 89845 09091</span>
          </li>
        </ul>
      </div> */}

      {/* Social Links */}
      <div>
        <Heading>Follow Us</Heading>
        <div className="flex gap-7">
          <a
            href="https://www.instagram.com/rajwatch_rourkela?igsh=dTIwdDRydmN5Nm1x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#f6e675] hover:text-white transition-colors duration-300"
          >
            <Instagram className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#f6e675] hover:text-[#8ecae6] transition-colors duration-300"
          >
            <Linkedin className="w-8 h-8" />
          </a>
          <a
            href="https://wa.me/8984509091"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-[#f6e675] hover:text-[#7fffa6] transition-colors duration-300"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
    
    {/* Divider */}
    <div className="border-t border-yellow-500/40 mt-16 max-w-5xl mx-auto" />

    {/* Copyright */}
    <div className="text-center pt-6 text-base text-[#fae58f] font-semibold tracking-wide">
      © {new Date().getFullYear()} <span className="text-white font-extrabold">RAJWATCHES.IN</span>. ALL RIGHTS RESERVED.
    </div>
  </footer>
);

export default Footer;

// import React from "react";
// import Link from "next/link"; 
// import { Instagram, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

// const Footer = () => {
//   // Define internal links
//   const quickLinks = [
//     { name: 'Men', href: '/watches/category/men' },
//     { name: 'Women', href: '/watches/category/women' },
//     { name: 'Wall Clocks', href: '/watches/category/wallclocks' },
//     { name: 'New Arrivals', href: '/watches/category/all' },
//     { name: 'Sale', href: '/watches/category/all' },
//   ];

//   return (
//     <footer className="bg-black text-gray-300 py-10 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        
//         {/* About Section (Column 1) */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-3">Raj Watches</h2>
//           <p className="text-sm leading-relaxed text-gray-400">
//             Raj Watches offers premium timepieces combining style, quality, and precision. 
//             Find a watch that defines your personality.
//           </p>
//         </div>

//         {/* Quick Links (Column 2) */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             {quickLinks.map((link) => (
//               <li key={link.name}>
//                 {/* Use Next.js Link for internal navigation */}
//                 <Link 
//                   href={link.href} 
//                   className="hover:text-white transition-colors text-gray-400 hover:ml-1 block"
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Section (Column 3) */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-3">Get in Touch</h2>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-center gap-2">
//               <Mail className="w-4 h-4 text-gray-400" />
//               <a href="mailto:info@rajwatches.in" className="hover:text-white text-gray-400">
//                 Praveen.chhatwani@gmail.com
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <Phone className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-400">+91 89845 09091</span>
//             </li>
//           </ul>
//         </div>

//         {/* Social Links (Column 4) */}
//         <div>
//           <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
//           <div className="flex space-x-5">
//             <a
//               href="https://www.instagram.com/rajwatch_rourkela?igsh=dTIwdDRydmN5Nm1x "
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-500 transition"
//               aria-label="Instagram"
//             >
//               <Instagram className="w-6 h-6" />
//             </a>
//             <a
//               href="https://www.linkedin.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-500 transition"
//               aria-label="LinkedIn"
//             >
//               <Linkedin className="w-6 h-6" />
//             </a>
//             <a
//               href="https://wa.me/8984509091"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-green-500 transition"
//               aria-label="WhatsApp"
//             >
//               {/* MessageCircle is an excellent choice for a generic chat/WhatsApp link */}
//               <MessageCircle className="w-6 h-6" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm text-gray-500">
//         © {new Date().getFullYear()} <span className="text-white font-medium">RajWatches.in</span>. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;