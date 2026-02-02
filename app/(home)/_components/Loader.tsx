"use client";

import { motion } from "framer-motion";

export default function Loader() {
  const text = "CRTFY";
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const symbolVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
        delay: 0.5,
      },
    },
  };

  const orbVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a1419] via-[#0d1e2d] to-[#0a1419] z-50">
      {/* Animated background orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={orbVariants}
        animate="animate"
      >
        <div className="absolute top-20 left-20 w-40 h-40 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Animated text */}
        <motion.div
          className="flex items-center justify-center gap-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className="text-6xl md:text-7xl font-black text-white"
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}

          {/* Animated symbol */}
          <motion.span
            className="text-4xl md:text-5xl text-cyan-400 font-black ml-1"
            variants={symbolVariants}
          >
            ®
          </motion.span>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          className="flex gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 1,
              },
            },
          }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring" as const,
                    stiffness: 100,
                  },
                },
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  delay: dot * 0.1,
                },
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
