import type { CSSProperties } from "react";

export interface GlassMeterProps {
  label: string;
  value: number;
  display: string;
  tone?: "ink" | "signal" | "muted";
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function GlassMeter({
  label,
  value,
  display,
  tone = "ink",
  orientation = "vertical",
  className = "",
}: GlassMeterProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  const style = { "--meter-value": `${safeValue}%` } as CSSProperties;

  return (
    <div className={`glass-meter glass-meter--${orientation} glass-meter--${tone} ${className}`}>
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className="glass-meter__vessel"
        role="meter"
        style={style}
      >
        <div className="glass-meter__ticks" aria-hidden="true" />
        <div className="glass-meter__fill" aria-hidden="true" />
        <div className="glass-meter__shine" aria-hidden="true" />
      </div>
      <div className="glass-meter__readout">
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
    </div>
  );
}
