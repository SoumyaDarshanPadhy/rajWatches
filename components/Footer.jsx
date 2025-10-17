
import React from "react";
import Link from "next/link"; 
import { Instagram, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  // Define internal links
  const quickLinks = [
    { name: 'Men', href: '/watches/category/men' },
    { name: 'Women', href: '/watches/category/women' },
    { name: 'Wall Clocks', href: '/watches/category/wallclocks' },
    { name: 'New Arrivals', href: '/watches/category/all' },
    { name: 'Sale', href: '/watches/category/all' },
  ];

  return (
    <footer className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About Section (Column 1) */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Raj Watches</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Raj Watches offers premium timepieces combining style, quality, and precision. 
            Find a watch that defines your personality.
          </p>
        </div>

        {/* Quick Links (Column 2) */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                {/* Use Next.js Link for internal navigation */}
                <Link 
                  href={link.href} 
                  className="hover:text-white transition-colors text-gray-400 hover:ml-1 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section (Column 3) */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Get in Touch</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <a href="mailto:info@rajwatches.in" className="hover:text-white text-gray-400">
                ndxrajandraj@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">+91 89845 09091</span>
            </li>
          </ul>
        </div>

        {/* Social Links (Column 4) */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex space-x-5">
            <a
              href="https://www.instagram.com/rajwatch_rourkela?igsh=dTIwdDRydmN5Nm1x "
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/8984509091"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
              aria-label="WhatsApp"
            >
              {/* MessageCircle is an excellent choice for a generic chat/WhatsApp link */}
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-medium">RajWatches.in</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;