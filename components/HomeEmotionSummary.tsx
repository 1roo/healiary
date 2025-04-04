"use client";

import { summarizeSimpleMoods } from "@/lib/summarizeSimpleMoods";
import HomeBox from "./home-box";

const moodEmojiMap = {
  good: "😁",
  normal: "😐",
  sad: "🥲",
};

const moodMessageMap = {
  good: "이번 주는 기분 좋은 날이 많았어요 😊",
  normal: "이번 주는 평온한 일상이었네요 😌",
  sad: "이번 주는 감정적으로 조금 힘들었을지도 몰라요 🫂",
};

type DiaryEntry = {
  color: string; // hex color string
};

export default function HomeEmotionSummary({
  entries,
}: {
  entries: DiaryEntry[];
}) {
  const moodSummary = summarizeSimpleMoods(entries);

  const dominantMood = (
    Object.entries(moodSummary) as [keyof typeof moodSummary, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <HomeBox title="감정 요약 (최근 7일)">
      <div className="text-sm flex gap-3 mb-2">
        {(["good", "normal", "sad"] as const).map((key) => (
          <span key={key}>
            {moodEmojiMap[key]} {moodSummary[key]}회
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        {moodMessageMap[dominantMood]}
      </div>
    </HomeBox>
  );
}
