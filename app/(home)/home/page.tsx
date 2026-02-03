"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/app/(home)/_components/Loader";
import { Button } from "@/app/(home)/_components/ui/button";
import Image from "next/image";
import { images } from "@/images/images";
import ServicesPage from "./services/page";
import Work from "./works/page";
import Process from "./process/page";
import Testimonial from "./testimonial/page";
import Faqs from "./faqs/page";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { photo1, logo1, logo2, logo3, logo4, logo5, logo6 } = images();

  useEffect(() => {
    // Simulate page load - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0a1419] px-3 md:px-25 pt-0 md:pt-21 flex flex-col items-center justify-center gap-5 md:gap-20 lg:gap-25">
      <section className="w-full">
        <div className="mx-auto pt-20 md:pt-10 w-full flex flex-col gap-12.5">
          <div className="mx-auto py-4 pt-30 md:py-20 w-full h-[70vh] flex flex-col justify-between md:flex-row gap-6 sm:gap-8 md:gap-12.5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="w-full md:w-55  md:h-84 hidden md:flex"
            >
              <Image
                src={photo1}
                alt={"Side image in gradients"}
                className="hidden md:flex"
              />
            </motion.div>
            <div className="flex flex-col items-center text-start gap-10 md:gap-8">
              <motion.div
                className="w-full text-[#FFF7EB]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <h1 className="text-[40px] md:text-[120px] font-semibold leading-tight">
                    DIGITAL IDEAS
                  </h1>
                  <h5 className="text-sm md:text-[32px] font-medium mt-2 md:mt-5">
                    for
                  </h5>
                </div>
                <h1 className="text-[40px] md:text-[120px] font-semibold leading-tight">
                  THE{" "}
                  <span
                    style={{
                      WebkitTextStroke: "2px white",
                      color: "transparent",
                    }}
                  >
                    REAL
                  </span>{" "}
                  WORLD
                </h1>
              </motion.div>
              <motion.div
                className="w-full text-[#FFF7EB] flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div className="hidden md:block md:w-46 w-10 h-px bg-[#FFF7EB40]"></motion.div>

                <motion.p
                  className="text-[#FFF7EB] text-sm md:text-base text-center md:text-left font-light order-2 md:order-none md:w-[450px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Get innovative and creative to bring your business to the
                  highest profit with our professional team of experts.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <Button
                    className="w-full p-[20px_85px] text-[#14181B] bg-[#FFF7EB] text-sm md:text-base font-bold rounded-[100px] hover:scale-102 hover:bg-none hover:text-white hover:border-2 transition-transform duration-300 cursor-pointer"
                    onClick={() => console.log("Get Started clicked")}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-8 w-full justify-items-center items-center"
          >
            <Image
              src={logo1}
              alt="Logo 1"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
            <Image
              src={logo2}
              alt="Logo 2"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
            <Image
              src={logo3}
              alt="Logo 3"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
            <Image
              src={logo4}
              alt="Logo 4"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
            <Image
              src={logo5}
              alt="Logo 5"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
            <Image
              src={logo6}
              alt="Logo 6"
              width={100}
              height={28}
              className="w-[60px] md:w-[142px]"
            />
          </motion.div>
        </div>
      </section>

      <section className="w-full">
        <ServicesPage />
      </section>
      <section className="w-full">
        <Work />
      </section>
      <section className="w-full">
        <Process />
      </section>
      <section className="w-full">
        <Testimonial />
      </section>
      <section className="text-red-500">missing</section>

      <section className="w-full">
        <Faqs />
      </section>
    </div>
  );
};

export default LandingPage;
