"use client";
import React from "react";
import Image from "next/image";

const StorySection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 py-24 sm:py-32 overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/rajstorage1/store_frontend/7.HEIC?tr=f-webp')",
        }}
        aria-hidden="true"
      ></div>

      {/* Decorative blur orbs */}
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse delay-500"></div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 text-center mb-16 tracking-tight drop-shadow-sm">
          <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            Our Journey Through Time
          </span>
        </h2>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 sm:p-16 space-y-10 border-t-8 border-blue-600/70 hover:shadow-[0_0_50px_-12px_rgba(37,99,235,0.4)] transition-all duration-500">
          {/* Opening Paragraph */}
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed border-l-4 border-pink-400 pl-5 italic">
            Every great story starts small — ours began in the early 1990s, when
            times were tough and dreams were harder to chase. In the heart of
            that era, one young man — our founder,{" "}
            <span className="font-bold text-blue-700">
              Rajkumar Chhatwani
            </span>{" "}
            — dared to dream big. With a simple repair shop and a few tools, he
            set out to build something lasting — a legacy that would stand the
            test of time.
          </p>

          {/* Founder Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-gradient-to-br from-blue-50/80 to-white p-8 rounded-3xl border border-blue-200 hover:shadow-lg transition-all duration-300">
            {/* Portrait */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[6px] border-blue-400 shadow-xl hover:scale-105 transition-all duration-500">
              <Image
                src="https://ik.imagekit.io/rajstorage1/store_frontend/6.HEIC?tr=f-webp"
                alt="Portrait of Rajkumar Chhatwani"
                fill
                className="object-cover object-center scale-125"
              />
            </div>

            {/* Founder Text */}
            <div className="text-center sm:text-left max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                A Visionary’s Dedication
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                “Our founder, Rajkumar Chhatwani, instilled in us a philosophy
                that goes beyond mere commerce. It’s about a commitment to
                quality, a passion for precision, and an unwavering belief in
                the value of every tick and tock. His journey from a humble
                repair shop to a trusted name is the heartbeat of our brand.”
              </p>
            </div>
          </div>

          {/* Company Evolution */}
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            From those humble beginnings, we’ve evolved into a{" "}
            <span className="font-semibold text-blue-700">
              trusted name for wristwatches and wall clocks
            </span>{" "}
            — a name that has come to symbolize honesty, skill, and dedication.
          </p>

          {/* Brand Range */}
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed bg-blue-50/50 p-4 rounded-xl border-y border-blue-200">
            Today, we’re proud to offer something for everyone and every
            occasion. From iconic global names like{" "}
            <span className="font-bold text-blue-700">
              Fossil, Tommy Hilfiger, Casio, Police
            </span>{" "}
            and{" "}
            <span className="font-bold text-blue-700">Kenneth Cole</span> to
            trusted Indian classics like{" "}
            <span className="font-bold text-blue-700">Titan</span> and{" "}
            <span className="font-bold text-blue-700">Sonata</span>, our range
            reflects every shade of ambition and occasion — keeping you on time
            and in style.
          </p>

          {/* Closing Statement */}
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Our timepieces adorn countless wrists and walls, each one reflecting
            who you are and where you’re headed. Because for us, time is
            personal — and so are you. Our customers aren’t just clients;
            they’re family. Every purchase, every visit, every shared story
            continues to shape who we are.
          </p>

          <p className="text-gray-900 text-xl sm:text-2xl leading-snug font-extrabold border-l-8 border-pink-500 pl-6 bg-pink-50/70 p-4 rounded-r-xl italic">
            “We don’t just measure time. We celebrate it — one masterpiece at a
            time. As we move forward, our vision remains the same: to keep
            creating timepieces that don’t just tell time, but inspire people to
            make the most of it.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
