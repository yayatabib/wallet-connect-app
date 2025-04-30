import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata for SEO and browser display
export const metadata: Metadata = {
  title: "Web3 Wallet App",
  description: "A simple and elegant Web3 wallet connection demo that displays your ETH balance",
  authors: [{ name: "Web3 Developer" }],
  keywords: ["Web3", "Wallet", "Ethereum", "dApp", "Blockchain", "React", "Next.js"],
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4f46e5",
};

/**
 * Root layout component that wraps the entire application
 * Provides fonts and base HTML structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
