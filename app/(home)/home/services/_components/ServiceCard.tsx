"use client";

import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  /**
   * Background image for the card
   */
  image: StaticImageData | string;

  /**
   * Card title/heading
   */
  title: string;

  /**
   * Card description (optional)
   */
  description?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Animation delay for staggered animations
   */
  delay?: number;

  /**
   * Custom className
   */
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  onClick,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      className={`relative group overflow-hidden cursor-pointer w-full h-56 sm:h-72 md:h-96 hover:rounded-[40px_0px_40px_40px] border-0 transition-all duration-300 ${className}`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark Overlay Base */}
      <div className="absolute inset-0 bg-[#161E22]/50"></div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-[#2A6F85]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Corner Icon */}
      <div className="absolute top-6 right-6 w-10 h-10 border border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all duration-300 group-hover:rotate-45">
        <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-gray-300 text-xs sm:text-sm md:text-base overflow-hidden max-h-0 group-hover:max-h-20 sm:group-hover:max-h-24 transition-all duration-300">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
