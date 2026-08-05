"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const textElements = textRef.current.children;

    gsap.fromTo(
      textElements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-subtitle">01. Who am I</h2>
          <h3 className="section-title gradient-text mb-12">The Pursuit of Understanding</h3>

          <div ref={textRef} className="space-y-8 glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Subtle glow effect behind text */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-electric-blue/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-event-horizon/20 rounded-full blur-[100px]" />
            
            <p className="text-xl md:text-2xl font-space text-starlight leading-relaxed">
              My name is {personalInfo.name}. I am a Physics undergraduate with a profound passion for understanding the Universe from first principles.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              My dream is to contribute to theoretical high-energy physics, drawing inspiration from the elegant works of Einstein, Dirac, Feynman, Penrose, Hawking, and Weinberg.
            </p>

            <p className="text-lg text-text-secondary leading-relaxed">
              I enjoy connecting the abstract beauty of mathematics with the physical nature of reality, firmly believing that physics is humanity's deepest attempt to understand existence.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
