interface IHomeBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function HomeBox({ title, children, className }: IHomeBoxProps) {
  return (
    <div className={`w-full my-2 bg-white opacity-80 px-6 py-4 ${className}`}>
      <div className="text-sm font-semibold mb-2">{title}</div>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
}
