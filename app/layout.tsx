import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyInquiry from "@/components/sticky-inquiry";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "NÜMA Açaí | Boutique Event Catering",
    template: "%s | NÜMA Açaí"
  },
  description:
    "Premium on-site açaí pop-up catering for weddings, showers, corporate events, wellness gatherings, and curated brand activations.",
  metadataBase: new URL("https://numa-acai-site.vercel.app")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Header />
        <main className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <StickyInquiry />
      </body>
    </html>
  );
}
