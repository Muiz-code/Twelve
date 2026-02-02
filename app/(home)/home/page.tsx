"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/app/(home)/_components/Loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { images } from "@/images/images";
import ServicesPage from "./services/page";

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
    <div className="min-h-screen w-full bg-[#0a1419] px-25 pt-21 flex flex-col items-center justify-center gap-[100px]">
      <section className="w-full">
        <div className="mx-auto max-w-7xl pt-10 w-full flex flex-col gap-12.5">
          <div className="mx-auto py-20 w-full flex gap-12.5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="w-55 h-84"
            >
              <Image src={photo1} alt={"Side image in gradients"} />
            </motion.div>
            <div className="flex flex-col items-center text-center gap-8">
              <motion.div
                className="w-full text-[#FFF7EB]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <h1 className="text-[60px]  md:text-[120px] font-semibold  leading-tight">
                    DIGITAL IDEAS
                  </h1>
                  <h5 className="text-[32px] font-medium mt-5">for</h5>
                </div>
                <h1 className="text-[60px] md:text-[120px] font-semibold  leading-tight">
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
                className="w-full text-[#FFF7EB] flex items-center justify-between gap-[32px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div className="w-46 h-px bg-[#FFF7EB40]"></motion.div>

                <motion.p
                  className="text-[#FFF7EB] text-[16px] w-112.5 text-left font-light"
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
                    className="w-70 text-[#14181B] bg-[#FFF7EB] text-[16px] font-bold p-[10px_40px] rounded-[100px] hover:scale-102 hover:bg-none hover:text-white hover:border-2 transition-transform duration-300 cursor-pointer"
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
            className="flex justify-between items-center"
          >
            <Image src={logo1} alt="Logo 1" width={142} height={36} />
            <Image src={logo2} alt="Logo 2" width={142} height={36} />
            <Image src={logo3} alt="Logo 3" width={142} height={36} />
            <Image src={logo4} alt="Logo 4" width={142} height={36} />
            <Image src={logo5} alt="Logo 5" width={142} height={36} />
            <Image src={logo6} alt="Logo 6" width={142} height={36} />
          </motion.div>
        </div>
      </section>

      <section className="w-full">
        <ServicesPage />
      </section>
    </div>
  );
};

export default LandingPage;
