"use client";

import { motion } from "framer-motion";
import React from "react";
import ServiceCard from "@/app/(home)/home/services/_components/ServiceCard";
import { images } from "@/images/images";

const ServicesPage = () => {
  const { photo1, matrix, brand, digital, social, web } = images();

  const services = [
    {
      id: 1,
      title: "Branding and Identity",
      description: "Create stunning, responsive websites",
      image: brand,
    },
    {
      id: 2,
      title: "Branding and Identity",
      description: "Build a strong brand identity",
      image: digital,
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Drive traffic and increase brand awareness",
      image: social,
    },
    {
      id: 4,
      title: "Consulting",
      description: "Expert guidance for your business",
      image: web,
    },
  ];

  return (
    <div className="min-h-screen w-full pb-12 md:pb-20 px-2 md:px-0">
      <div className="mx-auto pt-3 md:pt-10 w-full flex flex-col gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full items-center justify-between gap-5 h-17.5 "
        >
          <motion.p className="text-lg md:text-base w-auto h-6 font-light text-white leading-tight uppercase">
            Services
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
                  DIGITAL SERVICES{" "}
                </span>
              </h1>
            </div>
            <h1 className="text-[25px] md:text-[80px] font-bold md:font-semibold leading-tight">
              FOR YOUR GROWING BUSINESS
            </h1>
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-8 sm:mt-10 md:mt-12 w-full">
          {services.map((service, index) => (
            <div key={service.id} className="flex justify-between">
              <ServiceCard
                image={service.image}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
                onClick={() => console.log(`${service.title} clicked`)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="">
          <motion.div
            className="w-full text-[#FFF7EB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-start w-full px-0 md:px-[40px] py-8 md:py-[120px]">
              <h1 className="text-[27px] md:text-[80px] font-bold md:font-semibold leading-tight">
                &quot;Good design is like a{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  refrigerator{" "}
                </span>
                —when it works, no one{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  notices
                </span>
                , but when it doesn&apos;t, it sure{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  stinks
                </span>
                .&quot;
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
