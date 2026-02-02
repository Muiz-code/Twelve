import type { ReactNode } from "react";
import Navbar from "@/app/(home)/_components/Navbar";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
}
