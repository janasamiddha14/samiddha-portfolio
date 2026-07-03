"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/data/content";
import { Award } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.5)",
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
        <h2 className="section-subtitle text-center">07. Milestones</h2>
        <h3 className="section-title text-center gradient-text mb-16">Achievements</h3>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center mb-4 group-hover:bg-electric-blue/20 transition-colors">
                <Award className="w-6 h-6 text-electric-blue" />
              </div>
              <h4 className="font-space text-starlight font-medium mb-2">{achievement.title}</h4>
              <div className="text-xs font-mono text-electric-blue/70 mb-3">{achievement.date}</div>
              <p className="text-text-secondary text-sm flex-grow">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
