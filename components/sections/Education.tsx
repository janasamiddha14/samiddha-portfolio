"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = containerRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
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
        <h2 className="section-subtitle">06. Foundation</h2>
        <h3 className="section-title gradient-text mb-12">Education</h3>

        <div className="max-w-3xl" ref={containerRef}>
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="relative pl-8 md:pl-0 mb-12 last:mb-0 group"
            >
              {/* Timeline indicator for mobile */}
              <div className="md:hidden absolute left-0 top-2 bottom-[-3rem] w-[1px] bg-border last:bottom-0">
                <div className="absolute top-0 left-[-4px] w-[9px] h-[9px] rounded-full bg-electric-blue border border-space-black" />
              </div>

              <div className="md:flex gap-8 items-start">
                <div className="hidden md:block w-32 shrink-0 pt-1 text-right">
                  <div className="text-electric-blue font-mono text-sm">{edu.duration}</div>
                </div>
                
                {/* Timeline indicator for desktop */}
                <div className="hidden md:flex flex-col items-center shrink-0 w-[1px] bg-border self-stretch relative mt-2">
                  <div className="absolute top-0 left-[-4px] w-[9px] h-[9px] rounded-full bg-electric-blue border border-space-black group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(63,169,255,0.8)] transition-all duration-300" />
                </div>
                
                <div className="flex-1 glass-card p-6 md:-mt-4">
                  <div className="md:hidden text-electric-blue font-mono text-sm mb-2">{edu.duration}</div>
                  <h4 className="text-xl font-space text-starlight mb-1">{edu.degree}</h4>
                  <div className="text-sm font-semibold text-text-secondary mb-3">{edu.institution}</div>
                  <p className="text-text-muted text-sm">{edu.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
