"use client"
import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const reviews = [
  {
    text: "I’ve been wearing my RajWatches watch for over a year now, and it still looks as stunning as the day I bought it. The craftsmanship, attention to detail, and timeless design truly set it apart. It’s more than just a timepiece — it’s a statement of class.",
    name: "— Sidhant Pandey",
  },
  {
    text: "What drew me to RajWatches was their commitment to sustainability. Knowing my watch was made with eco-friendly materials makes it even more special. It’s stylish, durable, and aligns perfectly with my values.",
    name: "— Soumya Ranjan Nanda",
  },
  {
    text: "Every time I wear my RajWatches watch, I get compliments. The weight, finish, and design scream luxury. It’s become my go-to accessory for both business meetings and evening events.",
    name: "— Om Prakash Deo",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Function to calculate which 3 cards to show
  const getVisibleReviews = () => {
    return [
      reviews[currentIndex],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
    ];
  };

  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          What Our Customers Say
        </h2>

        {/* Slider Container */}
        <div className="flex gap-6 justify-center transition-transform duration-700 ease-in-out">
          {getVisibleReviews().map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 w-80 md:w-96 relative"
            >
              <Quote className="w-8 h-8 text-gray-300 absolute top-6 left-6" />
              <p className="text-gray-700 text-base leading-relaxed mt-4">
                {review.text}
              </p>
              <p className="mt-6 text-gray-900 font-semibold text-right">
                {review.name}
              </p>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-gray-800 scale-110" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
