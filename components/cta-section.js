'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CTASection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = document.getElementById('cta-section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      id="cta-section"
      className="relative h-[500px] overflow-hidden"
    >
      {/* Dynamic background gradients */}
      <div className="absolute inset-0 bg-black/80" />
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent animate-pulse" />
      
      {/* Spotlight effect following mouse */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.07), transparent 40%)`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Floating sparkles */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          >
            <Sparkles className="w-8 h-8 text-white/40" />
          </motion.div>

          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Ready to Accelerate Your Career?
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are advancing their careers with AI-powered guidance.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Get Started Now
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
