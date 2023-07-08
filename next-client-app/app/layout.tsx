import "./globals.css";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Navbar from "@/app/components/Navbar";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WikiRocket! App",
  description: "Sample Client Side App from Dave Gray",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${interTight.className} bg-slate-800`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
