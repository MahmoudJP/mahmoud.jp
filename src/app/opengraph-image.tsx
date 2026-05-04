import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mahmoud Adel | Trilingual DTP Specialist & Interpreter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Grid dots pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            zIndex: 10,
          }}
        >
          {/* Domain badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
              padding: "6px 18px",
              borderRadius: 999,
              border: "1px solid rgba(59,130,246,0.35)",
              background: "rgba(59,130,246,0.08)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#60a5fa",
                display: "flex",
              }}
            />
            <span style={{ color: "#93c5fd", fontSize: 16, letterSpacing: "0.05em" }}>
              mahmoud.jp
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
              marginBottom: 16,
            }}
          >
            Mahmoud Adel
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 26,
              color: "#60a5fa",
              fontWeight: 400,
              letterSpacing: "0.01em",
              marginBottom: 40,
              display: "flex",
            }}
          >
            Trilingual DTP Specialist · Interpreter · Tokyo
          </div>

          {/* Language pills */}
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
            }}
          >
            {[
              { label: "العربية", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
              { label: "日本語", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
              { label: "English", color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" },
            ].map(({ label, color, bg, border }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 22px",
                  borderRadius: 999,
                  border: `1px solid ${border}`,
                  background: bg,
                  color,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
