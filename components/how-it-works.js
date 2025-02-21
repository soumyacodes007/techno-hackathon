'use client';

import { motion } from 'framer-motion';
import { UserCircle2, FileText, Users, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserCircle2 className="w-8 h-8" />,
      title: "Professional Onboarding",
      description: "Share your industry and expertise for personalized guidance",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Craft Your Documents",
      description: "Create ATS-optimized resumes and compelling cover letters",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Prepare for Interviews",
      description: "Practice with AI-powered mock interviews tailored to your role",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor improvements with detailed performance analytics",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-black/80 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-4 text-gray-400">
            Four simple steps to accelerate your career growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative p-6 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <div className="text-blue-400">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute top-4 right-4 text-2xl font-bold text-neutral-800">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
