'use client';
import { easeInOut, motion } from "framer-motion";

const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const textArray = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between characters
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, easeInOut } },
  };

  return (
    <motion.div
      className="flex space-x-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
