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
    // {
    //   question: "How long does it take to complete?",
    //   answer:
    //     "We harness the power of social media platforms to expand your reach, engage your audience, and drive brand awareness towards your business' profitable future.",
    // },
    // {
    //   question: "What is the cost of your services?",
    //   answer:
    //     "Our pricing varies depending on the scope of the project. We offer customized quotes to fit your specific needs and budget.",
    // },
    // {
    //   question: "How do I get started with Twelve?",
    //   answer:
    //     "Getting started is easy! Simply contact us through our website to schedule a free consultation. We'll discuss your project and provide a detailed proposal.",
    // },
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
                FREQUENTLY{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  ASKED{" "}
                </span>
              </h1>
            </div>
            <h1 className="text-2xl md:text-[80px] font-bold md:font-semibold leading-tight">
              QUESTIONS BY CLIENTS
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
