"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Loader from "@/app/_components/Loader";
import Image from "next/image";
import { images } from "@/images/images";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";

interface Project {
  id: number;
  title: string;
  year: number;
  categories: string[];
  image?: string;
  video?: string;
  link?: string;
}

// Span class mapping for Tailwind (explicit classes for JIT)
// Mobile (2 cols) and Desktop (4 cols) responsive classes
const SPAN_CLASSES_MOBILE: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
};

const SPAN_CLASSES_DESKTOP: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

// Function to generate random spans for mobile (2 columns)
const generateMobileSpans = (count: number): number[] => {
  if (count === 0) return [];

  const TOTAL_COLS = 2;

  if (count === 1) return [2]; // Full width

  const spans: number[] = [];
  let remainingCols = Math.ceil(count / TOTAL_COLS) * TOTAL_COLS;
  let remainingCards = count;

  while (remainingCards > 0) {
    let span: number;

    if (remainingCards === 1) {
      span = remainingCols;
    } else {
      const randomValue = Math.random();
      if (randomValue < 0.5) {
        span = 1;
      } else {
        span = Math.min(2, remainingCols);
      }
    }

    // Ensure valid distribution
    const afterThis = remainingCols - span;
    const cardsAfter = remainingCards - 1;
    if (cardsAfter > 0 && afterThis < cardsAfter) {
      span = Math.max(1, remainingCols - cardsAfter);
    }
    if (cardsAfter > 0 && afterThis > cardsAfter * 2) {
      span = Math.min(2, remainingCols - cardsAfter);
    }

    span = Math.max(1, Math.min(span, 2, remainingCols));
    spans.push(span);
    remainingCols -= span;
    remainingCards--;
  }

  return spans.sort(() => Math.random() - 0.5);
};

// Function to generate random spans that fill the grid completely (desktop - 4 cols)
const generateDesktopSpans = (count: number): number[] => {
  if (count === 0) return [];

  const TOTAL_COLS = 4;

  // Special cases for small counts - make them fill the row
  if (count === 1) return [4]; // Full width
  if (count === 2) return [2, 2]; // Two equal halves
  if (count === 3) return [2, 1, 1].sort(() => Math.random() - 0.5); // Fills one row
  if (count === 4) return [1, 1, 1, 1]; // One per column

  // For 5+ cards, we need to fill complete rows
  // Target: fill 2 rows (8 columns) for 6 cards
  const totalCols = Math.ceil(count / TOTAL_COLS) * TOTAL_COLS; // Round up to complete rows

  // Calculate how many columns we need to distribute
  const spans: number[] = [];
  let remainingCols = totalCols;
  let remainingCards = count;

  while (remainingCards > 0) {
    // How many columns should this card take on average?
    const avgSpan = remainingCols / remainingCards;

    let span: number;
    if (remainingCards === 1) {
      // Last card takes all remaining columns
      span = remainingCols;
    } else if (avgSpan >= 2) {
      // Can afford larger spans
      const randomValue = Math.random();
      if (randomValue < 0.3) {
        span = 1;
      } else if (randomValue < 0.6) {
        span = 2;
      } else if (randomValue < 0.85) {
        span = Math.min(3, remainingCols);
      } else {
        span = Math.min(4, remainingCols);
      }
    } else {
      // Need smaller spans to fit all cards
      span = Math.max(1, Math.min(Math.floor(avgSpan), remainingCols));
    }

    // Ensure span doesn't leave impossible remainder
    const afterThis = remainingCols - span;
    const cardsAfter = remainingCards - 1;
    if (cardsAfter > 0 && afterThis < cardsAfter) {
      span = Math.max(1, remainingCols - cardsAfter);
    }
    if (cardsAfter > 0 && afterThis > cardsAfter * 4) {
      span = Math.min(4, remainingCols - cardsAfter);
    }

    span = Math.max(1, Math.min(span, 4, remainingCols));

    spans.push(span);
    remainingCols -= span;
    remainingCards--;
  }

  // Shuffle spans for visual variety
  return spans.sort(() => Math.random() - 0.5);
};

