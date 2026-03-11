import React from "react";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import SectionIndicator from "./SectionIndicator";

interface ContentHeroProps {
  breadcrumb: {
    home: string;
    current: string;
  };
  mainHeading: string;
  headingLine2?: string;
  headingLine2Highlight?: string;
  headingLine2End?: string;
  backgroundImage: string | StaticImageData;
  sectionNumber: string;
  sectionLabel?: string;
}

export default function ContentHero({
  breadcrumb,
  mainHeading,
  headingLine2Highlight,
  headingLine2End,
  backgroundImage,
  sectionNumber,
  sectionLabel,
}: ContentHeroProps) {
  return (
    <section
      className="relative w-full md:h-screen h-[50vh] flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${
          typeof backgroundImage === "string"
            ? backgroundImage
            : backgroundImage.src
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:px-[100px_64px] px-5 w-full md:h-full h-auto flex flex-col justify-center">
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-full flex flex-col gap-10 md:gap-23.5">
          <div>
            {/* Breadcrumb */}
            <div className="text-sm text-cyan-400 mb-5 md:mb-2 tracking-wider">
              {breadcrumb.home} / {breadcrumb.current}
            </div>
            <motion.div
              className="w-245.5 text-[#FFF7EB] flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-[40px] md:text-[120px] font-semibold leading-tight">
                {mainHeading} <br />
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  {headingLine2Highlight}
                </span>{" "}
                {headingLine2End}
              </h1>
            </motion.div>
          </div>

          {/* Section Indicator */}
          <SectionIndicator
            sectionNumber={sectionNumber}
            sectionLabel={sectionLabel}
          />
        </div>
      </div>
    </section>
  );
}
