import { cn } from "@/utils/cn";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-xs px-2 py-1 font-semibold rounded bg-gray-100 text-gray-800", className)}>
      {children}
    </span>
  );
}
