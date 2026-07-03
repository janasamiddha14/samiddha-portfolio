"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll('.timeline-item');
    const line = timelineRef.current.querySelector('.timeline-line');

    // Animate the line growing
    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    // Animate the items appearing
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle text-center">03. Trajectory</h2>
        <h3 className="section-title text-center gradient-text mb-20">Academic Experience</h3>

        <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
          {/* Central Line */}
          <div className="timeline-line hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div 
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card p-6 relative group hover:border-electric-blue/50 transition-colors">
                    <div className="text-electric-blue font-mono text-sm mb-2">{exp.duration}</div>
                    <h4 className="text-lg font-space text-starlight mb-1">{exp.role}</h4>
                    <div className="text-sm font-semibold text-text-secondary mb-4">{exp.institution}</div>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex justify-center items-center w-8">
                  <div className="timeline-dot relative z-10" />
                </div>

                {/* Empty Side for balance */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
