"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/app/_components/Loader";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { images } from "@/images/images";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";
import MapSection from "./_components/MapSection";

interface FormData {
  fullName: string;
  email: string;
  comment: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  comment?: string;
}

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    comment: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const { contactBg } = images();

  useEffect(() => {
    // Simulate page load - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate Comment
    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ fullName: "", email: "", comment: "" });
        setTimeout(() => setSubmitMessage(""), 5000);
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#0a1419] h-full w-full">
      <div
        style={{
          backgroundImage: `url(${
            typeof contactBg === "string" ? contactBg : contactBg.src
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ContentHero
          breadcrumb={{ home: "Home", current: "Contact" }}
          mainHeading="LET’S KEEP"
          headingLine2Highlight="IN"
          headingLine2End="TOUCH"
          backgroundImage={contactBg}
          sectionNumber="04"
          sectionLabel="CONTACT FORM"
        />
      </div>
      <div className=" w-full bg-[#0a1419] px-3 md:px-25 pt-0 md:pt-21 flex flex-col gap-5 md:gap-30">
        <motion.div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
          <motion.div
            className="text-[#FFF7EB] md:w-[280px] w-full md:mt-0 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.h1 className="text-[#FFF7EB] text-[48px] font-medium">
              Send Us
            </motion.h1>
            <motion.span className="text-[#FFF7EB] text-[48px] font-medium">
              A Message
            </motion.span>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 w-full md:w-[840px] md:h-[450px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Full Name and Email - Side by Side on Desktop */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Full Name Field */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#4AA8C4] text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name ..."
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="p-3 bg-none text-[#FFF7EB] border-b border-[#333] focus:border-[#4AA8C4] focus:outline-none transition"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#4AA8C4] text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address ..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-3 bg-none text-[#FFF7EB] border-b border-[#333] focus:border-[#4AA8C4] focus:outline-none transition"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Comment Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#4AA8C4] text-sm font-medium">
                Comment
              </label>
              <textarea
                name="comment"
                placeholder="Enter your comment ..."
                value={formData.comment}
                onChange={handleInputChange}
                rows={6}
                className="p-3 bg-none text-[#FFF7EB] border-b border-[#333] focus:border-[#4AA8C4] focus:outline-none transition resize-none"
              />
              {errors.comment && (
                <span className="text-red-500 text-xs">{errors.comment}</span>
              )}
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm p-3 rounded-md text-center ${
                  submitMessage.includes("successfully")
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {submitMessage}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center pt-4">
              {/* Consent Text */}
              <p className="text-[#999] text-xs md:text-normal text-center">
                By filling this form, I hereby consent to be sent a monthly
                newsletter from Craftify.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-white text-[#0a1419] rounded-full font-medium hover:bg-[#FFF7EB] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* Map Section */}
      <MapSection />
      {/* Contact Information Section */}
      <div className="w-full bg-[#0a1419] px-3 md:px-25 py-20 md:py-15">
        <motion.div
          className="flex flex-col md:flex-row items-start md:justify-between md:items-center gap-10 md:gap-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Phone */}
          <motion.div
            className="flex flex-col gap-3 w-auto md:w-[245px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[#999] text-sm uppercase tracking-wider">
              Phone
            </p>
            <h3 className="text-[#FFF7EB] text-2xl md:text-3xl font-medium">
              +123-456-7890
            </h3>
          </motion.div>

          {/* Email Address */}
          <motion.div
            className="flex items-center gap-10 w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-[#4AA8C4] rounded-full hidden md:flex"></div>
            <div className="flex flex-col gap-3">
              <p className="text-[#999] text-sm uppercase tracking-wider">
                Email Address
              </p>
              <h3 className="text-[#FFF7EB] text-2xl md:text-[30px] font-medium break-all">
                hello@cratifystudio.com
              </h3>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="flex items-center gap-10 w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-[#4AA8C4] rounded-full hidden md:flex"></div>
            <div className="flex flex-col gap-3">
              <p className="text-[#999] text-sm uppercase tracking-wider">
                Location
              </p>
              <h3 className="text-[#FFF7EB] text-2xl md:text-[30px] font-medium">
                123 Street, New Zealand
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
