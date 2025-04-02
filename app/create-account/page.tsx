"use client";

import { useState } from "react";
import FormInput from "@/components/form-input";
import Button from "@/components/button";

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ✅ 실시간 이메일 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!emailRegex.test(value)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  // ✅ 실시간 닉네임 검사
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
    if (!value) {
      setNicknameError("닉네임을 입력해주세요.");
    } else if (!nicknameRegex.test(value)) {
      setNicknameError("닉네임은 3~10자의 한글, 영문, 숫자만 가능합니다.");
    } else {
      setNicknameError("");
    }
  };

  // ✅ 실시간 비밀번호 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,15}$/;
    if (!value) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "비밀번호는 8~15자, 영문/숫자/특수문자를 모두 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }

    // 비밀번호 변경 시, 비밀번호 확인도 다시 확인
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // ✅ 실시간 비밀번호 확인 검사
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password !== value) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // ✅ 최종 제출
  const handleSubmit = async () => {
    if (
      emailError ||
      nicknameError ||
      passwordError ||
      confirmPasswordError ||
      !email ||
      !nickname ||
      !password ||
      !confirmPassword
    ) {
      alert("입력값을 확인해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nickname, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.message}`);
        return;
      }

      alert("🎉 회원가입 성공!");
      // TODO: 로그인 페이지 이동 등
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center gap-10">
      <p className="mt-20 mb-20 font-semibold text-2xl text-[#CE9090]">
        회원가입
      </p>

      <FormInput
        label="이메일"
        name="email"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />

      <FormInput
        label="닉네임"
        name="nickname"
        placeholder="3~10자 (한글/영문/숫자)"
        value={nickname}
        onChange={handleNicknameChange}
        error={nicknameError}
      />

      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="8~15자, 영문+숫자+특수문자 포함"
        value={password}
        onChange={handlePasswordChange}
        error={passwordError}
      />

      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        placeholder="비밀번호 재입력"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={confirmPasswordError}
      />

      <Button onClick={handleSubmit} className="w-2/3 mt-16">
        가입하기
      </Button>
    </div>
  );
}
