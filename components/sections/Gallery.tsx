"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Maximize2, X, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  description: string;
  ratio: string;
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Close lightbox on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, handleKeyDown]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const items = gridRef.current.children;

    gsap.fromTo(
      items,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const photos: PhotoItem[] = [
    {
      id: 1,
      src: "/gallery_1.jpg",
      title: "Fieldwork & Coastal Studies",
      category: "Field Portrait",
      location: "Bay of Bengal Coastline",
      description: "On-site environmental observations exploring marine fluid boundary layers and tidal shorelines.",
      ratio: "aspect-[4/5]",
    },
    {
      id: 2,
      src: "/gallery_2.jpg",
      title: "Wave Dissipation & Breakwaters",
      category: "Fluid Dynamics",
      location: "Digha Coastal Belt",
      description: "Study of hydrodynamic wave dissipation across riprap armor stone breakwaters.",
      ratio: "aspect-video",
    },
    {
      id: 3,
      src: "/gallery_3.jpg",
      title: "Intertidal Mangrove Ecosystem",
      category: "Ecology & Terrain",
      location: "Coastal Wetlands",
      description: "Ecological boundary survey documenting low-tide salt marsh vegetation and sediment deposition.",
      ratio: "aspect-[4/5]",
    },
    {
      id: 4,
      src: "/gallery_4.jpg",
      title: "Atmospheric & Marine Horizon",
      category: "Meteorology",
      location: "Open Water Horizon",
      description: "Observation of atmospheric marine layer transitions and overcast stratus formations.",
      ratio: "aspect-video",
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-electric-blue font-mono text-xs tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>09. Visuals & Fieldwork</span>
          </div>
          <h3 className="section-title gradient-text mb-4">Field Expeditions & Moments</h3>
          <p className="max-w-2xl text-text-secondary text-sm md:text-base leading-relaxed">
            A photographic chronicle of research travels, coastal expeditions, and natural phenomena across Bengal.
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-max">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`glass-card overflow-hidden group cursor-pointer relative ${photo.ratio} border border-border hover:border-electric-blue/40 transition-all duration-500 rounded-2xl`}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedPhoto(photo);
                }
              }}
            >
              {/* Image Container */}
              <div className="w-full h-full relative overflow-hidden bg-space-black">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Subtle Ambient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/95 via-space-black/40 to-transparent pointer-events-none" />

                {/* Top Bar: Category Pill & Zoom Icon */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-space-black/70 backdrop-blur-md border border-electric-blue/30 text-electric-blue shadow-sm">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-space-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-electric-blue group-hover:border-electric-blue/40 transition-all duration-300 shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Metadata Panel */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-space text-lg md:text-xl text-starlight font-medium mb-1.5 group-hover:text-electric-blue transition-colors">
                    {photo.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono mb-2">
                    <MapPin className="w-3 h-3 text-electric-blue/70 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <p className="text-text-secondary text-xs line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-space-black/90 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-starlight hover:text-electric-blue transition-all"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-electric-blue/30 shadow-2xl rounded-2xl"
            >
              {/* High-Res Image View */}
              <div className="relative w-full md:w-3/5 h-64 md:h-[520px] bg-space-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Information Sidebar */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#08152F]/70">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-4">
                    <span>{selectedPhoto.category}</span>
                  </div>

                  <h3 className="font-space text-2xl text-starlight font-semibold mb-3">
                    {selectedPhoto.title}
                  </h3>

                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono mb-6">
                    <MapPin className="w-3.5 h-3.5 text-electric-blue shrink-0" />
                    <span>{selectedPhoto.location}</span>
                  </div>

                  <div className="w-full h-[1px] bg-border mb-6" />

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {selectedPhoto.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-text-muted font-mono text-xs">
                  <span>Samiddha Jana</span>
                  <span className="text-electric-blue/80">Archival Record</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
