import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Navbar from "@/components/Navbar";
import {NotificationProvider, AuthProvider} from "@/components/Providers";
import MobileNav from "@/components/MobileNav";

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kamishop",
    description: "Perfume E-shop Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={roboto.className || geistSans.className || geistMono.className}>
            <NotificationProvider />
            <AuthProvider>
                <Navbar/>
                <MobileNav/>
                {children}
            </AuthProvider>
        </body>
      </html>
  );
}
