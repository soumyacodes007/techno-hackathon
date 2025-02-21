'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from './icons';

export default function TestimonialsSection({ testimonials }) {
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
 
  // Use deterministic rotation values based on index
  const getRotation = (index) => {
    const rotations = [-8, -4, 0, 4, 8];
    return rotations[index % rotations.length];
  };

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What Our Users Say
        </motion.h2>
        
        <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <div className="relative h-80 w-full">
                <AnimatePresence mode="wait">
                  {testimonials.map((item, index) => (
                    <motion.div
                      key={item.image}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: getRotation(index),
                      }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0.7,
                        scale: isActive(index) ? 1 : 0.95,
                        z: isActive(index) ? 0 : -100,
                        rotate: isActive(index) ? 0 : getRotation(index),
                        zIndex: isActive(index)
                          ? 999
                          : testimonials.length + 2 - index,
                        y: isActive(index) ? [0, -80, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: getRotation(index),
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                      style={{
                        display: Math.abs(active - index) <= 1 ? 'block' : 'none'
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.author}
                        width={500}
                        height={500}
                        draggable={false}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-between flex-col py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="text-2xl font-bold">
                    {testimonials[active].author}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[active].role} at {testimonials[active].company}
                  </p>
                  <motion.p className="text-lg text-muted-foreground mt-8">
                    {testimonials[active].quote.split(" ").map((word, index) => (
                      <motion.span
                        key={`${active}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                >
                  <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                >
                  <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
