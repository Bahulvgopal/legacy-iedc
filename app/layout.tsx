import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer"; // ✅ ADD THIS

export const metadata: Metadata = {
  title: {
    default: "Legacy IEDC | UCK Innovation & Entrepreneurship Cell",
    template: "%s | Legacy IEDC",
  },
  description:
    "Legacy IEDC (Innovation & Entrepreneurship Development Cell) of UCK College. Organizing workshops, tech events, startup programs and innovation initiatives.",
  keywords: [
    "Legacy IEDC",
    "IEDC UCK",
    "Legacy UCK",
    "Innovation Club UCK",
    "Entrepreneurship Cell UCK",
    "Legacy College IEDC",
  ],
  authors: [{ name: "Legacy IEDC UCK" }],
  openGraph: {
    title: "Legacy IEDC - Innovation & Entrepreneurship Cell",
    description:
      "Official website of Legacy IEDC UCK. Explore upcoming events, workshops, and startup programs.",
    url: "https://iedc.uck.ac.in/",
    siteName: "Legacy IEDC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Preloader />
        <Navbar />

        {/* Page Content */}
        <div className="pt-24 flex-grow">
          {children}
        </div>

        {/* ✅ Footer Added Here */}
        <Footer />
      </body>
    </html>
  );
}
