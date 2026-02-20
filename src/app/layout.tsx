import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spline-sans",
});

export const metadata: Metadata = {
  title: "The Advisor",
  description: "Navigate new parenthood with AI advisors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${splineSans.variable} font-display bg-night-bg text-gray-200 antialiased overflow-x-hidden`}
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
