import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Testimonials = ({ testimonials = [] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // duplicate items for seamless scroll
  const items = [...testimonials, ...testimonials];

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 40,
        },
      },
    });
  }, [controls]);

  useEffect(() => {
    if (isPaused) {
      controls.stop(); // pause animation
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 40,
          },
        },
      });
    }
  }, [isPaused, controls]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Heading */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          What Our Community Says
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Real stories from home cooks who transformed their cooking skills with MyKitchen.
        </p>
      </div>

      {/* Slider */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-8 w-max px-4"
          animate={controls}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[320px] shrink-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-orange-400 text-3xl mb-2 leading-none">“</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.message}</p>

              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mt-4 text-yellow-400 text-sm">
                {"★".repeat(item.rating || 5)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Testimonials;
