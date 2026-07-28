import type { CSSProperties } from "react";

const stars = [
  [8, 13, 2.7, 0.3, "#dbeafe", 0.88],
  [18, 36, 2.5, 2.8, "#fff7ed", 0.52],
  [28, 8, 1.9, 5.1, "#bfdbfe", 0.38],
  [39, 22, 2.8, 1.2, "#ffffff", 0.78],
  [51, 11, 2, 3.9, "#fde68a", 0.42],
  [64, 31, 3.5, 0.8, "#dbeafe", 0.94],
  [76, 9, 2.2, 4.5, "#c7d2fe", 0.48],
  [88, 24, 3, 2.1, "#fed7aa", 0.68],
  [95, 48, 1.9, 5.8, "#bfdbfe", 0.35],
  [12, 61, 2.7, 1.7, "#ffffff", 0.7],
  [23, 82, 2, 4.1, "#fecaca", 0.36],
  [34, 51, 3.2, 0.1, "#dbeafe", 0.9],
  [46, 72, 2.2, 2.5, "#fde68a", 0.46],
  [57, 43, 1.9, 5.4, "#c7d2fe", 0.34],
  [69, 66, 2.8, 1.1, "#ffffff", 0.76],
  [81, 53, 2.4, 3.2, "#bae6fd", 0.5],
  [91, 78, 3.2, 0.5, "#fff7ed", 0.84],
  [6, 91, 2, 4.8, "#bfdbfe", 0.4],
] as const;

type SpaceStyle = CSSProperties & {
  "--star-x": string;
  "--star-y": string;
  "--star-size": string;
  "--star-delay": string;
  "--star-color": string;
  "--star-opacity": string;
};

/** A restrained, fixed deep-space scene shared by every route. */
export function GlobalStarfield() {
  return (
    <div aria-hidden className="site-starfield">
      <div className="space-aurora space-aurora--one" />
      <div className="space-aurora space-aurora--two" />
      <div className="space-nebula space-nebula--cyan" />
      <div className="space-nebula space-nebula--violet" />
      <div className="space-dust space-dust--far" />
      <div className="space-dust space-dust--near" />
      <div className="space-stars">
        {stars.map(([x, y, size, delay, color, opacity]) => (
          <span
            key={`${x}-${y}`}
            className="space-star"
            style={{
              "--star-x": `${x}%`,
              "--star-y": `${y}%`,
              "--star-size": `${size}px`,
              "--star-delay": `${delay}s`,
              "--star-color": color,
              "--star-opacity": `${opacity}`,
            } as SpaceStyle}
          />
        ))}
      </div>
      <span className="space-glint space-glint--one" />
      <span className="space-glint space-glint--two" />
      <span className="space-glint space-glint--three" />
      <span className="space-comet space-comet--one" />
    </div>
  );
}
