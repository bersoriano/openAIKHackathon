import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Media AI Optimizer | Boost Your Engagement",
  description: "AI-powered tool to optimize your social media content for maximum engagement. Get expert insights and improve your posts instantly.",
  keywords: ["social media", "AI", "content optimization", "engagement", "marketing"],
  authors: [{ name: "Social Media AI" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#9333ea",
  openGraph: {
    title: "Social Media AI Optimizer",
    description: "Optimize your social media content with AI-powered insights",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
