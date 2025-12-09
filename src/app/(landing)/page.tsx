import "./globals.css";
import type { Metadata } from "next";
import { applicationName } from "@/config";

export const metadata: Metadata = {
  title: applicationName,
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords:
    "next.js, starter kit, saas, ecommerce, digital products, saas code kit, indie hacking, indie hacker kit, micro saas, entrepreneurship, Code Starter Kit, SaaS Product Launch, Code Documentation Tutorial, Beginner Coding Kit, Start-up SaaS Kit, Coding Guides and Resources, Video Tutorials for Coding, Beginner SaaS Guide, Launch your First SaaS, Step-by-step Coding Kit, SaaS Launch Kit, Software as a Service Starter, Easy Code Launch Kit, Coding Skills for SaaS, Starter Kit for SaaS, Code, Document, Launch, Comprehensive Coding Starter Kit, Master SaaS Product Launch, SaaS Documentation Tutorial, First-Time Coders Kit, SaaS coding course, Initiate SaaS Journey, Seamless SaaS Launch Guide, First SaaS Product Guidance, Bootstrap SaaS Tutorial, Ultimate SaaS Starter Pack, Learning Guide for SaaS, DIY SaaS Kit, Code your SaaS Product, All-in-one Coding Starter Kit",
  description:
    "The code kit to help you quickly setup an online store and sell your digital assets without a middleman skipping off the top of your profits.",
  openGraph: {
    title: applicationName,
    description:
      "I'm building the ultimate next.js starter kit to help you hit the ground runnning on your next saas product.",
    url: "https://wdcstarterkit.com",
    siteName: applicationName,
    type: "website",
    images: [
      {
        url: "https://wdcstarterkit.com/starterkitcard.png",
        secureUrl: "https://wdcstarterkit.com/starterkitcard.png",
        width: 800,
        height: 418,
        alt: "The WDC StarterKit social media card image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
