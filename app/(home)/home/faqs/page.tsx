"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import FaqItem from "./_components/FaqItem";

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How Do I Know Twelve's Solutions are for Me?",
      answer: [
        "You’re posting, but it’s not leading to growth, trust, or leads.",
        "Your videos feel generic or not like you at all.",
        "You’re exhausted trying to keep up with",
        "You’re exhausted trying to keep up with content that doesn’t move the needle",
        "You know video works but you don’t want to waste time guessing how.",
      ],
    },
    {
      question: "How Do I Know Twelve's Solutions are for Me?",
      answer: [
        "You’re posting, but it’s not leading to growth, trust, or leads.",
        "Your videos feel generic or not like you at all.",
        "You’re exhausted trying to keep up with",
        "You’re exhausted trying to keep up with content that doesn’t move the needle",
        "You know video works but you don’t want to waste time guessing how.",
      ],
    },
    {
      question: "What Type of Videos does Twelve: The Videohouse Create?",
      answer: [
        "We don’t just “create video.",
        "We help you figure out what to say, how to say it, and where it will work best.",
        "We build:",
        "1. We don’t just “create video.",
        "2. We help you figure out what to say, how to say it, and where it will work best.",
        "3. We build:",
      ],
    },
    {
      question: "Why Should I Work with Twelve: The Videohouse?",
      answer: [
        "It's simple. We'll push you from:",
        "- Lack of control and authenticity to more aligned visibility",
        "- Frustration to more clients / growth",
        "- Being the insecure brand to looking professional online",
        "- Incessant burnout to having enough time to onboard new clients",
        "- Doubting yourself to showing up confidently",
        "- Chaos to an highly effective, seamless content system",
      ],
    },
    {
      question: "Who can work with Twelve?",
      answer: [
        "We value time - yours and ours. That’s why we’re selective about who we work with. Come work with us if:",
        "- Have a proven service, program, or offer",
        "- Understand that brand + video are growth tools, not just marketing fluff",
        "- Are done trying to figure it out alone",
        "- Want a done-for-you system that makes you look and sound like the leader they are",
        "- Crave clarity over content clutter and conversions over empty views",
        "- Care about showing up with video that looks, feels, and performs like a premium brand",
      ],
    },
  ];

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-auto w-full pb-10 md:pb-30 px-2 sm:px-6 md:px-0">
      <div className="mx-auto pt-6 md:pt-10  w-full flex flex-col gap-2 md:gap-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex w-full items-center justify-between gap-5 mb-5 md:mb-12"
        >
          <p className="text-xs sm:text-sm md:text-base font-light text-white uppercase">
            FAQ
          </p>
          <div className="flex-1 h-px bg-[#FFF7EB40]"></div>
        </motion.div>
        <div className="md:pl-[80px] pl-0 flex flex-col gap-3 md:gap-[56px]">
          {/* Title */}
          <motion.div
            className="w-full text-[#FFF7EB]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-2 md:gap-4 w-full md:w-[804px]">
              <h1 className="text-2xl md:text-[80px] font-bold md:font-semibold leading-tight">
                QUESTIONS{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  OTHER{" "}
                </span>
              </h1>
            </div>
            <h1 className="text-2xl md:text-[80px] font-bold md:font-semibold leading-tight">
              CLIENTS ASKED
            </h1>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={
                  <ul>
                    {faq.answer.map((ans, idx) => (
                      <li key={idx}>{ans}</li>
                    ))}
                  </ul>
                }
                isOpen={openIndex === index}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
