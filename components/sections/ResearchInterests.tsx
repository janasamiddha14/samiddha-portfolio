"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { researchInterests } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResearchInterests() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle text-center">02. Areas of Focus</h2>
        <h3 className="section-title text-center gradient-text mb-16">Research Interests</h3>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchInterests.map((interest, index) => (
            <div 
              key={index} 
              className="glass-card p-8 research-card group relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-electric-blue font-mono text-xs mb-4 opacity-70">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h4 className="text-xl font-space text-starlight mb-4 group-hover:text-electric-blue transition-colors">
                  {interest.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {interest.description}
                </p>
              </div>

              {/* Decorative particle element */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-electric-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
