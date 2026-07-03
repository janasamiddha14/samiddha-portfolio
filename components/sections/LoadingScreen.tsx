"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { equations } from "@/lib/data";

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * LoadingScreen — Cinematic physics-themed intro
 *
 * Phase 1: Black hole event horizon animation + supernova burst
 * Phase 2: Famous physics equations fade in sequentially
 * Phase 3: Progress bar fills, then everything fades out
 */
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentEquation, setCurrentEquation] = useState(0);
  const [phase, setPhase] = useState<"intro" | "equations" | "done">("intro");

  useEffect(() => {
    // Phase 1: short intro
    const phaseTimer = setTimeout(() => {
      setPhase("equations");
    }, 800);

    return () => clearTimeout(phaseTimer);
  }, []);

  useEffect(() => {
    if (phase !== "equations") return;

    // Cycle through equations
    let eq = 0;
    const eqInterval = setInterval(() => {
      eq++;
      if (eq >= equations.length) {
        clearInterval(eqInterval);
      } else {
        setCurrentEquation(eq);
      }
    }, 900);

    // Progress bar
    let p = 0;
    const progressInterval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 800);
        }, 400);
      }
      setProgress(Math.min(p, 100));
    }, 80);

    return () => {
      clearInterval(eqInterval);
      clearInterval(progressInterval);
    };
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--color-space-black)" }}
          role="status"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Background nebula */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(14,42,92,0.4) 0%, transparent 70%)",
            }}
          />

          {/* Rotating event horizon */}
          <div className="relative mb-12" aria-hidden="true">
            {/* Outer glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full"
              style={{
                border: "1px solid rgba(63,169,255,0.3)",
                boxShadow: "0 0 40px rgba(63,169,255,0.15), inset 0 0 40px rgba(63,169,255,0.05)",
              }}
            />

            {/* Inner ring — counter-rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full"
              style={{
                border: "1px solid rgba(92,203,255,0.5)",
              }}
            />

            {/* Accretion disk dashes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full"
              style={{
                border: "2px dashed rgba(63,169,255,0.4)",
              }}
            />

            {/* Black hole core */}
            <div
              className="absolute inset-[22%] rounded-full"
              style={{
                background: "#000",
                boxShadow: "0 0 30px rgba(63,169,255,0.3)",
              }}
            />

            {/* Orbital particle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div
                className="w-2 h-2 rounded-full -mt-1"
                style={{ background: "var(--color-nebula-glow)", boxShadow: "0 0 8px rgba(92,203,255,0.8)" }}
              />
            </motion.div>
          </div>

          {/* Equations */}
          <div className="h-16 flex flex-col items-center justify-center mb-8" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEquation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="font-mono text-xs text-[color:var(--color-text-muted)] mb-1 tracking-widest uppercase">
                  {equations[currentEquation]?.label}
                </p>
                <p
                  className="font-mono text-sm text-electric-blue tracking-wide"
                  style={{ textShadow: "0 0 20px rgba(63,169,255,0.4)" }}
                >
                  {equations[currentEquation]?.display}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-48" aria-hidden="true">
            <div className="flex justify-between font-mono text-[10px] text-[color:var(--color-text-muted)] mb-2">
              <span>INITIALIZING</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-fill"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Name signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-8 font-space text-xs text-[color:var(--color-text-muted)] tracking-widest uppercase"
          >
            Samiddha Jana &nbsp;·&nbsp; Physics
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
