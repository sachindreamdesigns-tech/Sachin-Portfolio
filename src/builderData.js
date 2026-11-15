// Content for the BUILDER (developer) side of the coin.
// Lines marked "TODO" are placeholders for you to fill in.

export const builderNav = [
  { label: "Home", to: "/builder" },
  { label: "About", to: "/builder/about" },
  { label: "Projects", to: "/builder/projects" },
  { label: "Stack", to: "/builder/stack" },
  { label: "Lab", to: "/builder/lab" },
  { label: "Contact", to: "/builder/contact" },
];

export const builderHero = {
  lines: ["I DON'T", "JUST DESIGN.", "I SHIP."],
  sub: "Same person, louder volume. I take my own designs from Figma to production React, so nothing gets lost in handoff.",
};

export const marquee = ["REACT", "JAVASCRIPT", "TAILWIND", "MERN", "DESIGN TOKENS", "AI WORKFLOWS", "VERCEL", "GIT"];

export const builderStats = [
  { value: "1+", label: "year shipping React in production" },
  { value: "5", label: "apps I designed and built" },
  { value: "0", label: "handoff gaps" },
  { value: "4", label: "pharma compliance certifications" },
];

// Development projects only. `code` = link to repo, `live` = link to live site.
export const devProjects = [
  {
    slug: "investigation-ai",
    title: "Investigation AI",
    tag: "Pharma · AI",
    year: "2025 – present",
    summary: "The React frontend of an AI-assisted tool for investigating manufacturing deviations, with every response captured in the audit trail.",
    stack: ["React", "HTML", "CSS", "Database integration"],
    did: { design: true, frontend: true, backend: false },
    nda: true,
    sections: [
      { heading: "What it does", body: "Helps investigators identify deviations in pharmaceutical manufacturing. They can focus on the interview while the tool records every documented response." },
      { heading: "What I built", body: "I designed the app end to end and built the frontend in React. I worked with the McKinsey team to connect the frontend to the underlying database." },
      { heading: "Engineering for compliance", body: "In pharma, the UI is part of the quality system. Records need to be attributable, timestamped and never silently overwritten, which shapes how forms, edits and history are built. See the audit trail demo in the Lab." },
    ],
  },
  {
    slug: "continuous-process-verification",
    title: "Online Continuous Process Verification",
    tag: "Pharma · Manufacturing data",
    year: "2025 – present",
    summary: "An application that lets teams continuously verify that manufacturing processes stay in a state of control.",
    stack: ["React", "HTML", "CSS"],
    did: { design: true, frontend: true, backend: false },
    nda: true,
    sections: [
      { heading: "What it does", body: "Continuous process verification means watching process data on an ongoing basis to show a manufacturing process stays in control. This app brings that monitoring online." },
      { heading: "What I built", body: "Design and development of the application. TODO: add what you can share (screens, data views, your part of the build)." },
    ],
  },
  {
    slug: "equipment-reliability",
    title: "Equipment Reliability",
    tag: "Pharma · Operations",
    year: "2025 – present",
    summary: "An application for tracking the reliability of manufacturing equipment.",
    stack: ["React", "HTML", "CSS"],
    did: { design: true, frontend: true, backend: false },
    nda: true,
    sections: [
      { heading: "What I built", body: "Application design and frontend development. TODO: add what you can share." },
    ],
  },
  {
    slug: "data-observability",
    title: "Data Observability Platform",
    tag: "Internal tool · Data",
    year: "2025 – present",
    summary: "An internal platform that monitors data health and usage across systems. I designed and built it end to end.",
    stack: ["React", "Data visualisation"],
    did: { design: true, frontend: true, backend: false },
    nda: true,
    sections: [
      { heading: "What it does", body: "Gives teams one place to see whether data across systems is healthy and how it's being used." },
      { heading: "What I built", body: "Everything from the dashboards and data visualisation to the React frontend. TODO: add what you can share about the architecture." },
    ],
  },
  {
    slug: "eldercare-pwa",
    title: "Eldercare & Aid PWA",
    tag: "Healthcare · PWA",
    year: "2024",
    summary: "A progressive web app for eldercare that I designed and developed: accessible for seniors, practical for caregivers.",
    stack: ["Progressive Web App", "JavaScript"],
    did: { design: true, frontend: true, backend: false },
    designLink: "/projects/care",
    sections: [
      { heading: "What it does", body: "Gives elderly users a calm, accessible interface and gives caregivers simple tools to manage their care." },
      { heading: "Why a PWA", body: "It installs from the browser like an app, so seniors and caregivers can use it on any phone without an app-store download." },
      { heading: "What I built", body: "I researched, designed, prototyped and tested the experience, then developed it. TODO: add your stack and a screenshot." },
    ],
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    tag: "Open source · Full stack",
    year: "2026",
    summary: "The site you're on. Two sides of one coin, designed and coded from scratch, with a serverless backend.",
    stack: ["React 19", "Vite", "CSS design tokens", "Vercel Functions", "Resend"],
    did: { design: true, frontend: true, backend: true },
    code: "https://github.com/sachindreamdesigns-tech",
    sections: [
      { heading: "The idea", body: "Recruiters get a clean, minimal portfolio by default. Anyone curious can flip the coin and see the developer side. Each page flips to its counterpart, so About becomes About and Projects becomes Projects." },
      { heading: "How it's built", body: "React with a tiny custom router, so there are no extra dependencies. Colours, spacing and radii are CSS design tokens with light and dark themes. The builder side is code-split and only downloads when someone flips, so the first page stays fast." },
      { heading: "The backend", body: "The contact form posts to a Vercel serverless function that validates input, blocks bots with a honeypot field, and emails me through Resend." },
      { heading: "Accessibility", body: "Keyboard focus styles, a skip link, semantic landmarks, and the coin animation turns off for visitors who prefer reduced motion." },
    ],
  },
];

