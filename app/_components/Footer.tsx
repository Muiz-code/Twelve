"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#0a1419] text-white pb-8 px-4 md:px-25">
      <div className="container mx-auto flex flex-col gap-7 md:gap-[56px]">
        <motion.div
          className="md:w-[1240px] w-full md:h-[240px] text-[#FFF7EB] md:mb-0 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-start gap-2 md:gap-4">
            <h1 className="text-4xl md:text-[120px] font-bold md:font-semibold leading-tight">
              TAKE{" "}
              <span
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                YOUR BRAND{" "}
              </span>
            </h1>
          </div>
          <h1 className="text-4xl md:text-[120px] font-bold md:font-semibold leading-tight">
            TO NEXT LEVEL
          </h1>
        </motion.div>
        <div className="flex md:h-87.5 w-full flex-col md:flex-row justify-between gap-15 md:gap-0">
          {/* Newsletter Section */}
          <div className="relative flex flex-col w-full md:w-121.5 gap-14 justify-between ">
            <motion.div>
              <h1
                style={{
                  WebkitTextStroke: "2px #4AA8C4",
                  color: "transparent",
                }}
                className="absolute md:top-0 top-[-30%] md:left-[-21%] left-[-5%] text-[70px] md:text-[124.49px] font-bold md:font-semibold leading-tight opacity-25"
              >
                TWELVE<span className="">®</span>
              </h1>
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-[32px] font-medium mb-6">
                Subscribe to Our <br />
                <span className="text-cyan-400">Monthly</span> Newsletter
              </h2>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address..."
                  className="bg-transparent border-0 border-b-2 pb-[12px] border-gray-600 rounded-lg text-white placeholder:text-gray-500 outline-0 transition-colors"
                />
                <Button
                  variant="link"
                  className="text-cyan-400 hover:text-cyan-300 p-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:w-163.5 md:gap-12 md:mb-12  md:mt-10">
            {/* Company Section */}
            <div className="col-span-1">
              <h3 className="font-bold text-base mb-4">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <Link
                    href="/aboutUs"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="/projects"
                    className="hover:text-white transition-colors"
                  >
                    Projects Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Work with Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="col-span-1">
              <h3 className="font-bold text-base mb-4">Services</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Script-to-Screen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Edit My Voice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Signature Video Package
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-development"
                    className="hover:text-white transition-colors"
                  >
                    Video Course Creation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-1">
              <h3 className="font-bold text-base mb-4"> Work with Us</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                {/* <li className="hover:text-white transition-colors cursor-pointer">
                  Phone Number
                </li> */}
                <li className="hover:text-white transition-colors cursor-pointer">
                  twelve@twelvevideos.com
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Social Media
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
