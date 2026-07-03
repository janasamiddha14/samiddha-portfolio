"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/content";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle">04. Explorations</h2>
        <h3 className="section-title gradient-text mb-12">Current Projects</h3>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass-card group relative p-1 rounded-2xl overflow-hidden cursor-pointer h-full"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue via-nebula-glow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: 'rotate(120deg)' }} />
              
              <div className="bg-space-black/90 backdrop-blur-xl h-full rounded-[14px] p-6 flex flex-col relative z-10 border border-border">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono px-2 py-1 bg-electric-blue/10 text-electric-blue rounded border border-electric-blue/20">
                    {project.status}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-electric-blue transition-colors duration-300" />
                </div>
                
                <h4 className="text-xl font-space text-starlight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-starlight group-hover:to-electric-blue transition-all duration-300">
                  {project.title}
                </h4>
                
                <p className="text-text-secondary text-sm flex-grow mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-[11px] font-mono text-text-muted px-2 py-1 bg-white/5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
