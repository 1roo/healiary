import { ChevronRight } from "lucide-react";

interface IHomeBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onArrowClick?: () => void;
  rightElement?: React.ReactNode;
}

export default function HomeBox({
  title,
  children,
  className,
  onArrowClick,
  rightElement,
}: IHomeBoxProps) {
  return (
    <div className={`w-full my-2 bg-white opacity-80 px-6 py-4 ${className}`}>
      <div className=" flex justify-between text-sm font-semibold mb-2">
        {title}
        <div className="flex items-center gap-1">
          {rightElement}
          {onArrowClick && (
            <ChevronRight
              size={18}
              strokeWidth={1.5}
              onClick={onArrowClick}
              className="text-gray-400 cursor-pointer transition-transform duration-150 hover:text-gray-600 hover:scale-110"
            />
          )}
        </div>
      </div>

      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
}
