import React from "react";

const SIZE_MAP = {
  sm: { box: 96, radius: 38, stroke: 8, font: "text-lg" },
  md: { box: 180, radius: 74, stroke: 12, font: "text-4xl" },
};

const HEAT_COPY = {
  Mild: "Lightly seared",
  Medium: "Getting toasty",
  "Well Done": "Cooked through",
  Charred: "Burnt to a crisp",
};

/**
 * EmberGauge — circular flame-meter that visualizes the roast score (0-100).
 * The arc fills from gold -> ember -> deep red as the score climbs in severity,
 * standing in for the generic progress bar with something native to the "roast" idea.
 */
const EmberGauge = ({ score = 0, heatLevel = "Medium", size = "md" }) => {
  const { box, radius, stroke, font } = SIZE_MAP[size] || SIZE_MAP.md;
  const center = box / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference * (1 - clamped / 100);
  const gradientId = `ember-gradient-${size}-${clamped}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: box, height: box }}>
        <svg width={box} height={box} className="-rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB627" />
              <stop offset="55%" stopColor="#FF5A1F" />
              <stop offset="100%" stopColor="#C81E3A" />
            </linearGradient>
          </defs>
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#2A1C16"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-flicker transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono font-semibold text-gold ${font}`}>{clamped}</span>
          <span className="text-[10px] uppercase tracking-widest text-smoke">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-ash">{heatLevel}</p>
        <p className="text-xs text-smoke">{HEAT_COPY[heatLevel] || ""}</p>
      </div>
    </div>
  );
};

export default EmberGauge;
