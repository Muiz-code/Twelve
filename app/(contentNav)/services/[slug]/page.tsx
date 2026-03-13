"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { images } from "@/images/images";

interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  image: StaticImageData;
  details: string[];
}

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { brand, digital, social, web, grow } = images();

  const SERVICES: ServiceDetail[] = [
    {
      slug: "script-to-screen",
      title: "SCRIPT-TO-SCREEN",
      description:
        "Done-for-you personal brand video creation We help founders, coaches, and creators turn their ideas into high-impact personal brand videos from a blank page to final edit. ",
      image: brand,
      details: [
        "Concept development and scripting",
        "On-location or remote shooting",
        "Professional editing and post-production",
        "Custom graphics and animations",
        "Final delivery in multiple formats",
      ],
    },
    {
      slug: "edit-my-voice",
      title: "EDIT MY VOICE",
      description:
        "Already creating content but don’t have the time (or desire) to edit it? Send us your raw footage or voice recordings. We refine, structure, and package your ideas into binge-worthy videos that reflect your tone, intelligence, and brand.",
      image: digital,
      details: [
        "Raw footage and audio analysis",
        "Narrative structuring and storytelling",
        "Color correction and grading",
        "Sound design and mixing",
        "Adding intros, outros, and call-to-actions",
      ],
    },
    {
      slug: "signature-video-package",
      title: "SIGNATURE VIDEO PACKAGE",
      description:
        "Your brand story, done right. We'll provide you with a powerful anchor video or full visual reset.",
      image: social,
      details: [
        "In-depth brand discovery session",
        "Development of a signature visual style",
        "Creation of a cornerstone brand video",
        "Full visual reset for your online presence",
        "A suite of supporting video assets",
      ],
    },
  ];

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a1419] flex flex-col items-center justify-center gap-6">
        <p className="text-[#FFF7EB] text-2xl">Service not found.</p>
        <Link
          href="/services"
          className="flex items-center gap-2 text-[#4AA8C4] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1419]">
      {/* Hero */}
      <div className="relative w-full md:h-[60vh] h-[40vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1419]/70" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 md:pl-[100px] md:pr-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/services"
              className="flex items-center gap-2 text-[#4AA8C4] text-sm mb-6 hover:underline w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <p className="text-sm text-[#4AA8C4] uppercase tracking-widest mb-2">
              Home / Services / {service.title}
            </p>
            <h1 className="text-[40px] md:text-[80px] font-semibold text-[#FFF7EB] leading-tight">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:pl-[100px] md:pr-16 py-16 md:py-24 max-w-5xl">
        <motion.p
          className="text-[#999] text-base md:text-xl leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-[#FFF7EB] text-2xl md:text-4xl font-semibold mb-8">
            What We Offer
          </h2>
          <ul className="flex flex-col gap-4">
            {service.details.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 border-t border-[#2a3a40] pt-4 text-[#FFF7EB] text-base md:text-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#4AA8C4] shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link
            href="/contact"
            className="inline-block border-2 border-[#FFF7EB] text-[#FFF7EB] px-10 py-4 rounded-full hover:bg-[#FFF7EB] hover:text-[#0a1419] transition font-medium text-sm"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
