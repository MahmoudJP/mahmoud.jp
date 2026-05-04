"use client";

import { motion } from "framer-motion";

const particlePositions = [
  { x: 12, y: 8, d: 4.2, dl: 0.3 }, { x: 88, y: 15, d: 5.1, dl: 1.2 }, { x: 35, y: 72, d: 3.8, dl: 2.1 },
  { x: 67, y: 33, d: 6.0, dl: 0.8 }, { x: 23, y: 91, d: 4.5, dl: 1.5 }, { x: 78, y: 55, d: 3.3, dl: 2.8 },
  { x: 45, y: 18, d: 5.7, dl: 0.1 }, { x: 92, y: 67, d: 4.0, dl: 1.9 }, { x: 8, y: 42, d: 6.5, dl: 0.6 },
  { x: 55, y: 85, d: 3.5, dl: 2.4 }, { x: 31, y: 28, d: 5.3, dl: 1.0 }, { x: 73, y: 95, d: 4.8, dl: 0.4 },
  { x: 18, y: 60, d: 3.1, dl: 2.6 }, { x: 82, y: 38, d: 5.9, dl: 1.7 }, { x: 50, y: 5, d: 4.3, dl: 0.9 },
  { x: 5, y: 78, d: 6.2, dl: 2.0 }, { x: 40, y: 50, d: 3.6, dl: 1.3 }, { x: 95, y: 22, d: 5.0, dl: 0.7 },
  { x: 28, y: 13, d: 4.7, dl: 2.3 }, { x: 62, y: 88, d: 3.9, dl: 1.6 }, { x: 15, y: 35, d: 5.5, dl: 0.2 },
  { x: 85, y: 70, d: 4.1, dl: 2.9 }, { x: 38, y: 45, d: 6.3, dl: 1.1 }, { x: 70, y: 10, d: 3.4, dl: 0.5 },
  { x: 10, y: 55, d: 5.8, dl: 2.5 }, { x: 58, y: 75, d: 4.6, dl: 1.4 }, { x: 25, y: 3, d: 3.7, dl: 2.7 },
  { x: 80, y: 48, d: 5.2, dl: 0.0 }, { x: 48, y: 62, d: 4.4, dl: 1.8 }, { x: 3, y: 92, d: 6.1, dl: 2.2 },
];

export function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.dl,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