export const journey = [
  { when: "2017 – 2021", title: "Engineering student", body: "Electronics & Communication at Don Bosco Institute of Technology. My final-year disease prediction app was recognised by VTU." },
  { when: "2021 – 2023", title: "The bridge at Cognizant", body: "Led 6 designers and worked as the bridge between design and development. Wrote the specs and style guides developers built from." },
  { when: "2024 – 2025", title: "AI meets UI at Geekyants", body: "Designed generative-AI and data-visualisation interfaces, and gave a talk on how AI is changing UI/UX." },
  { when: "Dec 2025 →", title: "Shipping React at Strides", body: "Now I design pharma tools and build their frontends myself, in React, HTML and CSS." },
  { when: "Next", title: "Full stack", body: "Going deeper into the MERN stack, APIs and AI-assisted development." },
];

export const principles = [
  { title: "Tokens, not hex codes", body: "Colours, spacing and type live in one place, so the design system and the code never drift apart." },
  { title: "Components first", body: "I design in the same components I build, with atomic design from Figma to React." },
  { title: "Accessible by default", body: "Semantic HTML, keyboard support and contrast are part of done, not a later ticket." },
  { title: "Compliance is UX", body: "In regulated software, audit trails and validation are part of the experience. I design them in from day one." },
];

export const stack = [
  {
    group: "Frontend",
    items: [
      { name: "React", level: "Daily" },
      { name: "JavaScript", level: "Daily" },
      { name: "HTML & CSS", level: "Daily" },
      { name: "Tailwind CSS", level: "Comfortable" },
      { name: "Responsive design", level: "Daily" },
      { name: "Component architecture", level: "Comfortable" },
    ],
  },
  {
    group: "Backend & data",
    items: [
      { name: "API integration", level: "Comfortable" },
      { name: "Node.js / Express", level: "Working knowledge" },
      { name: "MongoDB", level: "Working knowledge" },
      { name: "Serverless functions", level: "Comfortable" },
    ],
  },
  {
    group: "Workflow",
    items: [
      { name: "Git & GitHub", level: "Daily" },
      { name: "Vercel", level: "Comfortable" },
      { name: "Lovable", level: "Comfortable" },
      { name: "Claude & Gemini for coding", level: "Daily" },
    ],
  },
  {
    group: "Design → code",
    items: [
      { name: "Figma", level: "Daily" },
      { name: "Design tokens", level: "Daily" },
      { name: "Atomic design", level: "Daily" },
      { name: "Framer", level: "Comfortable" },
      { name: "Spline (3D)", level: "Comfortable" },
    ],
  },
];

// Items orbiting you in the showreel ring. type: "work" (project image), "tool", "type", "colors", "code", "note".
export const reelRing = [
  { type: "work", slug: "finance", label: "Money Transfer" },
  { type: "type", label: "Archivo · 900" },
  { type: "tool", icon: "react", label: "React" },
  { type: "work", slug: "real-estate", label: "Property Snagging" },
  { type: "colors", label: "Tokens", colors: ["#2563EB", "#F59E0B", "#0F1D4A", "#FFFFFF"] },
  { type: "tool", icon: "figma", label: "Figma" },
  { type: "work", slug: "football-simulation-game", label: "Soccerverse" },
  { type: "code", label: "<Button />" },
  { type: "tool", icon: "tailwind", label: "Tailwind" },
  { type: "work", slug: "care", label: "Eldercare PWA" },
  { type: "note", label: "ALCOA+", sub: "audit-ready UI" },
  { type: "tool", icon: "git", label: "Git" },
  { type: "work", slug: "hotel", label: "Dine-in 3D + AI" },
  { type: "note", label: "8pt", sub: "spacing grid" },
];
