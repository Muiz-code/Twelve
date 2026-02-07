"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/app/_components/Loader";
import Image, { StaticImageData } from "next/image";
import { images } from "@/images/images";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";
import SectionIndicator from "@/app/(contentNav)/_components/SectionIndicator";
import FaqItem from "@/app/(home)/home/faqs/_components/FaqItem";

interface Service {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState<number | null>(1);
  const { servicesBg, brand, digital, social, web, grow } = images();

  const SERVICES: Service[] = [
    {
      id: 1,
      title: "Branding & Identity",
      description:
        "We create distinctive brand identities that capture your essence and resonate with your target audience, building lasting connections through strategic design.",
      image: brand,
    },
    {
      id: 2,
      title: "Digital Marketing",
      description:
        "We develop customized digital marketing strategies that align with your business goals, ensuring maximum impact and ROI that suits your business needs and brand identity for the targeted market audience.",
      image: digital,
    },
    {
      id: 3,
      title: "Social Media Marketing",
      description:
        "We craft engaging social media campaigns that build community, drive engagement, and convert followers into loyal customers across all major platforms.",
      image: social,
    },
    {
      id: 4,
      title: "Content Marketing",
      description:
        "We create compelling content strategies that tell your brand story, attract your ideal audience, and establish your authority in your industry.",
      image: grow,
    },
    {
      id: 5,
      title: "Web Design Development",
      description:
        "We design and develop stunning, responsive websites that provide seamless user experiences and drive conversions for your business.",
      image: web,
    },
    {
      id: 6,
      title: "Mobile App Design Development",
      description:
        "We create intuitive mobile applications with beautiful interfaces that engage users and deliver exceptional experiences on iOS and Android.",
      image: web,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#0a1419]">
      <div
        style={{
          backgroundImage: `url(${
            typeof servicesBg === "string" ? servicesBg : servicesBg.src
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ContentHero
          breadcrumb={{ home: "Home", current: "Services" }}
          mainHeading="SERVICES"
          headingLine2Highlight="WE"
          headingLine2End="PROVIDE"
          backgroundImage={servicesBg}
          sectionNumber="01"
          sectionLabel="SERVICES"
        />
      </div>

      {/* Services List Section */}
      <div className="min-h-auto w-full bg-[#0a1419] px-4 md:px-25 py-10 md:py-30">
        <div className="max-w-7xl mx-auto relative space-y-5">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportEnter={() => setActiveService(service.id)}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="relative"
            >
              {/* Service Item */}
              <div
                className="border-t border-[#2a3a40] cursor-pointer min-h-[10px]"
                onMouseEnter={() => setActiveService(service.id)}
              >
                <div className="py-8">
                  <div className="flex items-start justify-between gap-6">
                    {/* Left Side - Title and Description */}
                    <div className="flex-1 md:max-w-[60%]">
                      <motion.h3
                        className={`text-xl md:text-3xl font-medium transition-colors duration-300 ${
                          activeService === service.id
                            ? "text-[#4AA8C4]"
                            : "text-[#FFF7EB]"
                        }`}
                      >
                        {service.title}
                      </motion.h3>

                      {/* Description - Only visible when active */}
                      <AnimatePresence>
                        {activeService === service.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-[#999] text-sm md:text-base mt-4 md:max-w-md leading-relaxed"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors duration-300 ${
                        activeService === service.id
                          ? "text-[#4AA8C4]"
                          : "text-[#FFF7EB]"
                      }`}
                      animate={{
                        rotate: activeService === service.id ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6"
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
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Image - Positioned absolutely to the right, overlapping */}
              <AnimatePresence>
                {activeService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:block absolute right-0 top-0 w-[252px] h-[300px] -mt-16 z-10"
                    style={{ transform: "translateY(-20%)" }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={292}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Last item bottom border */}
              {index === SERVICES.length - 1 && (
                <div className="border-t border-[#2a3a40]"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

// Process Section Component
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number>(3);

  const PROCESS_STEPS = [
    {
      id: 1,
      number: "01",
      title: "Discovery & Research",
      description:
        "We conduct research to gather insights, analyze competitions, and identify trends.",
    },
    {
      id: 2,
      number: "02",
      title: "Ideation & Concept",
      description:
        "We brainstorm ideas and explore different concepts that align with the project goals.",
    },
    {
      id: 3,
      number: "03",
      title: "Design & Development",
      description:
        "We transform the chosen concept into tangible designs, sketches, wireframes, and/or prototypes.",
    },
    {
      id: 4,
      number: "04",
      title: "Finalization & Delivery",
      description:
        "We prepare the final deliverables, ensuring they are polished and ready for implementation within timeline.",
    },
  ];

  return (
    <div className="min-h-auto w-full bg-[#0a1419] px-4 md:px-25 py-10 md:py-30">
      {/* Section Header */}
      <SectionIndicator sectionNumber="02" sectionLabel="PROCESS" />

      {/* Title */}

      <motion.div
        className="w-full text-[#FFF7EB] text-center py-15"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:justify-start justify-center gap-2 md:gap-4 w-full">
          <h1 className="text-4xl md:text-[80px] font-bold md:font-semibold leading-tight">
            HOW{" "}
            <span
              style={{
                WebkitTextStroke: "2px white",
                color: "transparent",
              }}
            >
              WE RUN{" "}
            </span>
          </h1>
          <h1 className="text-4xl md:text-[80px] font-bold md:font-semibold leading-tight">
            OUR WORK
          </h1>
        </div>
      </motion.div>

      {/* Process Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {PROCESS_STEPS.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="cursor-pointer"
            onMouseEnter={() => setActiveStep(step.id)}
          >
            {/* Large Number */}
            <motion.span
              className={`text-6xl md:text-7xl lg:text-8xl text-center font-bold block mb-4 transition-colors duration-300 ${
                activeStep === step.id ? "text-[#4AA8C4]" : "text-[#1a2a30]"
              }`}
              style={{
                WebkitTextStroke:
                  activeStep === step.id ? "none" : "1px #2a3a40",
              }}
            >
              {step.number}
            </motion.span>

            {/* Title */}
            <h3
              className={`text-sm md:text-base text-center font-semibold mb-2 transition-colors duration-300 ${
                activeStep === step.id ? "text-[#FFF7EB]" : "text-[#FFF7EB]"
              }`}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-[#666] text-xs md:text-sm text-center leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// FAQ Section Component
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does Twelve provide?",
      answer:
        "We provide a wide range of services including web design, web development, branding, social media marketing, and SEO.",
    },
    {
      question: "How long does it take to complete?",
      answer:
        "We harness the power of social media platforms to expand your reach, engage your audience, and drive brand awareness towards your business' profitable future.",
    },
    {
      question: "What is the cost of your services?",
      answer:
        "Our pricing varies depending on the scope of the project. We offer customized quotes to fit your specific needs and budget.",
    },
    {
      question: "How do I get started with Twelve?",
      answer:
        "Getting started is easy! Simply contact us through our website to schedule a free consultation. We'll discuss your project and provide a detailed proposal.",
    },
  ];

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-auto w-full bg-[#0a1419] px-4 md:px-25 py-10 md:py-10">
      {/* Section Header */}
      <SectionIndicator sectionNumber="03" sectionLabel="FAQ" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 mb-10 md:mb-20 flex flex-col md:justify-start justify-center gap-2 md:gap-7 w-full"
      >
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-[#FFF7EB]">
          FREQUENTLY{" "}
          <span
            style={{
              WebkitTextStroke: "2px #FFF7EB",
              color: "transparent",
            }}
          >
            ASKED
          </span>
        </h2>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-[#FFF7EB]">
          QUESTIONS BY CLIENTS
        </h2>
      </motion.div>

      {/* FAQ List */}
      <div className="w-full flex flex-col gap-6 md:gap-10">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
