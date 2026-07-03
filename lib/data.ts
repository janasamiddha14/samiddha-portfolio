// ============================================================
// lib/data.ts — All portfolio content for Samiddha Jana
// ============================================================

export const personal = {
  name: "Samiddha Jana",
  title: "Physics Undergraduate",
  subtitle: "Theoretical High-Energy Physics",
  institution: "Institute of Physics",
  email: "samiddhajana@example.com",
  github: "https://github.com/samiddhajana",
  linkedin: "https://linkedin.com/in/samiddhajana",
  googleScholar: "#",
  orcid: "#",
  researchGate: "#",
  cvUrl: "/samiddha-jana-cv.pdf",
  tagline: "Seeking the deepest structure of reality.",
};

export const hawkingQuote = {
  lines: [
    "Remember to look up at the stars and not down at your feet.",
    "Try to make sense of what you see, and wonder about what makes the universe exist.",
    "Be curious.",
  ],
  attribution: "— Stephen Hawking",
};

export const aboutText = {
  intro: `My name is Samiddha Jana. I am a physics undergraduate drawn by an unrelenting curiosity about the deepest structure of the universe. My work sits at the intersection of theoretical high-energy physics, mathematical elegance, and the fundamental questions that have captivated humanity's greatest minds.`,

  extended: `I am captivated by the idea that the universe can be described — perhaps in its entirety — through the language of mathematics. From the curvature of spacetime to the quantum fields that pervade the vacuum, I seek to understand these phenomena from first principles. My intellectual heroes are Einstein, Dirac, Feynman, Penrose, Hawking, and Weinberg — thinkers who did not merely describe nature, but illuminated its inner logic.`,

  philosophy: `I believe physics is humanity's deepest and most honest attempt to understand reality. Every equation we write is a conversation with the cosmos; every experiment a question posed to nature. My aspiration is to contribute, however modestly, to this ongoing dialogue — to work at institutions such as CERN, TIFR, IISc, MIT, or Princeton, and to push the boundaries of what is known.`,

  closing: `When I am not working through field theory or differential geometry, I find wonder in connecting seemingly unrelated areas of mathematics and physics — a practice that I believe is at the heart of every major discovery in theoretical science.`,
};

export const researchInterests = [
  {
    id: "hep-th",
    title: "Theoretical High-Energy Physics",
    icon: "⚛️",
    description:
      "Exploring the fundamental constituents of matter and energy, the symmetries governing their interactions, and the mathematical structures underlying our best theories of nature.",
    keywords: ["Standard Model", "Beyond SM", "Symmetry Breaking", "Gauge Theories"],
  },
  {
    id: "qft",
    title: "Quantum Field Theory",
    icon: "∮",
    description:
      "The framework unifying special relativity with quantum mechanics. I am particularly interested in renormalization, effective field theories, and the path integral formalism.",
    keywords: ["Renormalization Group", "Path Integrals", "Feynman Diagrams", "Effective Theories"],
  },
  {
    id: "gr",
    title: "General Relativity",
    icon: "🌀",
    description:
      "Einstein's geometric theory of gravitation — spacetime curvature, geodesics, gravitational waves, and the profound connection between geometry and physics.",
    keywords: ["Spacetime Geometry", "Einstein Equations", "Geodesics", "Gravitational Waves"],
  },
  {
    id: "cosmology",
    title: "Cosmology",
    icon: "🌌",
    description:
      "The large-scale structure and evolution of the universe — from the Big Bang and cosmic inflation to dark energy and the ultimate fate of the cosmos.",
    keywords: ["CMB", "Inflation", "Dark Energy", "Large-Scale Structure"],
  },
  {
    id: "black-holes",
    title: "Black Holes & Singularities",
    icon: "◉",
    description:
      "The most extreme objects in the universe, where general relativity meets quantum mechanics. Hawking radiation, information paradox, and singularity theorems.",
    keywords: ["Hawking Radiation", "Event Horizons", "Information Paradox", "Penrose Diagrams"],
  },
  {
    id: "qi",
    title: "Quantum Information",
    icon: "⟨ψ|",
    description:
      "The study of information processing using quantum mechanical phenomena — entanglement, superposition, and their deep connections to black hole physics and holography.",
    keywords: ["Entanglement", "Quantum Error Correction", "Holography", "ER=EPR"],
  },
  {
    id: "qc",
    title: "Quantum Computing",
    icon: "⟩",
    description:
      "Harnessing quantum superposition and entanglement for computation. I am interested in quantum algorithms, near-term devices, and connections to fundamental physics.",
    keywords: ["Quantum Algorithms", "NISQ Devices", "Quantum Simulation", "Variational Methods"],
  },
  {
    id: "math-phys",
    title: "Mathematical Physics",
    icon: "∂",
    description:
      "The rigorous mathematical structures underlying physical theories — differential geometry, Lie algebras, topology, and their role in modern theoretical physics.",
    keywords: ["Differential Geometry", "Lie Groups", "Topology", "Fiber Bundles"],
  },
  {
    id: "cmt",
    title: "Condensed Matter Theory",
    icon: "⬡",
    description:
      "Emergent phenomena in many-body quantum systems — superconductivity, topological phases, and connections to high-energy physics through field theoretic methods.",
    keywords: ["Topological Phases", "Many-Body Physics", "Field Theory Methods", "Emergence"],
  },
  {
    id: "astro",
    title: "Astrophysics",
    icon: "✦",
    description:
      "Bridging theoretical frameworks with observational astronomy — neutron stars, compact objects, gravitational wave sources, and high-energy astrophysical phenomena.",
    keywords: ["Neutron Stars", "Compact Objects", "GW Astronomy", "High-Energy Phenomena"],
  },
];

