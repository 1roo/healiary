import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles = "w-full h-14 rounded-lg px-4 py-2 font-medium transition";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#EE9595] to-[#CCC57C] opacity-80 text-white hover:brightness-105",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
