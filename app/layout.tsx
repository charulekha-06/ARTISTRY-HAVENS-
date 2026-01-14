import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artistry Havens",
  description: "An AI-enhanced marketplace connecting artisans with the world.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zooming for app-like feel
  themeColor: "#FFFFFF",
};

import { SplashScreen } from "@/components/splash-screen";

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
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
          {/* Mobile Frame */}
          <div className="relative w-full max-w-[390px] h-[100dvh] max-h-[844px] flex flex-col bg-background shadow-2xl overflow-hidden sm:rounded-[2rem] sm:border-[8px] sm:border-zinc-800">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
              {children}
            </div>
            {/* Mobile Nav - positioned absolute or fixed within relative container might be tricky, but flex-col makes it easier if it's just at bottom */}
            <MobileNav />
          </div>
        </div>
      </body>
    </html>
  );
}
