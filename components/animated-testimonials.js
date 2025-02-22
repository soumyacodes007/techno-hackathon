'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

// Predefined rotation values to avoid random numbers
const rotations = [10, 7, -7, -10, 5, -5];

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent mb-6">
            What Our Users Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied professionals who have transformed their careers with our AI-powered guidance
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Image Section */}
            <div>
              <div className="relative h-80 w-full">
                <AnimatePresence mode="wait">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, scale: 0.9, z: -100 }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0.7,
                        scale: isActive(index) ? 1 : 0.95,
                        z: isActive(index) ? 0 : -100,
                        rotate: rotations[index % rotations.length],
                        zIndex: isActive(index) ? 999 : testimonials.length - index,
                      }}
                      exit={{ opacity: 0, scale: 0.9, z: -100 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <div className="relative h-full w-full rounded-3xl overflow-hidden bg-neutral-900/50 backdrop-blur-sm border border-neutral-800">
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                          <User className="w-24 h-24 text-neutral-600" />
                        </div>
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover relative z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex justify-between flex-col py-4">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {testimonials[active].role}
                </p>
                <p className="text-lg text-neutral-300 mt-8">
                  {testimonials[active].text}
                </p>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-300"
                >
                  <IconArrowLeft className="h-5 w-5 text-neutral-400" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-300"
                >
                  <IconArrowRight className="h-5 w-5 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
