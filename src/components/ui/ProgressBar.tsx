interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

const heights = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {label && <span className="text-foreground-muted">{label}</span>}
          {showPercentage && (
            <span className="font-semibold text-viola">{Math.round(clamped)}%</span>
          )}
        </div>
      )}
      <div className={`w-full rounded-full bg-surface-alt ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} rounded-full bg-gradient-to-r from-viola to-viola-light transition-[width] duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
