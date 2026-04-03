import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin — Twelve Blog",
};

// This layout intentionally omits the root Navbar/Footer override —
// see app/layout.tsx where admin routes are excluded from those wrappers.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}
