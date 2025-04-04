import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata = {
  title: "AI 감정 분석 기반 힐링 다이어리",
  description:
    "오늘 하루의 감정을 분석하고 위로가 되는 문장을 추천해주는 일기 서비스입니다.",
  openGraph: {
    title: "AI 감정 다이어리",
    description: "감정을 색으로 표현하고, 힐링 문장을 추천받아보세요.",
    url: "http://localhost:3000", // 프로토콜 포함!
    siteName: "Healing Diary",
    images: [
      {
        url: "http://localhost:3000/metaImage.png", // 또는 배포 후엔 https://yourdomain.com/metaImage.png
        width: 1200,
        height: 630,
        alt: "AI 감정 기반 힐링 다이어리 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 감정 다이어리",
    description: "감정을 색으로 표현하고, 힐링 문장을 추천받아보세요.",
    images: ["http://localhost:3000/metaImage.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="flex items-center justify-center min-h-screen bg-neutral-100">
        <div className="relative w-full max-w-xs h-full max-h-[554px] bg-background border border-gray-300 rounded-[33px] overflow-hidden shadow-xl flex flex-col">
          <main className="flex-grow overflow-y-auto scrollbar-hide">
            {children}
          </main>
          <NavbarWrapper />
        </div>
      </body>
    </html>
  );
}
