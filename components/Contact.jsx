"use client"
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    company: "",
    message: "",
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      gsap.fromTo(
        form,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          company: formData.company,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        publicKey
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          setFormData({ from_name: "", from_email: "", company: "", message: "" });
        },
        (error) => {
          alert("❌ Something went wrong. Please try again later.");
        }
      );
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: "Praveen.chhatwani@gmail.com",
      subtitle: "Replies within 24 hours",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: "8984509091",
      subtitle: "Mon–Sun 9AM–10PM IST",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      details: "Opp. Uma Talkies, Bisra Road, Rourkela",
      subtitle: "By appointment only",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-[#f8f3e2] via-[#e7dcc1] to-[#f6ecd0] overflow-hidden"
    >
      {/* Gold Glow Orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-60 h-60 bg-gradient-to-br from-[#dec681] to-[#b49c61] rounded-full opacity-30 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-gradient-to-tr from-[#c6ab63] to-[#e9d595] rounded-full opacity-30 blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#ad943f] mb-6 tracking-wide drop-shadow-sm">
            Let's Start Your Timeless Journey
          </h2>
          <p className="text-xl text-[#6e6127] font-light max-w-2xl mx-auto leading-relaxed">
            Every second counts — let’s make yours timeless. Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Contact Information */}
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-[#e9dfa9]/70 via-white/50 to-[#efe0c6]/80 rounded-2xl p-9 shadow-lg border border-[#e8dfbe]">
              <h3 className="text-2xl font-serif font-semibold text-[#926e1b] mb-6">
                Why Choose Us?
              </h3>
              <ul className="space-y-5 text-[#7e6220]">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#c8a944] rounded-full mt-2 mr-4"></span>
                  <span>Bespoke discounts for businesses & connoisseurs</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#c8a944] rounded-full mt-2 mr-4"></span>
                  <span>Expedited, secure shipping on all premium orders</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#c8a944] rounded-full mt-2 mr-4"></span>
                  <span>One-on-one guidance for collection curation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-white/70 border border-[#f1e5c5] rounded-xl shadow-sm hover:shadow-lg transition duration-300"
                >
                  <div className="text-[#b89a34] mr-4 mt-1">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-[#a58839] mb-1">{info.title}</h4>
                    <p className="text-[#6b522e] font-medium">{info.details}</p>
                    <p className="text-[#b5a177] text-sm">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-7 bg-white/70 border border-[#eadca9] rounded-2xl shadow-xl p-10 backdrop-blur-lg">
            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <label className="block text-sm font-medium text-[#8e7c38] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-[#e7d7a5] rounded-xl bg-white/70 focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8e7c38] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-[#e7d7a5] rounded-xl bg-white/70 focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8e7c38] mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-[#e7d7a5] rounded-xl bg-white/70 focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8e7c38] mb-2">
                Message *
              </label>
              <textarea
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements or questions..."
                className="w-full px-4 py-3 border border-[#e7d7a5] rounded-xl bg-white/70 focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d8bb67] to-[#9d7d2d] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#cdb256] hover:to-[#8c6c19] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// "use client"
// import React, { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import emailjs from '@emailjs/browser';

// gsap.registerPlugin(ScrollTrigger);

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     from_name: "",
//     from_email: "",
//     company: "",
//     message: "",
//   });

//   const sectionRef = useRef(null);
//   const formRef = useRef(null);

//   useEffect(() => {
//     const form = formRef.current;
//     if (form) {
//       gsap.fromTo(
//         form,
//         { opacity: 0, x: 100 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: form,
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Secure EmailJS submission using .env variables
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
//     const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
//     const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

//     emailjs
//       .send(
//         serviceId,
//         templateId,
//         {
//           from_name: formData.from_name,
//           from_email: formData.from_email,
//           company: formData.company,
//           message: formData.message,
//           time: new Date().toLocaleString(),
//         },
//         publicKey
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           alert("✅ Message sent successfully!");
//           setFormData({ from_name: "", from_email: "", company: "", message: "" });
//         },
//         (error) => {
//           console.error(error.text);
//           alert("❌ Something went wrong. Please try again later.");
//         }
//       );
//   };

//   const contactInfo = [
//     {
//       icon: <Mail className="h-6 w-6" />,
//       title: "Email Us",
//       details: "Praveen.chhatwani@gmail.com",
//       subtitle: "We reply within 24 hours",
//     },
//     {
//       icon: <Phone className="h-6 w-6" />,
//       title: "Call Us",
//       details: "8984509091",
//       subtitle: "Mon-Sun 9AM-10PM EST",
//     },
//     {
//       icon: <MapPin className="h-6 w-6" />,
//       title: "Visit Us",
//       details: "Opposite Uma Talkies, Bisra Road, Rourkela",
//       subtitle: "Schedule an appointment",
//     },
//   ];

//   return (
//     <section id="contact" ref={sectionRef} className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Let's Start Your Timeless Journey
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Every second counts — let’s make yours timeless. Get in touch with us today.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl p-8 text-white">
//               <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start">
//                   <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
//                   <span>Bulk discounts available for businesses</span>
//                 </li>
               
//                 <li className="flex items-start">
//                   <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
//                   <span>Fast shipping and reliable delivery</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
//                   <span>Expert consultation on sustainability transition</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
//                 >
//                   <div className="text-blue-600 mr-4 mt-1">{info.icon}</div>
//                   <div>
//                     <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
//                     <p className="text-gray-800 font-medium">{info.details}</p>
//                     <p className="text-gray-600 text-sm">{info.subtitle}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Form */}
//           <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="from_name"
//                   required
//                   value={formData.from_name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="from_email"
//                   required
//                   value={formData.from_email}
//                   onChange={handleChange}
//                   placeholder="john@company.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 name="company"
//                 value={formData.company}
//                 onChange={handleChange}
//                 placeholder="Your Company"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Message *
//               </label>
//               <textarea
//                 name="message"
//                 rows="6"
//                 required
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Tell us about your requirements or questions..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
//             >
//               <Send className="h-5 w-5 mr-2" />
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
