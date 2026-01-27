import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { applicationName, siteDescription, siteUrl } from "@/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: applicationName,
    template: `%s | ${applicationName}`,
  },
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
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          barlow.variable,
        )}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
