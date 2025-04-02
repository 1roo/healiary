"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegister, baseSchema } from "./actions";
import FormInput from "@/components/form-input";
import Button from "@/components/button";
import debounce from "lodash.debounce";

export default function CreateAccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const checkEmailExists = debounce(async (value: string) => {
    if (!value.includes("@")) return;

    const res = await fetch("/api/auth/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
    });

    const data = await res.json();
    if (data.exists) {
      setEmailError("이미 가입된 이메일입니다.");
    } else {
      setEmailError(""); // ✅ 중복 아님 -> 에러 제거
    }
  }, 500);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setEmailError("");
      return;
    }

    const result = baseSchema.shape.email.safeParse(value);
    setEmailError(result.success ? "" : result.error.errors[0].message);

    if (result.success) checkEmailExists(value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    if (value === "") {
      setNicknameError("");
      return;
    }

    const result = baseSchema.shape.nickname.safeParse(value);
    setNicknameError(result.success ? "" : result.error.errors[0].message);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === "") {
      setPasswordError("");
      setConfirmPasswordError("");
      return;
    }

    const result = baseSchema.shape.password.safeParse(value);
    setPasswordError(result.success ? "" : result.error.errors[0].message);

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value === "") {
      setConfirmPasswordError("");
      return;
    }

    if (password !== value) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    // ✅ 에러 초기화
    setEmailError("");
    setNicknameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const result = await handleRegister({
      email,
      nickname,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setEmailError(result.errors?.email || "");
      setNicknameError(result.errors?.nickname || "");
      setPasswordError(result.errors?.password || "");
      setConfirmPasswordError(result.errors?.confirmPassword || "");

      if (result.serverError) {
        alert(result.serverError);
      }
      return;
    }

    alert("🎉 회원가입 성공!");
    router.push("/");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center gap-4 ">
      <p className="mt-8 font-semibold text-2xl text-[#CE9090]">회원가입</p>

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

      <Button onClick={handleSubmit} className="w-2/3 mt-2">
        가입하기
      </Button>
    </div>
  );
}
