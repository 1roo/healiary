"use client";

import HomeBox from "@/components/home-box";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HeartButton from "@/components/HeartButton";
import { generateMoodDescription } from "@/utils/generateMoodDescription";

type Quote = {
  id: number;
  content: string;
  emotionTag: string;
};
type Diary = {
  moodColor: string;
  interpretedMood: string;
  moodHue: number;
  moodSaturation: number;
  moodLightness: number;
};

export default function HomePage() {
  const { data: session } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const [latestDiary, setLatestDiary] = useState<Diary | null>(null);

  const fetchLatestDiary = async () => {
    try {
      const res = await fetch("/api/diary/latest");
      const data = await res.json();
      if (res.ok) {
        setLatestDiary(data.diary);
      }
    } catch (err) {
      console.error("마지막 일기 불러오기 실패", err);
    }
  };

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
    fetchLatestDiary();
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
          rightElement={<HeartButton quoteId={currentQuote?.id} />}>
          <p>{currentQuote?.content}</p>
        </HomeBox>

        {/* 마지막 감정 색상 */}
        <HomeBox
          customHeader={
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>마지막 감정 색상</span>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: latestDiary?.moodColor || "#ccc" }}
                />
                <span className="text-[13px]">
                  {latestDiary?.interpretedMood}
                </span>
              </div>
            </div>
          }>
          {latestDiary ? (
            <p className="text-sm text-gray-600">
              {generateMoodDescription({
                hue: latestDiary.moodHue,
                saturation: latestDiary.moodSaturation,
                lightness: latestDiary.moodLightness,
                interpretedMood: latestDiary.interpretedMood,
              })}
            </p>
          ) : (
            <p className="text-sm text-gray-500">일기를 작성해 주세요!</p>
          )}
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
