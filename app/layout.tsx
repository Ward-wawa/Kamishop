import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Navbar from "@/components/Navbar";
import {NotificationProvider, AuthProvider} from "@/components/Providers";
import MobileNav from "@/components/MobileNav";
import { preload } from "react-dom";

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

const ImageToPreload =
    [
        '/icons/creed.webp' ,
        '/icons/sauv.webp' ,
        '/icons/lacoste.webp' ,
        '/icons/mdior.webp' ,
        '/icons/amou.webp' ,
        '/icons/bronze.webp' ,
        '/icons/diorh.webp' ,
        '/icons/si.webp' ,
        '/icons/212.webp' ,
        '/icons/mix.webp' ,
        '/icons/theone.webp' ,
        '/icons/gg.webp' ,
        '/icons/male.webp' ,
        '/icons/jadore.webp' ,
        '/icons/dp.webp' ,
        '/icons/valen.webp' ,
        '/icons/angel.webp' ,
        '/icons/poison.webp' ,
        '/icons/creedv.webp' ,
        '/icons/stronger.webp' ,
        '/icons/boss.webp',
        '/icons/one.webp'
    ]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    ImageToPreload.forEach(src => {
        preload(src,{as: 'image'});
    })
  return (
      <html lang="en">
        <body className={roboto.className || geistSans.className || geistMono.className}>
            <NotificationProvider />
            <AuthProvider>
                <Navbar/>
                <video className="absolute opacity-5" width="10" autoPlay loop muted>
                    <source src="/video/per.webm" type="video/webm"/>
                    Your browser does not support the video tag.
                </video>
                <MobileNav/>
                {children}
            </AuthProvider>
        </body>
      </html>
  );
}
