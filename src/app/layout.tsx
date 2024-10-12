import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "빵빠레",
  description: "친구, 연인, 가족을 축하해주세요!",
  icons: {
    icon: "/favicon.ico",
  },
};

const uiyeun = localFont({
  src: "./fonts/Uiyeun.ttf",
  variable: "--font-uiyeun",
});

const pretendard = localFont({
  src: "./fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
});

const lotteria = localFont({
  src: "./fonts/LOTTERIACHAB.woff2",
  variable: "--font-lotteria",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${uiyeun.variable} 
        ${pretendard.variable} 
        ${lotteria.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
