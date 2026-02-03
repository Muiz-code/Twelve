"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/app/(home)/home/testimonial/_components/TestimonialCard";
import { images } from "@/images/images";

const Testimonial = () => {
  const { photo1 } = images();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jane Smith",
      company: "Emporium & Co.",
      quote:
        "Craftly's team went above and beyond to deliver a website that perfectly represents our brand. Their attention to detail and creative vision truly impressed us as business owners who need branding.",
      image: photo1,
    },
    {
      id: 2,
      name: "Mark Johnson",
      company: "GreenLife.org",
      quote:
        "The results we achieved through Craftly's digital marketing strategies were outstanding. They helped us reach a wider audience and dramatically increase conversions within our targeted timeline.",
      image: photo1,
    },
    {
      id: 3,
      name: "Sarah Williams",
      company: "TechVision Inc.",
      quote:
        "Working with Craftly was a game-changer for our brand. Their strategic approach and innovative solutions elevated our digital presence to new heights.",
      image: photo1,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  return (
    <div className="min-h-screen w-full pb-12 md:pb-20 px-4 sm:px-6 md:px-0">
      <div className="mx-auto pt-6 md:pt-10 w-full flex flex-col gap-4 md:gap-6 max-w-7xl">
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
        <motion.div
          className="w-full text-[#FFF7EB]"
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

        {/* Testimonials Carousel */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-8">
            {/* Testimonial Cards Slider */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex gap-6 md:gap-8"
                animate={{ x: -currentIndex * (100 + 24) + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    company={testimonial.company}
                    quote={testimonial.quote}
                    image={testimonial.image}
                    delay={index * 0.1}
                  />
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4 ml-6 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[#4AA8C4] flex items-center justify-center text-[#4AA8C4] hover:bg-[#4AA8C4]/10 transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[#4AA8C4] flex items-center justify-center text-[#4AA8C4] hover:bg-[#4AA8C4]/10 transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
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
