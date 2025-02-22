'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';

const FAQCard = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
            {question}
          </h3>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-400"
          >
            ↓
          </motion.span>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="mt-4 text-neutral-400 leading-relaxed">
            {answer}
          </p>
        </motion.div>
      </button>
    </motion.div>
  );
};

const AnimatedFAQ = ({ faqs }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-neutral-950" />
      
      <div
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            Find answers to common questions about our AI-powered career coaching platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Simple gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950 pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 pointer-events-none opacity-60" />
    </section>
  );
};

export default AnimatedFAQ;
