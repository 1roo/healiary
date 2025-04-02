import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[430px] h-[430px] mt-20">
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
      <div className="w-2/3 mt-8 flex flex-col items-center justify-center">
        <Input type="email" placeholder="이메일" />
        <Input className="mt-2" type="password" placeholder="비밀번호" />
        <Button className="mt-5">로그인</Button>
      </div>
      <p className="my-10">OR</p>
      <Button className="w-2/3">회원가입</Button>
    </div>
  );
}
