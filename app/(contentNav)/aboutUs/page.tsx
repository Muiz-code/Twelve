"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/images/images";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";
import Counter from "@/app/(contentNav)/_components/Counter";
import ValuePage from "./value/page";
import Milestones from "./milestones/page";

const AboutUs = () => {
  const { aboutBg, arrow, AboutUsImg1, AboutUsImg2 } = images();

  return (
    <div className="bg-[#0a1419] h-full w-full">
      {/* Hero section */}
      <div
        style={{
          backgroundImage: `url(${
            typeof aboutBg === "string" ? aboutBg : aboutBg.src
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ContentHero
          breadcrumb={{ home: "Home", current: "About" }}
          mainHeading="ABOUT"
          headingLine2Highlight="OUR"
          headingLine2End="COMPANY"
          backgroundImage={aboutBg}
          sectionNumber="01"
          sectionLabel="ABOUT"
        />{" "}
      </div>

      <div className="min-h-screen w-full bg-[#0a1419] px-3 md:px-25 pt-0 md:pt-21 flex flex-col gap-5 md:gap-30">
        <div>
          {/* About Us Section */}
          <div className="flex flex-col md:pl-[80px]">
            <motion.div
              className=" text-[#FFF7EB] md:w-[693px] w-full md:mt-0 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-[35px] md:text-[80px] font-bold md:font-semibold leading-tight">
                A GLIMPSE <br />
                <span>OF</span>{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  OUR{" "}
                </span>
                ORIGIN
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex md:flex-row flex-col w-full mt-10 md:mt-20 gap-5 md:gap-10"
            >
              <motion.p className="h-[40px] md:mr-[209px] mr-0 text-[#4AA8C4] text-[16px] border border-[#4AA8C4] rounded-full p-[8px_32px] cursor-pointer">
                2023
              </motion.p>
              <motion.p className="text-[12px] font-light md:text-[20px] text-white md:w-[692px] w-full md:mr-[106px] mr-0">
                At Twelve, we are{" "}
                <span className="text-[#4AA8C4]">
                  a creative digital marketing agency
                </span>{" "}
                that specializes in crafting captivating brand experiences. With
                our passion for innovation and expertise in the digital realm,
                we help businesses like yours reach new heights. Our team of
                talented strategists, designers, and developers is dedicated to
                delivering exceptional results that exceed expectations.
              </motion.p>
              <motion.div
                animate={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="flex items-end hidden md:flex"
              >
                <Image
                  src={arrow}
                  alt={""}
                  className={`md:w-[48px] w-[24px] md:h-[60px] transition-colors duration-300 text-[#4AA8C4]`}
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex gap-[60px] mt-[64px] w-full  md:w-[1160px]"
            >
              <div className="relative w-[274px] h-[322px] hidden md:block">
                <Image
                  src={AboutUsImg1}
                  className="w-full h-full rounded-[40px_0px_0px_0px]"
                  alt={""}
                />
                <div className="bg-black/40 absolute top-0 left-0 w-full h-full rounded-[40px_0px_0px_0px]" />
              </div>
              <Image
                src={AboutUsImg2}
                className="md:w-[846px] w-full md:h-[420px] h-auto"
                alt={""}
              />
            </motion.div>
          </div>
          {/* Statistics Section */}

          <div className="flex md:flex-row flex-col gap-8 md:gap-12 justify-between mx-auto w-full items-center mb-10 md:mb-0 md:mt-20 mt-5">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#FFF7EB] mb-2">
                <Counter targetNumber={2800} isSuffix="+" duration={2000} />
              </h2>
              <p className="text-gray-400 text-[12px] md:text-lg">
                Successful Projects
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#FFF7EB] mb-2">
                <Counter targetNumber={95} isSuffix="%" duration={2000} />
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Client Satisfaction Rate
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#FFF7EB] mb-2">
                <Counter targetNumber={20000} isSuffix="+" duration={2000} />
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Active Social Media Followers
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <ValuePage />
        </div>
        {/* Milestones Section */}
        <div>
          <Milestones />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
