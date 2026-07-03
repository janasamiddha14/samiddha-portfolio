"use client";

import { motion } from "framer-motion";

/**
 * Footer — Cosmic quote and attribution
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[color:var(--color-border)] py-12"
      role="contentinfo"
    >
      {/* Subtle glow line at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(63,169,255,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container text-center">
        {/* Main quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-space text-xl md:text-2xl font-light text-starlight mb-2 italic"
        >
          "There are still mysteries waiting to be understood."
        </motion.blockquote>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto my-6 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(63,169,255,0.5), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Name & links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-space text-sm font-medium text-[color:var(--color-text-secondary)] mb-4">
            Samiddha Jana · Physics · {year}
          </p>

          <div className="flex items-center justify-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com/samiddhajana" },
              { label: "LinkedIn", href: "https://linkedin.com/in/samiddhajana" },
              { label: "Email", href: "mailto:samiddhajana@example.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-xs text-[color:var(--color-text-muted)] hover:text-electric-blue transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Physics equation decoration */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-mono text-[10px] text-[color:var(--color-text-muted)] mt-8 tracking-widest"
          aria-hidden="true"
        >
          Gμν + Λgμν = (8πG/c⁴) Tμν &nbsp;·&nbsp; (iℏγᵘ∂μ - mc)ψ = 0 &nbsp;·&nbsp; iℏ ∂Ψ/∂t = ĤΨ
        </motion.p>
      </div>
    </footer>
  );
}
