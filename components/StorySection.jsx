import React from "react";

const StorySection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-white to-pink-50 py-24 sm:py-32 overflow-hidden">
      
      {/* Background image layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://ik.imagekit.io/5qrepdiow/store_frontend/2.HEIC')" }}
        aria-hidden="true" 
      ></div>

      {/* Decorative Circles */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse"></div>
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-slow-pulse delay-500"></div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 text-center mb-16 tracking-tight drop-shadow-md">
          🕰️ Our Journey Through Time
        </h2>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-200/50 p-10 sm:p-16 space-y-8 border-t-8 border-blue-600/70 transform hover:shadow-3xl transition-all duration-500 ease-in-out">
          
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed border-l-4 border-pink-400 pl-4">
            Every great story starts small — ours began in the early 1990s, when times were tough and dreams were harder to chase. In the heart of that era, one young man — our founder, <span className="font-bold text-blue-700">Rajkumar Chhatwani</span> — dared to dream big. With a simple repair shop and a few tools, he set out to build something lasting — a legacy that would stand the test of time.
          </p>

          {/* New: Portrait and aligned text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-200">
            {/* Portrait Image */}
            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg border-4 border-blue-400">
              <img 
                src="https://ik.imagekit.io/5qrepdiow/store_frontend/2.HEIC" 
                alt="Portrait of Rajkumar Chhatwani" 
                className="w-full h-full object-cover object-center scale-125" // Adjust scale to crop effectively
              />
            </div>
            {/* Portrait Text */}
            <div className="text-center sm:text-left">
              <p className="text-gray-800 text-xl sm:text-2xl font-semibold mb-2">
                A Visionary's Dedication
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                "Our founder, Rajkumar Chhatwani, instilled in us a philosophy that goes beyond mere commerce. It's about a commitment to quality, a passion for precision, and an unwavering belief in the value of every tick and tock. His journey from a humble repair shop to a trusted name is the heartbeat of our brand."
              </p>
            </div>
          </div>
          {/* End New Section */}

          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            From those humble beginnings, we’ve evolved into a **trusted name for wristwatches and wall clocks** — a name that has come to symbolize honesty, skill, and dedication.
          </p>

          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed bg-blue-50/50 p-4 rounded-xl border-y border-blue-200">
            Today, we’re proud to offer something for everyone and for every occasion. From iconic global names like <span className="font-bold text-blue-700">Fossil</span> and <span className="font-bold text-blue-700">Kenneth Cole</span> to trusted Indian classics like <span className="font-bold text-blue-700">Titan</span> and <span className="font-bold text-blue-700">Sonata</span>, our range reflects every shade of ambition and occasion, keeping you on time and in style.
          </p>

          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Our timepieces adorn countless wrists and walls, each one reflecting who you are and where you’re headed. Because for us, time is personal — and so are you. Our customers aren’t just clients; they’re family. Every purchase, every visit, every shared story continues to shape who we are.
          </p>

          <p className="text-gray-900 text-xl sm:text-2xl leading-snug font-extrabold border-l-8 border-pink-500 pl-6 bg-pink-50/70 p-4 rounded-r-xl italic">
            "We don’t just measure time. We celebrate it — one masterpiece at a time. As we move forward, our vision remains the same — to keep creating timepieces that don’t just tell time, but inspire people to make the most of it."
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;