export const experiences = [
  {
    id: "photonics-lab",
    role: "Research Visitor",
    organization: "Photonics Laboratory",
    period: "2024",
    description:
      "Visited and worked in a photonics research laboratory, gaining hands-on experience with optical instrumentation and experimental techniques relevant to quantum optics and photon detection.",
    type: "research",
    tags: ["Photonics", "Optics", "Experimental Physics"],
  },
  {
    id: "mos2-research",
    role: "Research Participant",
    organization: "Materials & Device Physics Group",
    period: "2023–2024",
    description:
      "Contributed to research on MoS₂-based photodetectors, investigating the optoelectronic properties of two-dimensional transition metal dichalcogenides and their applications in next-generation photosensing devices.",
    type: "research",
    tags: ["2D Materials", "MoS₂", "Photodetectors", "Optoelectronics"],
  },
];

export const workshops = [
  {
    id: "iisc-winter",
    title: "Winter School on Theoretical Physics",
    institution: "Indian Institute of Science (IISc), Bengaluru",
    period: "Winter 2024",
    description:
      "Intensive winter school covering advanced topics in theoretical physics, including quantum field theory, general relativity, and their mathematical underpinnings. Engaged with leading researchers across India.",
    type: "school",
    tags: ["QFT", "GR", "Theoretical Physics"],
  },
  {
    id: "iit-kgp-qc",
    title: "Quantum Computing Workshop",
    institution: "Indian Institute of Technology Kharagpur",
    period: "2024",
    description:
      "Hands-on workshop introducing quantum computing principles, quantum gates, quantum algorithms (Grover, Shor), and near-term applications on quantum hardware. Practical sessions on quantum circuit simulation.",
    type: "workshop",
    tags: ["Quantum Computing", "Quantum Algorithms", "Qubits"],
  },
];

