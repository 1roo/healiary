import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata: Metadata = {
  title: "Healiary",
  description: "AI 감정 기반 힐링 일기장",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="flex items-center justify-center min-h-screen bg-neutral-100">
        <div className="relative w-[430px] h-[932px] bg-background border border-gray-300 rounded-[33px] overflow-hidden shadow-xl flex flex-col">
          <main className="flex-grow overflow-y-auto">{children}</main>
          <NavbarWrapper />
        </div>
      </body>
    </html>
  );
}
