"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
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
        stagger: 0.15,
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
        <h2 className="section-subtitle">08. Network</h2>
        <h3 className="section-title gradient-text mb-12">People I Work With</h3>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((person, index) => (
            <div 
              key={index} 
              className="glass-card p-6 relative group overflow-hidden hover:border-electric-blue/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-electric-blue font-mono text-xs mb-3 opacity-80">{person.designation}</div>
                <h4 className="font-space text-xl text-starlight mb-2 group-hover:text-electric-blue transition-colors duration-200">{person.name}</h4>
                <div className="text-text-secondary text-sm mb-3">{person.field}</div>
                <div className="text-text-muted text-xs font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60 inline-block" />
                  {person.institution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
