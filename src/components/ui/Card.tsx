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
      className={`rounded-2xl border border-border bg-white
        ${hoverable ? "cursor-pointer transition-colors duration-200 hover:border-viola/40 hover:bg-surface-alt" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}
