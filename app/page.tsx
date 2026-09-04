"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ResearchInterests from "@/components/sections/ResearchInterests";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import Timeline from "@/components/sections/Timeline";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import MouseTrail from "@/components/MouseTrail";
import { CosmicBackground } from "@/components/three/BlackHoleScene";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {/* Custom cursor trail */}
      <MouseTrail />

      {/* Global persistent 3D Spacetime & Cosmic Background across all sections */}
      <CosmicBackground />

      {/* Cinematic loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main content */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {/* Floating glass navigation */}
        <Navigation />

        <main id="main-content" role="main">
          {/* Full-screen immersive hero with Three.js black hole */}
          <section id="home">
            <Hero />
          </section>

          {/* About — researcher introduction */}
          <section id="about">
            <About />
          </section>

          {/* Research Interests — animated cards */}
          <section id="research">
            <ResearchInterests />
          </section>

          {/* Experience — elegant timeline */}
          <section id="experience">
            <Experience />
          </section>

          {/* Projects — futuristic card grid */}
          <section id="projects">
            <Projects />
          </section>

          {/* Skills — animated circular/bar visualization */}
          <section id="skills">
            <Skills />
          </section>

          {/* Education — animated timeline */}
          <section id="education">
            <Education />
          </section>

          {/* Achievements — elegant cards */}
          <section id="achievements">
            <Achievements />
          </section>

          {/* Interactive vertical timeline */}
          <section id="timeline">
            <Timeline />
          </section>

          {/* Team / Collaborators */}
          <section id="team">
            <Team />
          </section>

          {/* Photo gallery */}
          <section id="gallery">
            <Gallery />
          </section>

          {/* Contact */}
          <section id="contact">
            <Contact />
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
