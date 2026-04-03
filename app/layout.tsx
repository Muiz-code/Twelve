import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./_components/ScrollToTop";
import ConditionalShell from "./_components/ConditionalShell";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Twelve - Creative Digital Marketing Agency",
  description:
    "Twelve is a creative digital marketing agency specializing in branding, web design, development, and marketing strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ScrollToTop />
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
