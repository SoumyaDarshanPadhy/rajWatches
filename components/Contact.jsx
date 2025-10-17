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
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            end: "bottom 20%",
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

  // ✅ Secure EmailJS submission using .env variables
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
          console.log(result.text);
          alert("✅ Message sent successfully!");
          setFormData({ from_name: "", from_email: "", company: "", message: "" });
        },
        (error) => {
          console.error(error.text);
          alert("❌ Something went wrong. Please try again later.");
        }
      );
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "ndxrajandraj@gmail.com",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: "8984509091",
      subtitle: "Mon-Sat 9AM-10PM EST",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: "Opposite Uma Talkies, Bisra Road, Rourkela",
      subtitle: "Schedule an appointment",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Start Your Timeless Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every second counts — let’s make yours timeless. Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
                  <span>Bulk discounts available for businesses</span>
                </li>
               
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
                  <span>Fast shipping and reliable delivery</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
                  <span>Expert consultation on sustainability transition</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="text-blue-600 mr-4 mt-1">{info.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                    <p className="text-gray-800 font-medium">{info.details}</p>
                    <p className="text-gray-600 text-sm">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements or questions..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
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
