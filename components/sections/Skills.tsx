"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillCategoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !skillCategoriesRef.current) return;

    const categories = skillCategoriesRef.current.children;

    gsap.fromTo(
      categories,
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
    <section ref={sectionRef} className="section-padding relative bg-[#060a12]/50 border-y border-border">
      <div className="section-container">
        <h2 className="section-subtitle text-center">05. Toolkit</h2>
        <h3 className="section-title text-center gradient-text mb-16">Scientific Proficiency</h3>

        <div ref={skillCategoriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Physics */}
          <div className="glass-card p-6 border-t-2 border-t-electric-blue">
            <h4 className="text-lg font-space text-starlight mb-4 flex items-center gap-2">
              <span className="text-electric-blue text-sm">◆</span> Physics
            </h4>
            <ul className="space-y-3">
              {skills.physics.map((skill, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-electric-blue/50 mt-1">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Mathematics */}
          <div className="glass-card p-6 border-t-2 border-t-nebula-glow">
            <h4 className="text-lg font-space text-starlight mb-4 flex items-center gap-2">
              <span className="text-nebula-glow text-sm">◆</span> Mathematics
            </h4>
            <ul className="space-y-3">
              {skills.mathematics.map((skill, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-nebula-glow/50 mt-1">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Programming */}
          <div className="glass-card p-6 border-t-2 border-t-[#8EAEF0]">
            <h4 className="text-lg font-space text-starlight mb-4 flex items-center gap-2">
              <span className="text-[#8EAEF0] text-sm">◆</span> Programming
            </h4>
            <ul className="space-y-3">
              {skills.programming.map((skill, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-[#8EAEF0]/50 mt-1">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div className="glass-card p-6 border-t-2 border-t-[#607bb0]">
            <h4 className="text-lg font-space text-starlight mb-4 flex items-center gap-2">
              <span className="text-[#607bb0] text-sm">◆</span> Research
            </h4>
            <ul className="space-y-3">
              {skills.research.map((skill, index) => (
                <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-[#607bb0]/50 mt-1">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
