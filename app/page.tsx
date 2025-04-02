"use client";

import { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      alert("🎉 로그인 성공!");
      router.push("/home");
    } else {
      alert("❌ 로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden">
      <div className="relative w-[430px] h-[430px] mt-20 ">
        <Image
          src="/sky.png"
          alt="배너 이미지"
          fill
          className="object-cover opacity-65"
        />
        <Image
          src="/healiary.png"
          alt="로고"
          width={200}
          height={200}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="w-2/3 mt-8 flex flex-col items-center justify-center ">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="mt-2"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button className="mt-5" onClick={handleLogin}>
          로그인
        </Button>
        <p className="my-8">OR</p>
        <Button
          className="w-full"
          onClick={() => router.push("/create-account")}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
