"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

/**
 * Navigation — Floating glass navigation bar
 * Glassmorphism design, auto-hides on scroll down, reveals on scroll up.
 * Highlights active section based on scroll position.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      // Hide when scrolling down, show when scrolling up
      if (currentY > lastScrollY.current + 10 && currentY > 120) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -80 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex flex-col leading-none group"
            aria-label="Go to top"
          >
            <span
              className="font-space font-semibold text-starlight text-base tracking-tight group-hover:text-electric-blue transition-colors duration-200"
            >
              Samiddha Jana
            </span>
            <span className="font-mono text-[10px] text-nebula-glow tracking-widest uppercase opacity-80">
              Physics
            </span>
          </button>

          {/* Desktop nav links */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="list"
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3 py-1.5 text-xs font-medium tracking-wide font-space transition-colors duration-200 rounded-md ${
                      isActive
                        ? "text-electric-blue"
                        : "text-[color:var(--color-text-secondary)] hover:text-starlight"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-electric-blue"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>


          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[color:var(--color-text-secondary)] hover:text-electric-blue transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 glass-nav flex flex-col pt-20 pb-8 px-6 lg:hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-2 flex-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left py-3 px-4 font-space text-base text-starlight hover:text-electric-blue transition-colors border-b border-[color:var(--color-border)]"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
