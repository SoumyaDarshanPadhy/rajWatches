import React from 'react';
import { Shield, Truck, Award, Headphones, Clock, Star } from 'lucide-react';

function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Lifetime Warranty",
      description:
        "Comprehensive warranty coverage on all our premium timepieces with free servicing",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description:
        "Complimentary shipping on all orders above ₹2000 with express delivery options",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certified Quality",
      description:
        "All watches are certified for authenticity and quality by international standards",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support for all your queries and service needs",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Expert Craftsmanship",
      description:
        "Over 25 years of expertise in creating exceptional timepieces",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Experience",
      description:
        "Luxury shopping experience with personalized service and exclusive collections",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
            Why Choose Raj & Raj Watches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of tradition, innovation, and exceptional service that sets us apart
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Community Section */}
        <div className="mt-16 bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
            Join Our Premium Community
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of an exclusive community of watch enthusiasts and enjoy special privileges, 
            early access to new collections, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50,000+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">25+</div>
              <div className="text-sm text-gray-300">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">3000+</div>
              <div className="text-sm text-gray-300">Premium Timepieces</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;