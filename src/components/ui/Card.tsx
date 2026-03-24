import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-border bg-white shadow-sm
        ${hoverable ? "cursor-pointer transition-all duration-300 hover:border-viola/50 hover:shadow-lg hover:shadow-viola/10 hover:-translate-y-0.5" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}
