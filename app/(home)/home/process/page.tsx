/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/images/images";
import ProcessItemWithView from "./_components/ProcessItemWithView";

const Process = () => {
  const { process } = images();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const processSteps = [
    {
      number: 1,
      title: "Book Your Free Clarity Call",
      description:
        "We’ll talk through your goals, your brand voice, and the kind of personal branding videos you need. No pressure. Just clarity.",
    },
    {
      number: 2,
      title: "We Script, Shoot, or Edit - You Just Show Up",
      description:
        "Depending on your package, we’ll handle everything from scripting to coaching, editing to repurposing. We guide you through it or do it all for you.",
    },
    {
      number: 3,
      title: "You Launch Content That Lands",
      description:
        "We deliver scroll-stopping personal brand videos you’re proud to post because they feel like you and connect with the people who need to hear you.",
    },
    // {
    //   number: 4,
    //   title: "Finalization & Delivery",
    //   description:
    //     "We fine-tune and prepare the final deliverables, ensuring they are polished and ready for implementation within our agreed timeline.",
    // },
  ];

  // Use hover if set, otherwise use active (from scroll)
  const displayedStep = hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <div className="min-h-screen w-full pb-5 md:pb-0 px-2 md:px-0">
      <div className="mx-auto pt-6 md:pt-10 w-full flex flex-col gap-4 md:gap-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full items-center justify-between gap-5 h-17.5"
        >
          <motion.p className="text-xs sm:text-sm md:text-base w-auto h-6 font-light text-white leading-tight uppercase">
            Process
          </motion.p>

          <motion.div className="flex-1 h-px bg-[#FFF7EB40]"></motion.div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between">
          {/* Left Column - Heading and Steps */}
          <div className="w-full md:w-1/2">
            <motion.div
              className="w-full text-[#FFF7EB] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-2 md:gap-4">
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold md:font-semibold leading-tight">
                  WORKING <br />
                  <span
                    style={{
                      WebkitTextStroke: "2px white",
                      color: "transparent",
                    }}
                  >
                    WITH US{" "}
                  </span>
                </h1>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold md:font-semibold leading-tight">
                IS SIMPLE
              </h1>
            </motion.div>

            {/* Process Steps List */}
            <div className="space-y-0 border-l-2 border-[#FFF7EB40]">
              {processSteps.map((step, index) => (
                <ProcessItemWithView
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  delay={index * 0.1}
                  isActive={displayedStep === step.number}
                  onViewChange={(inView: any) => {
                    if (inView && hoveredStep === null) {
                      setActiveStep(step.number);
                    }
                  }}
                  onHover={(isHovered: any) =>
                    setHoveredStep(isHovered ? step.number : null)
                  }
                />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden md:flex w-135 h-auto md:sticky md:top-20"
          >
            <div className="relative rounded-xl overflow-hidden border-[#FFF7EB]/20">
              <Image
                src={process}
                alt="Process image"
                className="w-135 h-201"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Process;
