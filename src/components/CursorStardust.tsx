"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, input, textarea, select, [role='button']";
const starBlockedSelector = [
  interactiveSelector,
  "img",
  "picture",
  "video",
  "canvas",
  "svg",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "blockquote",
  "code",
  "pre",
  "nav",
  "footer",
  ".copy-surface",
  ".bento-card",
  ".proof-card",
  ".trust-mark",
  ".product-window",
  ".project-preview",
  ".article-reading",
].join(", ");
const clickStarColors = ["#ffffff", "#bae6fd", "#c7d2fe", "#fde68a", "#fed7aa"];

export function CursorStardust() {
  const rootRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLSpanElement>(null);
  const echoRef = useRef<HTMLSpanElement>(null);
  const touchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const aura = auraRef.current;
    const echo = echoRef.current;
    const touch = touchRef.current;

    if (!root || !aura || !echo || !touch) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const auraPoint = { ...target };
    const echoPoint = { ...target };
    let frame = 0;
    let touchTimer = 0;
    let effectEnabled =
      window.localStorage.getItem("mahmoud-cursor-effect") !== "off";

    root.classList.toggle("is-disabled", !effectEnabled);

    const animate = () => {
      auraPoint.x += (target.x - auraPoint.x) * 0.18;
      auraPoint.y += (target.y - auraPoint.y) * 0.18;
      aura.style.transform = `translate3d(${auraPoint.x}px, ${auraPoint.y}px, 0) translate(-50%, -50%)`;
      echoPoint.x += (target.x - echoPoint.x) * 0.075;
      echoPoint.y += (target.y - echoPoint.y) * 0.075;
      echo.style.transform = `translate3d(${echoPoint.x}px, ${echoPoint.y}px, 0) translate(-50%, -50%)`;

      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!effectEnabled) return;
      if (event.pointerType !== "mouse") return;

      target.x = event.clientX;
      target.y = event.clientY;
      root.classList.add("is-visible");

      const overInteractive =
        event.target instanceof Element && Boolean(event.target.closest(interactiveSelector));
      root.classList.toggle("is-muted", overInteractive);
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) root.classList.remove("is-visible");
    };

    const handleTouch = (event: PointerEvent) => {
      if (!effectEnabled) return;
      if (event.pointerType !== "touch") return;

      touch.style.left = `${event.clientX}px`;
      touch.style.top = `${event.clientY}px`;
      touch.classList.remove("is-active");
      void touch.offsetWidth;
      touch.classList.add("is-active");

      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => touch.classList.remove("is-active"), 650);
    };

    const handleSpaceStar = (event: PointerEvent) => {
      if (!effectEnabled) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(starBlockedSelector)) return;

      const star = document.createElement("span");
      const color = clickStarColors[Math.floor(Math.random() * clickStarColors.length)];
      const rotation = Math.round(Math.random() * 50 - 25);

      star.className = "space-click-star";
      star.style.left = `${event.clientX}px`;
      star.style.top = `${event.clientY}px`;
      star.style.setProperty("--click-star-color", color);
      star.style.setProperty("--click-star-rotation", `${rotation}deg`);
      star.addEventListener("animationend", () => star.remove(), { once: true });
      root.appendChild(star);
    };

    const handleEffectChange = (event: Event) => {
      effectEnabled = (event as CustomEvent<{ enabled: boolean }>).detail.enabled;
      root.classList.toggle("is-disabled", !effectEnabled);
      if (!effectEnabled) {
        root.classList.remove("is-visible");
        root.querySelectorAll(".space-click-star").forEach((node) => node.remove());
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handleTouch, { passive: true });
    window.addEventListener("pointerdown", handleSpaceStar, { passive: true });
    window.addEventListener("cursor-effect-change", handleEffectChange);
    document.addEventListener("mouseout", handleMouseOut);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handleTouch);
      window.removeEventListener("pointerdown", handleSpaceStar);
      window.removeEventListener("cursor-effect-change", handleEffectChange);
      document.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(touchTimer);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="cursor-stardust">
      <span ref={echoRef} className="cursor-echo" />
      <span ref={auraRef} className="cursor-aura">
        <span className="cursor-orbit" />
      </span>
      <span ref={touchRef} className="touch-starburst" />
    </div>
  );
}
