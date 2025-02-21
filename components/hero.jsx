"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="w-full min-h-screen pt-36 md:pt-48 pb-10 relative overflow-hidden bg-[#090909]">
      <div className="absolute inset-0 w-full h-full">
        <div className="aura-background">
          <div 
            className="light-orb light-orb-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          ></div>
          <div 
            className="light-orb light-orb-2"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            }}
          ></div>
          <div 
            className="light-orb light-orb-3"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            }}
          ></div>
        </div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Falling Beams */}
      <div className="beam-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="beam" style={{ 
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 7}s`
          }}></div>
        ))}
      </div>

      <div className="relative z-10 space-y-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mx-auto"
        >
          <motion.h1 
            className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl text-white font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your AI Professional Coach
            </motion.span>
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Neotutor
            </motion.span>
          </motion.h1>
          <motion.p 
            className="mx-auto max-w-[600px] text-gray-400 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Advance your learning process with personalized guidance and doubt clearing.
          </motion.p>
        </motion.div>
        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="px-8 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
                Get Started
              </Button>
            </motion.div>
          </Link>
          <Link href="http://127.0.0.1:5500/ai-career-coach/ai.html">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="px-8 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Personal Tutor 
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
