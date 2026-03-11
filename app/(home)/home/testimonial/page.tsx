"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/app/(home)/home/testimonial/_components/TestimonialCard";
import { images } from "@/images/images";

const Testimonial = () => {
  const { logo1, jaylead, logo2, logo3, logo4, logo5, logo6 } = images();
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
      name: "Adetunji",
      company: "Jaylead",
      quote:
        "Twelve's team delivered exceptional work on our project management course, handling the full production pipeline, from scripting to final video, across 90+ videos. Truly above and beyond.",
      image: jaylead,
    },
    {
      id: 2,
      name: "Davis Eban",
      company: "Founder EduGene",
      quote:
        "I came for better videos. I got a complete repositioning. Twelve didn't just help me film. They helped me understand what I was actually trying to say and who I needed to become.",
      image: logo5,
    },
    {
      id: 3,
      name: "Tolu Fanibuyan Sr.",
      company: "Founder MedXTech",
      quote:
        "Before Twelve, I was making content. After, I'm shaping conversations. They refused to let me talk features and made me articulate the paradigm shift my organization represents.",
      image: logo2,
    },
    {
      id: 4,
      name: "Olusegun Ajakaiye.",
      company: "Founder FutureBoard Africa.",
      quote:
        "Twelve asked 'What do you want people to believe after watching this?' That question changed everything.",
      image: logo4,
    },
    {
      id: 5,
      name: "Olusoji Busayo",
      company: "Founder Jaffbay Digital",
      quote:
        "I’ve worked with Twelve for years and she has consistently delivered excellent work across all kinds of content. From scripts, blog posts to web copy to long-form articles and more. What I appreciate most is her reliability. She meets deadlines, communicates clearly, and always makes the process easy.",
      image: logo6,
    },
    {
      id: 6,
      name: "Fidel Abojei",
      company: "Co-founde OneQ",
      quote:
        "We highly recommend Twelve for her outstanding work with us at OneQ Digital. Her exceptional skills, dedication, and professionalism made her valuable to the team. Her work was always engaging, informative, and tailored to our audience. A true asset to any team.",
      image: logo1,
    },
    {
      id: 6,
      name: "Aolat Akanni",
      company: "CEO Prosperity Edge Consulting",
      quote:
        "I had a personal brand. Twelve helped me build thought leadership. They forced me to stop talking about myself and start codifying the ideas that should define my space.",
      image: logo3,
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

      <div className="w-full overflow-hidden flex flex-col">
        <div className="mt-10 md:mt-32 w-full flex">
          {/* Video Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video bg-black overflow-hidden group"
          >
            {/* Video Placeholder */}
            <video
              className="w-full h-full object-cover"
              poster="https://via.placeholder.com/800x450"
            >
              {/* Add your video source here later */}
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section - Constrained Width */}
        <div className="w-full flex flex-col justify-between items-center mt-10 md:mt-32">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 w-full"
          >
            {/* Stats Grid */}
            <div className="flex flex-col md:flex-row md:justify-between md-gap-0 gap-10">
              {/* Stat 1: Projects */}
              <motion.div className="md:h-[128px] h-auto rounded-lg ">
                <div className="flex items-center gap-2">
                  <span className="text-4xl md:text-[80px] font-semibold text-[#FFF7EB]">
                    <CountUp end={100} duration={2.5} />
                  </span>
                  <span className="text-4xl md:text-[80px] font-semibold text-white">
                    +
                  </span>
                </div>
                <p className="text-sm md:text-[20px] text-[#fff7eb85] mt-3">
                  Successful Projects
                </p>
              </motion.div>

              {/* Stat 2: Satisfaction Rate */}
              <motion.div className="md:h-[128px] h-auto rounded-lg ">
                <div className="flex items-center gap-2">
                  <span className="text-4xl md:text-[80px] font-semibold text-[#FFF7EB]">
                    <CountUp end={95} duration={2.5} />
                  </span>
                  <span className="text-4xl md:text-[80px] font-semibold text-white">
                    %
                  </span>
                </div>
                <p className="text-sm md:text-[20px] text-[#fff7eb85] mt-3">
                  Client Satisfaction Rate
                </p>
              </motion.div>

              {/* Stat 3: Social Media Followers */}
              <motion.div className="md:h-[128px] h-auto rounded-lg ">
                <div className="flex items-center gap-2">
                  <span className="text-4xl md:text-[80px] font-semibold text-[#FFF7EB]">
                    <CountUp end={10} duration={2.5} />
                  </span>
                  <span className="text-4xl md:text-[80px] font-semibold text-white">
                    +
                  </span>
                </div>
                <p className="text-sm md:text-[20px] text-[#fff7eb85] mt-3">
                  Years Combined Experience
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// CountUp Component for animated numbers
const CountUp = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export default Testimonial;
