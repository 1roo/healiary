"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Diary } from "@/app/home/page";
import {
  getHueColorName,
  getToneDescription,
} from "@/utils/generateMoodDescription";
import { ChevronLeft } from "lucide-react";

const formatKoreanDate = (isoDate: Date) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = days[date.getDay()];

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 (${weekday}) ${hours}:${minutes}${ampm}`;
};

const DiaryPage = () => {
  const { id } = useParams();
  const router = useRouter();

  console.log("다이어리페이지의 아이디!!!::", id);

  const [diary, setDiary] = useState<Diary | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/diary/${id}`)
        .then((res) => {
          console.log("Response status:", res.status); // 응답 상태 코드 확인
          return res.json();
        })
        .then((data) => {
          console.log("Received data:", data); // 데이터 확인
          setDiary(data.diary);
        })
        .catch((err) => {
          console.error("Error fetching diary:", err);
        });
    }
  }, [id]);

  if (!diary) return <div>Loading...</div>;

  return (
    <div>
      <ChevronLeft
        size={25}
        strokeWidth={1.5}
        onClick={() => router.push("/home")}
        className="mt-5 ml-3 text-gray-400 cursor-pointer transition-transform duration-150 hover:text-gray-600 hover:scale-110"
      />

      <div className="mt-5 px-5">
        <div
          className={
            "w-full h-10 bg-slate-100 font-light text-sm px-4 py-2 my-1 border rounded-lg  "
          }>
          생성일시: {formatKoreanDate(diary.createdAt)}
        </div>
        <div
          className={
            "flex items-center w-full h-10 bg-slate-100 font-light text-sm px-4 py-2 my-1 border rounded-lg "
          }>
          감정색상:
          <div
            className="ml-2 w-3 h-3 rounded-full"
            style={{ backgroundColor: diary.moodColor || "#ccc" }}
          />
          <p className="text-sm ml-1 text-gray-600">
            {getToneDescription(diary.moodSaturation, diary.moodLightness)}
            {getHueColorName(diary.moodHue)} 빛
          </p>
        </div>
        <div
          className={
            "mt-5 mb-3 w-full h-10 bg-slate-50 px-4 py-2 my-1 border rounded-lg"
          }>
          {diary.title}
        </div>
        <div className="relative w-full">
          <textarea
            className="w-full h-64 p-4 bg-slate-50 border rounded-lg resize-none "
            value={diary.content}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
