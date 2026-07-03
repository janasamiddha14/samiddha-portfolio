"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/content";
import { Mail, Linkedin, Github, ExternalLink, Download } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const elements = contentRef.current.children;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const links = [
    { name: "Email", icon: Mail, url: `mailto:${personalInfo.email}` },
    { name: "LinkedIn", icon: Linkedin, url: personalInfo.linkedin },
    { name: "GitHub", icon: Github, url: personalInfo.github },
  ];

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle text-center">10. Connect</h2>
        <h3 className="section-title text-center gradient-text mb-16">Contact & Links</h3>

        <div ref={contentRef} className="max-w-3xl mx-auto flex flex-col items-center">
          
          <div className="glass-card w-full p-8 md:p-12 mb-12 text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nebula-glow/5 rounded-full blur-[80px]" />
            
            <p className="text-xl font-space text-starlight mb-8 relative z-10">
              I am always open to discussing theoretical physics, research opportunities, and collaborations.
            </p>
            
            <a href={`mailto:${personalInfo.email}`} className="btn-primary relative z-10">
              <Mail className="w-4 h-4 mr-2" />
              Say Hello
            </a>
          </div>

          {/* Social / Academic Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-12">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center justify-center gap-3 hover:bg-white/5 hover:border-electric-blue/50 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-text-muted group-hover:text-electric-blue transition-colors" />
                  <span className="text-sm font-medium text-starlight">{link.name}</span>
                </a>
              );
            })}
          </div>

          <a href={personalInfo.cvLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Download className="w-4 h-4 mr-2" />
            Download Full Curriculum Vitae
          </a>
        </div>
      </div>
    </section>
  );
}
