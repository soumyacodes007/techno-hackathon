'use client';

import { motion } from 'framer-motion';

const AnimatedGridBackground = ({ 
  children,
  className = "",
  gridClassName = "bg-black",
  containerClassName = "",
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      {/* Grid Background */}
      <div className={`absolute inset-0 ${gridClassName}`}>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 0.15, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl"
          />
        </div>

        {/* Grid overlay with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedGridBackground;
