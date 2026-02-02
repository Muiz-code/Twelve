"use client";

import { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-none backdrop-blur-md px-4 md:px-25 md:py-2.5">
        <div className="mx-auto max-w-7xl ">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[28px] font-bold text-white">
                CRTFY<span className="text-cyan-400">®</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Login Button */}
            <button className="hidden md:block border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-medium text-sm">
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col gap-1.5 relative w-5 h-5 z-50"
            >
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-white transition-all ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900 via-slate-800 to-black z-35 md:hidden transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-screen space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition text-2xl font-semibold"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition font-medium mt-8">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
