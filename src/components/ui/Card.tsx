import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-border bg-white shadow-sm
        ${hoverable ? "cursor-pointer transition-all duration-300 hover:border-viola/50 hover:shadow-lg hover:shadow-viola/10 hover:-translate-y-0.5" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}
