import { Barlow } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";

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
