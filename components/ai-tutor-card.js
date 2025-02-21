'use client';

import { PinContainer } from './ui/pin-container';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AiTutorCard = () => {
  const cardStyle = {
    width: '300px',
    height: '400px',
    margin: '15px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <div style={cardStyle} className="relative">
      <PinContainer
        title="AI Career Coach"
        href="/dashboard"
        className="w-full h-full"
        containerClassName="h-full"
      >
        <div className="flex flex-col gap-2 p-6 min-h-[560px]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-500" />
            <h3 className="text-xl font-bold text-neutral-100">AI Career Coach</h3>
          </div>
          
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-lg p-4 mt-4 flex-grow">
            <p className="text-sm text-neutral-300 mb-6">
              Your personal AI-powered career guide
            </p>
            
            <div className="space-y-4">
              <Feature text="Personalized career advice" />
              <Feature text="Interview preparation" />
              <Feature text="Resume optimization" />
              <Feature text="Skill development plans" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs text-neutral-300">AI Assistant Available 24/7</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </PinContainer>
    </div>
  );
};

const Feature = ({ text }) => (
  <div className="flex items-center gap-2">
    <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
    <p className="text-sm text-neutral-300">{text}</p>
  </div>
);

export default AiTutorCard;
