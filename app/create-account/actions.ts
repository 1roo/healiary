"use client";

import { z } from "zod";

export const baseSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  nickname: z
    .string()
    .min(3, "닉네임은 3자 이상 10자 이하입니다.")
    .max(10, "닉네임은 3자 이상 10자 이하입니다.")
    .regex(/^[a-zA-Z0-9가-힣]+$/, "한글, 영문, 숫자만 사용 가능"),
  password: z
    .string()
    .min(8, "비밀번호는 8~15자 입니다.")
    .max(15, "비밀번호는 8~15자 입니다.")
    .regex(/[a-zA-Z]/, "영문 포함")
    .regex(/\d/, "숫자 포함"),
  confirmPassword: z.string(),
});

export const registerSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  }
);

export type RegisterFormData = z.infer<typeof registerSchema>;

export async function handleRegister(data: RegisterFormData) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};

    result.error.errors.forEach(({ path, message }) => {
      const field = path.length > 0 ? path[0] : "unknown";
      fieldErrors[field] = message;
    });

    return { success: false, errors: fieldErrors };
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return { success: false, serverError: resData.message };
    }

    return { success: true };
  } catch (err) {
    console.error("회원가입 중 오류:", err);
    return { success: false, serverError: "서버 오류가 발생했습니다." };
  }
}
