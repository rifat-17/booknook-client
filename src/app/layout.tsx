
import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "BookNook",
    template: "BookNook | %s",
  },
  description:
    "Discover, explore, and borrow your favorite books with BookNook.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Toaster position="top-right" richColors />
        <Footer/>
      </body>
    </html>
  );
}
