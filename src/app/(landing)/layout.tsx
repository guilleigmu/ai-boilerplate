import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { applicationName, siteDescription } from "@/config";

export const metadata: Metadata = {
  description: siteDescription,
  openGraph: {
    title: applicationName,
    description: siteDescription,
    siteName: applicationName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: applicationName,
    description: siteDescription,
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
