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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-subtitle">01. Who am I</h2>
          <h3 className="section-title gradient-text mb-12">The Pursuit of Understanding</h3>

          <div ref={textRef} className="space-y-8 glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Subtle glow effect behind text */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-electric-blue/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-event-horizon/20 rounded-full blur-[100px]" />
            
            <p className="text-xl md:text-2xl font-space text-starlight leading-relaxed">
              I am Samiddha Jana, a Physics student, driven by an enduring curiosity about the Universe and the fundamental laws of nature. Physics is not merely a subject I study—it is the subject that dwells in my heart. Since childhood, I have dreamed of exploring the Universe and uncovering the mysteries hidden within it, and physics gave me the opportunity to turn that dream into a lifelong pursuit.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              I carry a deep and genuine love for understanding nature—from the smallest fundamental particles to the vastness of the cosmos. For me, every equation is a language, every phenomenon a question, and every unanswered problem an invitation to explore further.
            </p>

            <blockquote className="border-l-2 border-electric-blue/50 pl-6 py-2 italic">
              <p className="text-lg text-text-secondary leading-relaxed">
                &ldquo;The whole of science is nothing more than a refinement of everyday thinking.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-sm text-electric-blue/70 not-italic tracking-wide">
                — Ernest Rutherford
              </footer>
            </blockquote>

          </div>
        </div>
      </div>
    </section>
  );
}
