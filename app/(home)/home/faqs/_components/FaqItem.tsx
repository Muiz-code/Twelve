"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { images } from "@/images/images";

const { arrow } = images();

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-[#FFF7EB40] py-6">
      <motion.div
        className="flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <h3
          className={`text-md md:text-[32px] font-medium transition-colors duration-300 ${
            isOpen ? "text-[#4AA8C4]" : "text-white"
          }`}
        >
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 135 : 45 }}
          transition={{ duration: 0.3 }}
          className=""
        >
          <Image
            src={arrow}
            alt={""}
            className={`md:w-6 w-3 h-auto transition-colors duration-300 ${
              isOpen ? "text-[#4AA8C4]" : "text-white"
            }`}
          />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: "16px",
            }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-gray-300 text-[12px] md:text-base"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
