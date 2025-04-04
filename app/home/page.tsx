"use client";

import HomeBox from "@/components/home-box";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HeartButton from "@/components/HeartButton";

type Quote = {
  id: number;
  content: string;
  emotionTag: string;
};

export default function HomePage() {
  const { data: session } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quote/recommend");
      const data = await res.json();
      if (res.ok) {
        setQuotes(data.quotes);
        setQuoteIndex(0); // 처음 인덱스부터
      }
    } catch (err) {
      console.error("명언 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const currentQuote = quotes[quoteIndex];

  return (
    <div className="mt-4 flex flex-col items-center w-full">
      <Image src="/healiary.png" alt="로고" width={100} height={100} />
      <p className="text-sm text-gray-600">
        {session?.user.nickname}님, 오늘도 내일도 항상 응원합니다.
      </p>

      <div className="w-full">
        {/* 오늘의 한 마디 */}
        <HomeBox
          title="오늘의 한 마디"
          onArrowClick={nextQuote}
          rightElement={
            currentQuote && <HeartButton quoteId={currentQuote.id} />
          }>
          <div className="flex items-center justify-between">
            <p className="text-[13px] transition-opacity duration-300 ease-in-out">
              {currentQuote?.content ?? "명언을 불러오는 중..."}
            </p>
          </div>
        </HomeBox>

        {/* 마지막 감정 색상 */}
        <HomeBox title="마지막 감정 색상">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400" />
            <span className="text-[13px]">포근하고 따뜻했던 하루</span>
          </div>
        </HomeBox>

        {/* 감정 요약 */}
        <HomeBox title="감정 요약 (최근 7일)">
          <div className="text-sm flex gap-3">
            <span>😁 3회</span>
            <span>😐 2회</span>
            <span>🥲 1회</span>
          </div>
        </HomeBox>

        {/* 최근 일기 */}
        <HomeBox title="최근 일기">
          <div className="text-sm text-gray-600">
            비 오는 날, 우산을 깜빡했다 …{" "}
            <span className="underline text-[#ce9090] cursor-pointer">
              [더보기]
            </span>
          </div>
        </HomeBox>
      </div>
    </div>
  );
}