export const projects = [
  {
    id: "mos2-photodetector",
    title: "MoS₂ Photodetector Research",
    status: "active",
    description:
      "Investigating the photoresponse of monolayer and few-layer molybdenum disulfide (MoS₂) devices. Analyzing photocurrent generation mechanisms, gain, and spectral selectivity in 2D semiconductor photodetectors.",
    tags: ["MoS₂", "2D Materials", "Photodetectors", "Optoelectronics", "TMDs"],
    icon: "◈",
  },
  {
    id: "qc-algorithms",
    title: "Quantum Algorithm Simulation",
    status: "active",
    description:
      "Implementing and studying quantum algorithms using classical simulation frameworks. Focus on variational quantum eigensolvers (VQE) and their application to condensed matter problems.",
    tags: ["Quantum Computing", "VQE", "Python", "Qiskit"],
    icon: "⟨ψ|",
  },
  {
    id: "gr-numerical",
    title: "Numerical Relativity Explorations",
    status: "planned",
    description:
      "Planned project to numerically solve Einstein's field equations in simplified settings — studying black hole spacetimes, geodesic structure, and gravitational wave signatures.",
    tags: ["General Relativity", "Numerical Methods", "Python", "Simulation"],
    icon: "∇",
  },
  {
    id: "qft-lattice",
    title: "Lattice Field Theory Simulations",
    status: "planned",
    description:
      "Future research direction: studying quantum field theories defined on discrete spacetime lattices, with a focus on non-perturbative phenomena in gauge theories.",
    tags: ["QFT", "Lattice Gauge Theory", "Monte Carlo", "HPC"],
    icon: "⬡",
  },
  {
    id: "future-publication",
    title: "Future Research Publication",
    status: "placeholder",
    description:
      "Placeholder for upcoming research work. Results and preprint link will be added upon completion of ongoing theoretical investigations.",
    tags: ["Preprint Pending", "arXiv"],
    icon: "📝",
  },
];

export const skills = [
  {
    category: "Physics",
    items: [
      { name: "Quantum Mechanics", level: 90 },
      { name: "Classical Mechanics", level: 92 },
      { name: "Electrodynamics", level: 88 },
      { name: "Statistical Mechanics", level: 85 },
      { name: "Quantum Field Theory", level: 72 },
      { name: "General Relativity", level: 75 },
    ],
  },
  {
    category: "Mathematics",
    items: [
      { name: "Real & Complex Analysis", level: 88 },
      { name: "Differential Geometry", level: 78 },
      { name: "Linear Algebra", level: 92 },
      { name: "Group Theory", level: 80 },
      { name: "Topology", level: 70 },
      { name: "PDEs", level: 82 },
    ],
  },
  {
    category: "Programming",
    items: [
      { name: "Python", level: 85 },
      { name: "LaTeX", level: 90 },
      { name: "Mathematica", level: 75 },
      { name: "Qiskit", level: 65 },
      { name: "MATLAB", level: 60 },
      { name: "C++", level: 55 },
    ],
  },
  {
    category: "Research",
    items: [
      { name: "Scientific Writing", level: 82 },
      { name: "Literature Review", level: 85 },
      { name: "Data Analysis", level: 78 },
      { name: "Problem Solving", level: 90 },
      { name: "Critical Thinking", level: 92 },
      { name: "Laboratory Skills", level: 72 },
    ],
  },
];

export const education = [
  {
    id: "bsc",
    degree: "B.Sc. in Physics",
    institution: "Your University",
    period: "2022 – Present",
    description:
      "Pursuing an undergraduate degree in Physics with focus on theoretical physics. Coursework spans classical mechanics, quantum mechanics, electrodynamics, statistical mechanics, mathematical methods, and introductory quantum field theory.",
    achievements: ["CGPA: Update here", "Relevant Coursework in QFT, GR"],
    current: true,
  },
  {
    id: "higher-secondary",
    degree: "Higher Secondary (12th)",
    institution: "Your School",
    period: "2020 – 2022",
    description:
      "Completed higher secondary education with Physics, Chemistry, and Mathematics. Qualified in JEE Advanced and other national-level competitive examinations.",
    achievements: ["JEE Advanced Qualified", "Strong foundation in Mathematics and Physics"],
    current: false,
  },
];

