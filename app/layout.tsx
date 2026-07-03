import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Samiddha Jana — Theoretical Physics",
  description:
    "Personal portfolio of Samiddha Jana, a physics undergraduate passionate about theoretical high-energy physics, quantum field theory, general relativity, and cosmology. Aspiring researcher at CERN, TIFR, IISc, and beyond.",
  keywords: [
    "Samiddha Jana",
    "theoretical physics",
    "high-energy physics",
    "quantum field theory",
    "general relativity",
    "cosmology",
    "black holes",
    "quantum computing",
    "physics researcher",
    "IISc",
    "TIFR",
  ],
  authors: [{ name: "Samiddha Jana" }],
  creator: "Samiddha Jana",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Samiddha Jana — Theoretical Physics",
    description:
      "Physics undergraduate exploring the deepest structure of reality. Theoretical high-energy physics, QFT, GR, and cosmology.",
    siteName: "Samiddha Jana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samiddha Jana — Theoretical Physics",
    description:
      "Physics undergraduate exploring the deepest structure of reality.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Samiddha Jana",
              jobTitle: "Physics Undergraduate",
              description:
                "Theoretical physics researcher interested in high-energy physics, QFT, and cosmology.",
              url: "https://samiddhajana.com",
              sameAs: [
                "https://github.com/samiddhajana",
                "https://linkedin.com/in/samiddhajana",
              ],
              knowsAbout: [
                "Theoretical Physics",
                "Quantum Field Theory",
                "General Relativity",
                "Cosmology",
                "Quantum Computing",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-space-black antialiased">
        {children}
      </body>
    </html>
  );
}
