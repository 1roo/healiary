import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full h-14 bg-slate-50 px-4 py-2 my-2 border rounded-lg outline-none focus:ring-1 focus:ring-gray-400 transition",
        className
      )}
      {...props}
    />
  );
}