export const achievements = [
  {
    id: "jee",
    title: "JEE Advanced Qualified",
    year: "2022",
    description:
      "Successfully cleared the Joint Entrance Examination (JEE) Advanced — one of the most competitive engineering entrance examinations globally — demonstrating strong aptitude in Physics, Chemistry, and Mathematics.",
    icon: "🎓",
    category: "Academic",
  },
  {
    id: "iisc-selection",
    title: "Selected for IISc Winter School",
    year: "2024",
    description:
      "Competitively selected to attend the Winter School on Theoretical Physics at the Indian Institute of Science, Bengaluru — India's premier research institution.",
    icon: "✦",
    category: "Academic",
  },
  {
    id: "iit-kgp-workshop",
    title: "IIT Kharagpur Quantum Computing Workshop",
    year: "2024",
    description:
      "Selected participant at the quantum computing workshop organized by IIT Kharagpur, covering advanced topics in quantum information and quantum algorithms.",
    icon: "⚛️",
    category: "Academic",
  },
  {
    id: "research-work",
    title: "Undergraduate Research — MoS₂ Photodetectors",
    year: "2023–2024",
    description:
      "Contributed to active research on two-dimensional semiconductor photodetectors, gaining experience in experimental condensed matter physics alongside theoretical studies.",
    icon: "◈",
    category: "Research",
  },
];

export const teamMembers = [
  {
    id: "advisor",
    name: "Research Supervisor",
    role: "Principal Investigator",
    institution: "Your Institution",
    field: "Experimental/Theoretical Physics",
    placeholder: true,
  },
  {
    id: "collaborator-1",
    name: "Future Collaborator",
    role: "PhD Researcher",
    institution: "IISc / TIFR / IIT",
    field: "Theoretical High-Energy Physics",
    placeholder: true,
  },
  {
    id: "collaborator-2",
    name: "Future Collaborator",
    role: "Postdoctoral Fellow",
    institution: "CERN / MIT / Princeton",
    field: "Quantum Field Theory",
    placeholder: true,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Timeline", href: "#timeline" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const timelineEvents = [
  {
    year: "2022",
    title: "JEE Advanced",
    subtitle: "National Examination",
    description: "Cleared JEE Advanced, opening pathways to India's premier institutions.",
    type: "exam",
  },
  {
    year: "2022",
    title: "B.Sc. Physics Begins",
    subtitle: "Undergraduate Admission",
    description: "Commenced undergraduate studies in Physics, beginning a journey toward theoretical research.",
    type: "education",
  },
  {
    year: "2023",
    title: "MoS₂ Research",
    subtitle: "Research Participation",
    description: "Joined research group working on MoS₂ photodetectors, first exposure to active research.",
    type: "research",
  },
  {
    year: "2024",
    title: "IIT Kharagpur — Quantum Computing Workshop",
    subtitle: "Workshop",
    description: "Attended intensive quantum computing workshop at IIT Kharagpur.",
    type: "workshop",
  },
  {
    year: "2024",
    title: "Photonics Laboratory Visit",
    subtitle: "Research Visit",
    description: "Visited photonics lab, gaining exposure to cutting-edge optical research.",
    type: "visit",
  },
  {
    year: "2024",
    title: "IISc Bengaluru — Winter School",
    subtitle: "Winter School on Theoretical Physics",
    description: "Selected for the prestigious Winter School at IISc, engaging with leading theoretical physicists.",
    type: "school",
  },
  {
    year: "2025 →",
    title: "The Journey Continues",
    subtitle: "Future",
    description: "Actively preparing for research opportunities at TIFR, IISc, IIT, and international institutions.",
    type: "future",
  },
];

export const equations = [
  {
    label: "Einstein Field Equations",
    latex: "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}",
    display: "Gμν + Λgμν = (8πG/c⁴) Tμν",
  },
  {
    label: "Dirac Equation",
    latex: "(i\\hbar\\gamma^\\mu \\partial_\\mu - mc)\\psi = 0",
    display: "(iℏγᵘ∂μ - mc)ψ = 0",
  },
  {
    label: "Schrödinger Equation",
    latex: "i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi",
    display: "iℏ ∂Ψ/∂t = ĤΨ",
  },
  {
    label: "Feynman Path Integral",
    latex: "\\langle q_f | e^{-iHt/\\hbar} | q_i \\rangle = \\int \\mathcal{D}q\\, e^{iS[q]/\\hbar}",
    display: "⟨qf|e^{-iHt/ℏ}|qi⟩ = ∫𝒟q e^{iS/ℏ}",
  },
];
