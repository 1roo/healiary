"use client";

import HomeBox from "@/components/home-box";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session?.user.nickname);

  return (
    <div className="mt-10 flex flex-col items-center w-full">
      <Image src="/healiary.png" alt="로고" width={130} height={200} />
      <p className="my-4 text-sm text-gray-600">
        <span className="font-semibold"></span>
        {session?.user.nickname}님, 오늘도 내일도 항상 응원합니다.
      </p>

      <div className="w-full">
        {/* 오늘의 한 마디 */}
        <HomeBox title="오늘의 한 마디">
          <div className="flex items-center justify-between">
            <p className="text-[13px]">너 자신을 믿어. 오늘도 충분히 빛나!</p>
            <Heart size={18} className="text-gray-400" />
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
