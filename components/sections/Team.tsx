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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle">08. Network</h2>
        <h3 className="section-title gradient-text mb-12">People I Work With</h3>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((person, index) => (
            <div key={index} className="glass-card overflow-hidden group">
              {/* Photo Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-space-black to-cosmic-navy relative overflow-hidden flex items-center justify-center">
                <div className="text-text-muted text-sm font-mono opacity-50">Image Placeholder</div>
                <div className="absolute inset-0 bg-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
              </div>
              
              <div className="p-6">
                <h4 className="font-space text-lg text-starlight mb-1">{person.name}</h4>
                <div className="text-electric-blue font-medium text-sm mb-3">{person.designation}</div>
                <div className="text-text-secondary text-sm mb-1">{person.field}</div>
                <div className="text-text-muted text-xs font-mono">{person.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
