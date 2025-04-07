"use client";

import HomeBox from "@/components/home-box";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/calendar.css";
import { toKSTDateString } from "@/utils/formatKoreanDate";

type DiarySummary = {
  id: number;
  date: string; // 'YYYY-MM-DD'
  moodColor: string; // ex) '#ffcccc'
};

export default function Myage() {
  const [diarySummaries, setDiarySummaries] = useState<DiarySummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/diaries/summary");
        if (!res.ok) throw new Error("Failed to fetch diary summaries");
        const data = await res.json();
        setDiarySummaries(data);
      } catch (error) {
        console.error("Error fetching diary data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (value: Date) => {
    const dateStr = toKSTDateString(value);
    const matchedDiary = diarySummaries.find((entry) => entry.date === dateStr);
    if (matchedDiary) {
      console.log("넘기기전아이디뭐냐!!", matchedDiary.id);

      router.push(`/diary/${matchedDiary.id}`);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateStr = toKSTDateString(date);
    const matchedDiary = diarySummaries.find((entry) => entry.date === dateStr);

    if (matchedDiary) {
      return (
        <div
          style={{
            backgroundColor: matchedDiary.moodColor,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <HomeBox title="일기 달력">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
          locale="ko-KR"
        />
      </HomeBox>
    </div>
  );
}