const CATEGORIES = [
  "All Projects",
  "Branding & Identity",
  "Digital Marketing",
  "Social Media Marketing",
  "Web Design & Development",
  "Mobile App Design",
  "Content Marketing",
  "Illustration & Animation",
  "Digital Advertising",
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Mister Fashion Content Creating",
    year: 2023,
    categories: ["Content Marketing"],
    image:
      "https://i.pinimg.com/1200x/d3/76/28/d376284af864b7953b130ec55ac43a79.jpg",
  },
  {
    id: 2,
    title: "Hannah Theater Website Redesign",
    year: 2020,
    categories: ["Web Design & Development"],
    image:
      "https://i.pinimg.com/736x/d2/36/1b/d2361bf7fe9a98b200e7d20483141140.jpg",
  },
  {
    id: 3,
    title: "E-Commerce Emporium Rebranding",
    year: 2021,
    categories: [
      "Web Design & Development",
      "E-Commerce Integration",
      "Branding & Identity",
    ],
    image:
      "https://i.pinimg.com/736x/24/a2/96/24a2962fd3d1616e32aca34e56ad7446.jpg",
  },
  {
    id: 4,
    title: "Tech Startup Branding",
    year: 2022,
    categories: ["Branding & Identity"],
    image:
      "https://i.pinimg.com/736x/7e/5a/73/7e5a73ffe1f019b8e7d4ce1d81dde615.jpg",
  },
  {
    id: 5,
    title: "Social Media Campaign",
    year: 2023,
    categories: ["Social Media Marketing", "Digital Marketing"],
    image:
      "https://i.pinimg.com/1200x/b1/d4/af/b1d4afc25af73d1fbbd442d2118f1ba7.jpg",
  },
  {
    id: 6,
    title: "Mobile Banking App",
    year: 2023,
    categories: ["Mobile App Design"],
    image:
      "https://i.pinimg.com/736x/00/46/ee/0046ee5a91dfead32ef55974c2eefd77.jpg",
  },
  {
    id: 7,
    title: "Animation Studio Portfolio",
    year: 2021,
    categories: ["Illustration & Animation"],
    image:
      "https://i.pinimg.com/1200x/ec/4d/4a/ec4d4a31d6989bceab24ebc253dbcc23.jpg",
  },
];

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projectPage, setProjectPage] = useState(0);
  const { projectBg, grow } = images();

  // Pagination settings for projects
  const PROJECTS_PER_PAGE = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    activeCategory === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((project) =>
          project.categories.includes(activeCategory),
        );

  // Pagination for projects
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    projectPage * PROJECTS_PER_PAGE,
    (projectPage + 1) * PROJECTS_PER_PAGE,
  );

  const scrollToProjects = () => {
    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid) {
      projectsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextPage = () => {
    setProjectPage((prev) => (prev + 1) % totalPages);
    scrollToProjects();
  };

  const prevPage = () => {
    setProjectPage((prev) => (prev - 1 + totalPages) % totalPages);
    scrollToProjects();
  };

  const goToPage = (page: number) => {
    setProjectPage(page);
    scrollToProjects();
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setProjectPage(0);
  };

  // Generate random spans for paginated projects (mobile and desktop)
  const { mobileSpans, desktopSpans } = useMemo(() => {
    return {
      mobileSpans: generateMobileSpans(paginatedProjects.length),
      desktopSpans: generateDesktopSpans(paginatedProjects.length),
    };
  }, [paginatedProjects.length]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#0a1419]">
      <div
        style={{
          backgroundImage: `url(${
            typeof projectBg === "string" ? projectBg : projectBg.src
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ContentHero
          breadcrumb={{ home: "Home", current: "Projects" }}
          mainHeading="PROJECTS"
          headingLine2Highlight="WE"
          headingLine2End="HAVE DONE"
          backgroundImage={projectBg}
          sectionNumber="01"
          sectionLabel="PROJECTS"
        />
      </div>

      {/* Projects Section */}
      <div className="min-h-screen w-full bg-[#0a1419] px-3 md:px-25 py-20 md:py-30">
        {/* Categories Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#FFF7EB] text-2xl md:text-3xl font-medium mb-8">
            Categories
          </h2>

          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-4">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 md:px-5 py-2 rounded-full text-xs md:text-base font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white text-[#0a1419]"
                    : "border border-[#4AA8C4] text-[#4AA8C4] hover:border-white hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#4AA8C4] to-transparent mb-16"></div>

        {/* Projects Grid - Masonry Layout */}
        <motion.div
          id="projects-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[250px] md:auto-rows-[400px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {paginatedProjects.map((project, index) => {
            const mobileSpanClass =
              SPAN_CLASSES_MOBILE[mobileSpans[index]] || "col-span-1";
            const desktopSpanClass =
              SPAN_CLASSES_DESKTOP[desktopSpans[index]] || "lg:col-span-1";

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-lg overflow-hidden group cursor-pointer h-full ${mobileSpanClass} ${desktopSpanClass}`}
              >
                {/* Conditional: Image, Video, or Not Available */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : project.video ? (
                  <video
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    autoPlay
                    muted
                    loop
                  >
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
                    <p className="text-[#999] text-lg font-medium">
                      Media Not Available
                    </p>
                  </div>
                )}

                {/* Black Overlay - Always Visible */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300"></div>

                {/* Overlay - Enhanced on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1419] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Arrow Icon - Top Right (Hover only) */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h10v10M7 17L17 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Project Info - Bottom (Always visible) */}
                  <div className="flex flex-col gap-3">
                    {/* Year - Hover only */}
                    <p className="text-[#4AA8C4] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.year}
                    </p>

                    {/* Title - Always visible */}
                    <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Categories - Hover only */}
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="text-[#FFF7EB] text-xs bg-[#4AA8C4]/20 px-3 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="flex items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[#999] text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
        {/* Pagination Controls - Top */}
        {totalPages > 1 && (
          <motion.div
            className="mt-15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              {/* Left Arrow */}
              <motion.button
                onClick={prevPage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center text-[#4AA8C4] hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => goToPage(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-lg font-medium transition-colors ${
                      projectPage === i
                        ? "text-[#4AA8C4]"
                        : "text-[#666] hover:text-white"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.button>
                ))}
              </div>

              {/* Right Arrow */}
              <motion.button
                onClick={nextPage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center text-[#4AA8C4] hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Progress Bar */}
            {/* <div className="h-[2px] bg-[#1a2a30] relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#4AA8C4]"
                initial={{ width: 0 }}
                animate={{
                  width: `${((projectPage + 1) / totalPages) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div> */}
          </motion.div>
        )}
        {/* CTA Section - Ready to Grow Your Business */}
        <motion.div
          className="mt-20 md:mt-30 relative rounded-[50px] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Image */}
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={grow}
              alt="Ready to Grow Your Business"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.h2
                className="text-white text-2xl md:text-[48px] font-meduim mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to Grow Your Business?
              </motion.h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFF7EB] text-[#0a1419] px-8 py-3 rounded-full text-sm md:text-base font-medium hover:bg-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Book A Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
