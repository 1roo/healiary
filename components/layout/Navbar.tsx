"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Star, User } from "lucide-react";

const navItems = [
  { href: "/home", label: "홈", icon: <Home size={25} /> },
  { href: "/diary", label: "기록", icon: <BookOpen size={25} /> },
  { href: "/favorites", label: "즐겨찾기", icon: <Star size={25} /> },
  { href: "/mypage", label: "마이페이지", icon: <User size={25} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-16 border-t border-gray-200 bg-white flex justify-around items-center z-50">
      {navItems.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center text-xs">
          <div
            className={`${
              pathname === href ? "text-[#CE9090]" : "text-gray-400"
            }`}>
            {icon}
          </div>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
