"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartButtonProps {
  quoteId: number;
}

export default function HeartButton({ quoteId }: HeartButtonProps) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 초기 상태 확인
  useEffect(() => {
    const checkLiked = async () => {
      try {
        const res = await fetch(`/api/favorite?quoteId=${quoteId}`);
        const data = await res.json();
        setLiked(data.liked);
      } catch (err) {
        console.error("좋아요 여부 확인 실패", err);
      }
    };
    checkLiked();
  }, [quoteId]);

  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/favorite", {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId }),
      });

      if (res.ok) {
        setLiked(!liked);
      } else {
        const data = await res.json();
        console.error(data.error || "오류");
      }
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggleFavorite} disabled={loading}>
      <Heart
        size={18}
        className={`cursor-pointer transition-all duration-150 ${
          liked
            ? "fill-red-500 stroke-red-500"
            : "stroke-red-500 hover:fill-red-200"
        }`}
      />
    </button>
  );
}
