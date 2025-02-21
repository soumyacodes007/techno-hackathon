'use client';

import { PinContainer } from './ui/pin-container';
import { motion } from 'framer-motion';
import { Brain, BookOpen, LineChart, FileText, Sparkles } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      title: "AI-Powered Career Guidance",
      description: "Get personalized career advice and insights powered by advanced AI technology.",
      icon: <Brain className="h-6 w-6 text-cyan-500" />,
      href: "/guidance"
    },
    {
      title: "Interview Preparation",
      description: "Practice with role-specific questions and get instant feedback to improve your performance.",
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      href: "/interview"
    },
    {
      title: "Industry Insights",
      description: "Stay ahead with real-time industry trends, salary data, and market analysis.",
      icon: <LineChart className="h-6 w-6 text-emerald-500" />,
      href: "/insights"
    },
    {
      title: "Smart Resume Creation",
      description: "Generate ATS-optimized resumes with AI assistance.",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      href: "/resume"
    },
    {
      title: "AI Career Coach",
      description: "Your personal AI-powered career guide available 24/7.",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      href: "/coach"
    }
  ];

  const upperRowCards = features.slice(0, 3);
  const lowerRowCards = features.slice(3)

  const cardStyle = {
    backgroundColor: 'transparent',
  };

  const CardContent = ({ feature }) => (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        {feature.icon}
        <h3 className="text-lg font-semibold text-neutral-100">{feature.title}</h3>
      </div>
      
      <p className="text-sm text-neutral-300 flex-grow">
        {feature.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <p className="text-xs text-neutral-400">Click to explore</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Upper row - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {upperRowCards.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <PinContainer
              title={feature.title}
              href={feature.href}
              className="w-full h-full"
              containerClassName="h-full"
            >
              <CardContent feature={feature} />
            </PinContainer>
          </motion.div>
        ))}
      </div>

      {/* Lower row - 2 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mx-auto max-w-4xl">
        {lowerRowCards.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 3) * 0.1 }}
            className="h-full"
          >
            <PinContainer
              title={feature.title}
              href={feature.href}
              className="w-full h-full"
              containerClassName="h-full"
            >
              <CardContent feature={feature} />
            </PinContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
