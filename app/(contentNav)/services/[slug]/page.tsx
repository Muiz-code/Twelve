"use client";

import { useParams, useRouter } from "next/navigation";
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
  details: { sub: string; sub_d: string }[];
  cta_title: string;
  cta_details: string[];
  price: string;
}

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { brand, digital, social, web, grow } = images();

  const SERVICES: ServiceDetail[] = [
    {
      slug: "script-to-screen",
      title: "SCRIPT-TO-SCREEN",
      description:
        "Done-for-you personal brand video creation We help founders, coaches, and creators turn their ideas into high-impact personal brand videos from a blank page to final edit. ",
      image: brand,
      details: [
        {
          sub: "Creative Strategy Call",
          sub_d:
            "We align on your voice, positioning, audience, and goals. This is where we clarify what you should say and why it matters.",
        },
        {
          sub: "Custom Scripting",
          sub_d:
            "We write bold, expert-led scripts designed to sound like you, not marketing copy. Clear assertions. Strong viewpoints. Thought leadership, not fluff.",
        },
        {
          sub: "Shoot Direction",
          sub_d:
            "You don’t need a studio. We guide you (or your team) on how to film — whether it’s camera, Zoom, podcast footage, or existing. clips — so every take looks intentional and premium.",
        },
        {
          sub: "Professional Editing",
          sub_d:
            "Our editors turn raw footage into polished, high-performing videos optimized for vertical platforms. Clean pacing. Strategic cuts. Visual clarity.",
        },
        {
          sub: "Video Placement Guide",
          sub_d:
            "We tell you exactly where each video works best — LinkedIn, Instagram, YouTube Shorts, or elsewhere — so you’re not guessing.",
        },
        {
          sub: "Best for:",
          sub_d:
            "Founders, coaches, and creators who want to show up confidently and consistently without doing it all themselves.",
        },
      ],
      cta_title: "WHAT’S INCLUDED",
      cta_details: [
        "12 fully produced personal brand videos per month",
        "End-to-end execution (strategy → script → direction → edit)",
        "Thought-leadership positioning baked into every video",
      ],
      price: "Starting at: $2,000 / month",
    },
    {
      slug: "edit-my-voice",
      title: "EDIT MY VOICE",
      description:
        "Already creating content but don’t have the time (or desire) to edit it? Send us your raw footage or voice recordings. We refine, structure, and package your ideas into binge-worthy videos that reflect your tone, intelligence, and brand.",
      image: digital,
      details: [
        {
          sub: "Content Intake: ",
          sub_d: "You send raw footage, podcasts, Zoom calls, or voice notes",
        },
        {
          sub: "Message Refinement",
          sub_d:
            "We identify the strongest ideas, tighten the delivery, and remove the fluff",
        },
        {
          sub: "Strategic Editing",
          sub_d:
            "Clean edits, strong pacing, and visual structure that keeps attention without cheap tricks.",
        },
        {
          sub: "Brand Consistency",
          sub_d:
            "Every video feels like you — not a template, not AI-churned content.",
        },
        {
          sub: "Best for:",
          sub_d:
            "Creators, podcasters, and thought leaders with ideas — but no time to edit.",
        },
      ],
      cta_title: "WHAT’S INCLUDED",
      cta_details: [
        "Up to 12 edited videos per month",
        "Short-form videos optimized for social platforms",
        "Editing that preserves your voice and authority",
      ],
      price: "Starting at: $1,000 / month",
    },
    {
      slug: "signature-video-package",
      title: "SIGNATURE VIDEO PACKAGE",
      description:
        "Need a powerful anchor video or a full visual reset? This one-time package is designed to clarify your narrative and elevate your presence with intention — not noise.",
      image: social,
      details: [
        {
          sub: "Signature Story Video",
          sub_d:
            "A storytelling-led video that captures your mission, worldview, and authority.",
        },
        {
          sub: "Complementary Videos",
          sub_d:
            "Choose from: Testimonials, Behind-the-scenes, Mission or manifesto reels. Each piece supports the core story and strengthens your positioning.",
        },
        { sub: "", sub_d: "" },
      ],
      cta_title: "WHO IT’S FOR",
      cta_details: [
        "Brands or leaders preparing for: A product or course launch",
        "Brands or leaders preparing for: A new offer",
        "Brands or leaders preparing for: A personal brand relaunch",
      ],
      price: "Investment: $2,500–$3,000 (one-time)",
    },
    {
      slug: "video-course-creation",
      title: "VIDEO COURSE CREATION",
      description:
        "Turn your expertise into a structured, high-quality digital product. We help you design, script, film, and produce a complete online course that reflects your authority and teaches with clarity.",
      image: web,
      details: [
        {
          sub: "Clarity & Curriculum Architecture",
          sub_d:
            "Define transformation, Structure modules, Refine learning outcomes, Script creation",
        },
        {
          sub: "Production Design",
          sub_d:
            "Studio setup planning, Visual identity, Teaching format design (talking head, slides, practical demo, hybrid)",
        },
        {
          sub: "Filming",
          sub_d:
            "Professional video capture, Audio optimization, Multi-angle if needed",
        },
        {
          sub: "Post-Production",
          sub_d:
            "Editing, Graphics & animations, Visual reinforcement, Sound design",
        },
        {
          sub: "Launch & Delivery Support",
          sub_d:
            "File formatting, Platform guidance, Trailer cuts, Promo clips",
        },
      ],
      cta_title: "",
      cta_details: [""],
      price:
        " Pricing is customized based on scope, scale, and production complexity.",
    },
  ];

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a1419] flex flex-col items-center justify-center gap-6">
        <p className="text-[#FFF7EB] text-2xl">Service not found.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#4AA8C4] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>
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
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#4AA8C4] text-sm mb-6 hover:underline w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>
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
            HOW IT WORKS
          </h2>
          <ul className="flex flex-col gap-4">
            {service.details.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className=" border-t border-[#2a3a40] pt-4 text-[#FFF7EB] text-base md:text-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-[#4AA8C4] shrink-0" />
                  {item.sub}
                </div>
                <p className="text-[#999] pl-10 md:text-xs">{item.sub_d}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA & words*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-[#FFF7EB] text-xl md:text-2xl font-semibold mb-8 mt-16">
            {service.cta_title}
          </h2>
          <ul className="flex flex-col gap-4">
            {service.cta_details.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 border-t border-[#2a3a40] pt-2 text-[#FFF7EB] text-base"
              >
                <span className="w-2 h-2 rounded-full bg-[#4AA8C4] shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <h1 className="text-[#FFF7EB] text-xl md:text-2xl font-semibold mb-8 mt-16">
            {service.price}
          </h1>
        </motion.div>

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
            Schedule your first call
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
