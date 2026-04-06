import type { Metadata } from "next";
import ToasterProvider from "./_components/ToasterProvider";

export const metadata: Metadata = {
  title: "Admin — Twelve Blog",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToasterProvider />
      {children}
    </>
  );
}
