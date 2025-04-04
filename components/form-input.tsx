import React from "react";
import { cn } from "@/lib/utils";

interface IFormInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className,
}: IFormInputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-md font-medium text-gray-400">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full h-10 px-4 py-2 border rounded-lg outline-none bg-slate-50 focus:ring-1 focus:ring-gray-500 transition",
          className,
          error && "border-red-500"
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
