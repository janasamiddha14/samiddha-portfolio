"use client";

import { useEffect, useRef } from "react";

/**
 * MouseTrail — Cosmic particle cursor
 * Creates a custom cursor dot + ring, with a fading particle trail
 * that resembles space dust left behind as the cursor moves.
 */
export default function MouseTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const TRAIL_LENGTH = 12;

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    // Create trail particles
    const particles = Array.from({ length: TRAIL_LENGTH }, (_, i) => {
      const el = document.createElement("div");
      const size = Math.max(2, 6 - i * 0.4);
      el.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(63,169,255,${0.6 - i * 0.05});
        pointer-events: none;
        z-index: 9997;
        mix-blend-mode: screen;
        transition: opacity 0.1s ease;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(el);
      return el;
    });
    trailRef.current = particles;

    const trailPositions = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      // Smooth ring follow
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }

      // Trail follows the ring position with cascading delay
      trailPositions.unshift({ ...ringPos.current });
      trailPositions.pop();
      trailPositions.forEach((pos, i) => {
        if (trailRef.current[i]) {
          trailRef.current[i].style.left = pos.x + "px";
          trailRef.current[i].style.top = pos.y + "px";
          trailRef.current[i].style.opacity = String(1 - i / TRAIL_LENGTH);
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
      trailRef.current.forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
