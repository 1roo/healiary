"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Star, User } from "lucide-react";

const navItems = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/diary/write", label: "일기쓰기", icon: BookOpen },
  { href: "/favorites", label: "즐겨찾기", icon: Star },
  { href: "/mypage", label: "마이페이지", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-16 border-t border-gray-200 bg-white flex justify-around items-center z-50">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center text-xs">
            <Icon
              size={25}
              className={`transition-all duration-200 ${
                isActive
                  ? "text-[#CE9090] opacity-100 scale-110"
                  : "text-gray-400 opacity-50 scale-100"
              }`}
            />
            <span
              className={`mt-1 transition-colors ${
                isActive ? "text-[#CE9090]" : "text-gray-400"
              }`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
