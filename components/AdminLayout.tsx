"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const NAV = [
  { label: "All Posts", href: "/admin" },
  { label: "New Post", href: "/admin/posts/new" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 bg-gray-900 text-white flex flex-col z-40 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-6 py-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              Twelve
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">Blog Admin</p>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-400 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 text-white sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-1 w-5"
          >
            <span className="w-full h-0.5 bg-white" />
            <span className="w-full h-0.5 bg-white" />
            <span className="w-full h-0.5 bg-white" />
          </button>
          <span className="font-bold text-sm tracking-tight">Twelve Admin</span>
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
