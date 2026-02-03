"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/app/(home)/home/testimonial/_components/TestimonialCard";
import { images } from "@/images/images";

const Testimonial = () => {
  const { photo1 } = images();
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Jane",
      company: "Emporium & Co.",
      quote:
        "Craftly's team went above and beyond to deliver a website that perfectly represents our brand. Their attention to detail and creative vision truly impressed us as business owners who need branding.",
      image: photo1,
    },
    {
      id: 2,
      name: "Mark",
      company: "GreenLife.org",
      quote:
        "The results we achieved through Craftly's digital marketing strategies were outstanding. They helped us reach a wider audience and dramatically increase conversions within our targeted timeline.",
      image: photo1,
    },
    {
      id: 3,
      name: "Sarah",
      company: "TechVision Inc.",
      quote:
        "Working with Craftly was a game-changer for our brand. Their strategic approach and innovative solutions elevated our digital presence to new heights.",
      image: photo1,
    },
    {
      id: 4,
      name: "Smith",
      company: "Emporium & Co.",
      quote:
        "Craftly's team went above and beyond to deliver a website that perfectly represents our brand. Their attention to detail and creative vision truly impressed us as business owners who need branding.",
      image: photo1,
    },
    {
      id: 5,
      name: "Johnson",
      company: "GreenLife.org",
      quote:
        "The results we achieved through Craftly's digital marketing strategies were outstanding. They helped us reach a wider audience and dramatically increase conversions within our targeted timeline.",
      image: photo1,
    },
    {
      id: 6,
      name: "Williams",
      company: "TechVision Inc.",
      quote:
        "Working with Craftly was a game-changer for our brand. Their strategic approach and innovative solutions elevated our digital presence to new heights.",
      image: photo1,
    },
  ];

  // Group testimonials for desktop view
  const groupedT = [];
  if (!isMobile) {
    for (let i = 0; i < testimonials.length; i += 2) {
      groupedT.push(testimonials.slice(i, i + 2));
    }
  }

  const maxIndex = isMobile ? testimonials.length : groupedT.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    resetAutoPlay();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    startAutoPlay();
  };

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxIndex);
    }, 5000); // Auto-play every 5 seconds
  };

  // Start auto-play on mount
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full pb-5 md:pb-0 px-2 sm:px-6 md:px-0">
      <div className="mx-auto pt-6 md:pt-10 w-full flex flex-col gap-2 md:gap-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full items-center justify-between gap-5 h-17.5"
        >
          <motion.p className="text-xs sm:text-sm md:text-base w-auto h-6 font-light text-white leading-tight uppercase">
            Testimonials
          </motion.p>

          <motion.div className="flex-1 h-px bg-[#FFF7EB40]"></motion.div>
        </motion.div>

        {/* Heading */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-[645px] w-full text-[#FFF7EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-2 md:gap-4">
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold md:font-semibold leading-tight">
                WHAT{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  THEY SAY{" "}
                </span>
              </h1>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold md:font-semibold leading-tight">
              ABOUT US
            </h1>
          </motion.div>
          <motion.p className="md:w-[500px] w-full text-[12px] md:text-[16px] font-light text-[#fff7eb85]">
            Step into the success stories of our clients through our reviews
            section, where real businesses share their transformative
            experiences, showcasing the tangible digital marketing results.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-0 md:mt-0 px-[0px] relative w-full">
          {/* Top Section with Arrows */}
          <div className="flex items-center justify-end mb-8">
            {/* Navigation Arrows */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center text-[#4AA8C4] hover:bg-[#4AA8C4]/10 transition-colors duration-300"
              >
                <ChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center text-[#4AA8C4] hover:bg-[#4AA8C4]/10 transition-colors duration-300"
              >
                <ChevronRight />
              </motion.button>
            </div>
          </div>

          {/* Testimonial Cards Slider - Responsive */}
          <div className="relative w-full overflow-hidden px-2 md:px-0">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {isMobile
                ? testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <TestimonialCard {...testimonial} />
                    </div>
                  ))
                : groupedT.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="w-full flex-shrink-0 flex gap-6"
                    >
                      {group.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="w-full md:w-[calc(50%-12px)]"
                        >
                          <TestimonialCard {...testimonial} />
                        </div>
                      ))}
                    </div>
                  ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center mt-12">
            {Array.from({ length: maxIndex }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#4AA8C4]"
                    : "w-2 bg-[#4AA8C4]/30 hover:bg-[#4AA8C4]/60"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
