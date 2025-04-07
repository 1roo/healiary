"use client";

import HomeBox from "@/components/home-box";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/calendar.css";
import { toKSTDateString } from "@/utils/formatKoreanDate";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type DiarySummary = {
  id: number;
  date: string; // 'YYYY-MM-DD'
  moodColor: string; // ex) '#ffcccc'
};

export default function Myage() {
  const [diarySummaries, setDiarySummaries] = useState<DiarySummary[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const calendarToggleButton = (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="flex items-center justify-center gap-1 px-2 py-1 text-sm rounded bg-[#CE9090] text-white hover:opacity-90 transition">
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  return (
    <div>
      <div className="sticky top-0 z-20 bg-gray-50 text-gray-500 font-bold text-center py-3 shadow-sm">
        마이페이지
      </div>
      <HomeBox
        className="mt-4"
        title="일기 달력"
        rightElement={calendarToggleButton}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              <Calendar
                onClickDay={handleDateClick}
                tileContent={tileContent}
                formatDay={(_, date) => String(date.getDate())}
                locale="ko-KR"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </HomeBox>
    </div>
  );
}
