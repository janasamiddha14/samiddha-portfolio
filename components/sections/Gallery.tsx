"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const items = gridRef.current.children;

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const photos = [
    { src: "/gallery_1.jpg", label: "Beach Selfie", ratio: "aspect-[3/4]" },
    { src: "/gallery_2.jpg", label: "Rocky Shoreline", ratio: "aspect-video" },
    { src: "/gallery_3.jpg", label: "Mangrove Wetlands", ratio: "aspect-[3/4]" },
    { src: "/gallery_4.jpg", label: "Stormy Beach", ratio: "aspect-video" },
  ];

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <h2 className="section-subtitle">09. Visuals</h2>
        <h3 className="section-title gradient-text mb-12">Gallery</h3>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className={`glass-card overflow-hidden group cursor-pointer ${photo.ratio}`}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#08152F] to-[#050608] flex items-center justify-center relative">
                {photo.src ? (
                  <Image 
                    src={photo.src} 
                    alt={photo.label} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                  />
                ) : (
                  <div className="text-text-muted font-mono text-sm opacity-50 z-10">{photo.label} Placeholder</div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                
                {/* Decorative border */}
                <div className="absolute inset-4 border border-white/5 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-lg pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
