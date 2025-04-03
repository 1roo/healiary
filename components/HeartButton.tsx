"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

type Props = {
  quoteId: number;
};

export default function HeartButton({ quoteId }: Props) {
  const [liked, setLiked] = useState(false);

  const handleClick = async () => {
    if (liked) return;

    try {
      await fetch("/api/favorite-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId }),
      });
      setLiked(true);
    } catch (err) {
      console.error("즐겨찾기 실패:", err);
    }
  };

  return (
    <Heart
      size={18}
      className={`cursor-pointer ${liked ? "text-pink-400" : "text-gray-400"}`}
      onClick={handleClick}
    />
  );
}
