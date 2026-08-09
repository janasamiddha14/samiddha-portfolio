"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import gsap from "gsap";
import { personalInfo } from "@/data/content";
import {
  StarField,
  ShootingStar,
  SpaceDust
} from "@/components/three/BlackHoleScene";

export default function Hero() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quoteRef.current || !scrollIndicatorRef.current) return;

    const tl = gsap.timeline({ delay: 3 }); // Wait for loading screen

    // Reveal quote lines sequentially
    const quoteLines = quoteRef.current.querySelectorAll(".quote-line");
    tl.fromTo(
      quoteLines,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, stagger: 1.5, ease: "power3.out" }
    );

    // Fade in author
    const author = quoteRef.current.querySelector(".quote-author");
    tl.fromTo(
      author,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" },
      "-=0.5"
    );

    // Fade in scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "-=1"
    );
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-space-black">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          dpr={1} // Cap pixel ratio to 1 for butter-fluidic mobile performance
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#050608"]} />
          <ambientLight intensity={0.2} />
          
          <group position={[0, 0, 0]}>
            <SpaceDust />
          </group>
          
          <StarField />
          <ShootingStar />
          
          {/* Lightweight point light instead of heavy HDR environment */}
          <pointLight position={[10, 10, 10]} intensity={0.3} />
        </Canvas>
      </div>

      {/* Cinematic Quote Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <div ref={quoteRef} className="max-w-4xl mx-auto text-center">
          <p className="quote-line font-space text-xl md:text-3xl lg:text-4xl text-starlight leading-relaxed opacity-0 mb-4 tracking-wide">
            "Remember to look up at the stars and not down at your feet.
          </p>
          <p className="quote-line font-space text-xl md:text-3xl lg:text-4xl text-starlight leading-relaxed opacity-0 mb-4 tracking-wide">
            Try to make sense of what you see, and wonder about what makes the universe exist.
          </p>
          <p className="quote-line font-space text-xl md:text-3xl lg:text-4xl text-electric-blue font-semibold opacity-0 tracking-wide mt-6">
            Be curious."
          </p>
          <p className="quote-author font-mono text-sm md:text-base text-text-secondary mt-12 opacity-0 tracking-widest uppercase">
            — Stephen Hawking
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-0"
      >
        <span className="font-mono text-xs tracking-[0.3em] text-text-muted mb-4 uppercase">
          Enter the Universe
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-electric-blue/50 to-transparent animate-pulse-slow"></div>
      </div>

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#050608_100%)] opacity-80" />
    </div>
  );
}
