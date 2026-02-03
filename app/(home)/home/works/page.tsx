"use client";

import { motion } from "framer-motion";
import React from "react";
import WorkCard from "@/app/(home)/home/works/_components/WorkCard";
import { images } from "@/images/images";

const Work = () => {
  const { travel, greenlife, techconnect } = images();

  const works = [
    {
      id: 1,
      year: "2022",
      title: "TravelExplorer Marketing Campaign",
      description:
        "Our team created captivating content, managed social media platforms, and implemented targeted advertising strategies for TravelExplorer new branding, incorporating mystical and oceanic theme.",
      image: travel,
    },
    {
      id: 2,
      year: "2023",
      title: "GreenLife Mobile Application",
      description:
        "Craftly collaborated with GreenLife, an environmental organization, to develop a mobile app. The app encourages users to adopt sustainable practices in their daily lives.",
      image: greenlife,
    },
    {
      id: 3,
      year: "2021",
      title: "TechConnect Digital Expo Event",
      description:
        "Our team provided comprehensive event planning services, including branding, website design and development, and marketing strategies to the attendance to the digital expo event.",
      image: techconnect,
    },
  ];
  return (
    <div className="min-h-screen w-full pb-12 md:pb-20 px-2 md:px-0">
      <div className="mx-auto pt-3 md:pt-0 w-full flex flex-col gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full items-center justify-between gap-5 h-17.5 "
        >
          <motion.p className="text-lg md:text-base w-auto h-6 font-light text-white leading-tight uppercase">
            Works
          </motion.p>

          <motion.div className="flex-1 h-px bg-[#FFF7EB40]"></motion.div>
        </motion.div>
        <div className="">
          <motion.div
            className="w-full text-[#FFF7EB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-start gap-2 md:gap-4">
              <h1 className="text-[25px] md:text-[80px] font-bold md:font-semibold leading-tight">
                OUR{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  Latest{" "}
                </span>
              </h1>
            </div>
            <h1 className="text-[25px] md:text-[80px] font-bold md:font-semibold leading-tight">
              PROJECTS
            </h1>
          </motion.div>
        </div>

        {/* Work Cards List */}
        <div className="flex flex-col w-full gap-10">
          {works.map((work, index) => (
            <WorkCard
              key={work.id}
              image={work.image}
              year={work.year}
              title={work.title}
              description={work.description}
              delay={index * 0.1}
              onClick={() => console.log(`${work.title} clicked`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
