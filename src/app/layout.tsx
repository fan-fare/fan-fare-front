import { Metadata } from "next";

export const metadata: Metadata = {
  title: '빵빠레',
  description: '친구, 연인, 가족을 축하해주세요!',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}