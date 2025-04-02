"use client";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { useSession } from "next-auth/react";

export default function DiaryWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const maxLength = 800;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setContent(e.target.value);
    }
  };

  const handleSave = () => {
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 모달 띄우기 or API 호출 예정
    console.log({ title, content });
  };

  const { data: session } = useSession();
  console.log(session?.user.nickname);

  return (
    <div className="p-6 space-y-4">
      <p className="text-gray-500 -mb-4 text-center">
        안녕하세요 {session?.user.nickname}님!
      </p>
      <p className=" text-gray-500 text-center">
        오늘 {session?.user.nickname}님의 하루는 어땠나요?
      </p>
      <Input
        placeholder="제목 (선택)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative w-full">
        <textarea
          className="w-full h-64 p-4 bg-slate-50 border rounded-lg resize-none focus:outline-none"
          placeholder="오늘 어떤 하루였나요?"
          value={content}
          onChange={handleContentChange}
        />
        <div className="absolute bottom-2 right-4 text-xs text-gray-500">
          {content.length}/{maxLength}
        </div>
      </div>

      <Button onClick={handleSave}>저장</Button>
    </div>
  );
}
