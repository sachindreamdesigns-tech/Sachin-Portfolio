// All site content lives here. Edit this file to update text, projects and links.
// Lines marked "TODO" are placeholders for you to fill in.

// Images currently load from your old Framer site. Before you cancel Framer, download them
// into /public/work/ and change the paths (see README).
const F = (id) => `https://framerusercontent.com/images/${id}`;

export const profile = {
  name: "Sachin M",
  title: "Product Designer & Frontend Developer",
  location: "Bengaluru, Karnataka, India",
  relocation: "Open to UAE, Netherlands, Luxembourg & remote",
  email: "sachindreamdesigns@gmail.com",
  phone: "+91 80731 46917",
  phoneHref: "tel:+918073146917",
  linkedin: "https://www.linkedin.com/in/sachin2707/",
  behance: "https://www.behance.net/sachinm17",
  github: "https://github.com/sachindreamdesigns-tech",
  instagram: "", // TODO: your Instagram profile URL (leave empty to hide)
  resume: "/Sachin_Resume.pdf",
  talk: "https://www.youtube.com/", // TODO: link to your "AI Impact on UI/UX Design" talk
  photo: F("Ufb8dlyqg3aFluttEX8dGZS0s.jpg"),
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Education", to: "/education" },
  { label: "Lab", to: "/lab" },
  { label: "Contact", to: "/contact" },
];

export const hero = {
  eyebrow: "Product Designer · Frontend Developer",
  headline: "I design products and ship them in React.",
  sub: "5 years designing regulated pharma, fintech and enterprise products, from user research to production code.",
};

// What the designer doodle says when someone clicks "Let me introduce myself".
export const introScript = [
  "Hi, I'm Sachin, a product designer from Bengaluru.",
  "For five years I've designed for pharma, fintech and enterprise teams at Strides, Geekyants and Cognizant.",
  "Here's my twist: I also build what I design, in React.",
  "Scroll down to see my work, or flip the coin to meet my builder side.",
];

export const heroDevSkills = ["React", "JavaScript", "Tailwind CSS", "HTML & CSS", "Git", "APIs"];

export const stats = [
  { value: "5", label: "years designing products" },
  { value: "20+", label: "projects delivered" },
  { value: "15+", label: "happy clients" },
  { value: "6", label: "designers led at Cognizant" },
];

export const about = {
  intro: "Hi, I'm Sachin. I design digital products, and then I build them.",
  paragraphs: [
    "For the past 5 years I've designed for pharma, fintech, healthcare, real estate, sports and gaming, at Cognizant, Geekyants and now Strides Pharma. Over the last year I've moved closer to code, building the frontends of my own designs in React.",
    "My process is a bit like cooking. Research is shopping for the right ingredients, wireframes are the prep, and the interface is the dish. It has to be functional, but it should also be fun to use.",
    "I studied Electronics & Communication engineering, and that's where my love for precision comes from. I bring it to design systems, accessibility and the small details that make a product feel finished.",
  ],
  values: [
    { title: "Research first", body: "Contextual inquiries, usability tests and heuristic reviews before a single pixel." },
    { title: "Design to code", body: "I design with real components in mind and build them myself in React." },
    { title: "Built to comply", body: "Comfortable in regulated spaces: GAMP 5, CSV, ALCOA+ and fintech compliance." },
  ],
};

export const skills = [
  { group: "Product design", items: ["UI design", "Interaction design", "Design systems", "Atomic design", "Information architecture", "Prototyping"] },
  { group: "Research", items: ["Usability testing", "Contextual inquiry", "Heuristic evaluation", "Personas", "Affinity mapping", "Design thinking workshops"] },
  { group: "Frontend", items: ["React", "JavaScript", "HTML & CSS", "Tailwind CSS", "Git", "API integration"] },
  { group: "Leadership", items: ["Design leadership", "Project management", "Client management", "Mentoring juniors"] },
];

export const tools = ["Figma", "Framer", "Claude", "Gemini", "Lovable", "Spline", "Dora 3D", "Adobe CC", "InVision"];

// ---------- PROJECTS ----------
// `featured: true` shows on the home page. Slugs match your old Framer URLs.
export const projects = [
  {
    slug: "investigation-ai",
    title: "Investigation AI",
    industry: "Pharma · AI",
    client: "Strides Pharma",
    service: "Design + Frontend",
    year: "2025 – present",
    featured: true,
    nda: true,
    summary: "An AI-assisted tool that helps investigators identify deviations in pharma manufacturing, without losing a single response from the audit trail.",
    images: [],
    sections: [
      { heading: "The problem", body: "Deviation investigations in pharma manufacturing are interview-heavy and documentation-heavy. Investigators had to split their attention between talking to people and recording every answer, and every record has to stand up to an audit." },
      { heading: "Constraints", body: "Everything had to meet GAMP 5 and Computer System Validation expectations and follow ALCOA+ data-integrity principles, with a complete audit trail." },
      { heading: "What I did", body: "I owned the end-to-end design, from information architecture and user flows to high-fidelity prototypes, then helped build the frontend in React. I worked with the McKinsey team to connect the frontend to the underlying database." },
      { heading: "The result", body: "Investigators can focus on the interview while the tool captures every documented response in the audit trail. The project supports Strides' Lighthouse certification initiative." },
    ],
    note: "This project is under NDA and still in progress, so screens aren't shown yet.",
  },
  {
    slug: "finance",
    title: "Money Transfer Platform",
    industry: "Fintech",
    client: "Fintech client, Dubai",
    service: "Web and admin application",
    year: "2024",
    featured: true,
    metric: { value: "+35%", label: "task completion rate" },
    summary: "A secure, user-centric remittance platform for customers and financial entities, with an admin side to run it.",
    images: [F("s5TyXmmpcVJOdJs2kqG5QoVWbOg.png"), F("g3lRVWRyfDAeAboGb38KucmgUA.png")],
    sections: [
      { heading: "The problem", body: "Remittance users needed to move money across borders quickly and with confidence, through workflows that are complex and heavily regulated." },
      { heading: "Research", body: "I ran a competitive analysis of 10+ existing platforms to find pain points and market gaps, then built user personas, journey maps and the information architecture for the core financial workflows." },
      { heading: "Design", body: "I designed an intuitive, secure platform with new features for transactions between customers and entities. Usability, accessibility and smooth user flows came first, for a diverse user base." },
      { heading: "The result", body: "The new interface improved task completion rates by 35%." },
    ],
  },
  {
    slug: "real-estate",
    title: "Property Snagging Tool",
    industry: "Real estate · Web app",
    client: "Real estate client, Australia",
    service: "Design",
    year: "2024",
    featured: true,
    metric: { value: "+40%", label: "user engagement" },
    summary: "A web app that makes post-construction inspections simple, so inspectors and contractors find and fix defects faster.",
    images: [F("2m0XY7W0qqC4CcfEacDB9kL00.png"), F("4Hv7IhiYo4cVFkNdxcuJaxCICnU.png")],
    sections: [
      { heading: "The problem", body: "Post-construction inspections involve inspectors and contractors passing defects back and forth. The existing process made it hard to log, find and resolve issues." },
      { heading: "Research", body: "I ran user research with inspectors and contractors to map their pain points, then explored solutions through wireframes and prototypes in Figma and InVision, working closely with a cross-functional team." },
      { heading: "The result", body: "A clean, responsive interface for desktop and mobile that improved navigation and features, and increased user engagement by 40%. Teams can now identify defects efficiently and keep quality high." },
    ],
  },
  {
    slug: "care",
    title: "Eldercare & Aid App",
    industry: "Healthcare",
    client: "External client",
    service: "Progressive web app · Design + Development",
    year: "2024",
    featured: true,
    summary: "A progressive web app that gives elderly users a calm, accessible interface and gives caregivers simple tools to manage their care.",
    images: [F("wlsiXmObWK524GSCONdoPPQDU.png"), F("OQNzTpOVj02F6yANv6GugxyOI.png")],
    sections: [
      { heading: "The problem", body: "Most health apps assume sharp eyesight, steady hands and comfort with technology. Elderly users need something calmer and clearer, and caregivers need to manage everything in one place." },
      { heading: "Process", body: "I did in-depth research and mapped the journeys of both seniors and caregivers, then prioritised simplicity, clarity and usability. Designs were prototyped, tested and iterated before I built the app." },
      { heading: "The result", body: "A low-stress experience that improves quality of life for seniors and makes caregivers' work easier." },
    ],
  },
  {
    slug: "data-observability",
    title: "Data Observability Platform",
    industry: "Pharma · Internal tool",
    client: "Strides Pharma",
    service: "Design + Development",
    year: "2025 – present",
    nda: true,
    summary: "An internal platform that monitors data health and usage across systems, which I designed and built end to end.",
    images: [],
    sections: [
      { heading: "The problem", body: "Teams needed one place to see whether data across systems was healthy and how it was being used." },
      { heading: "What I did", body: "I led the design and development of the platform end to end, from dashboards and data visualisation to the React frontend." },
    ],
    note: "Internal tool. Screens aren't shown yet.",
  },
  {
    slug: "football-simulation-game",
    title: "Football Simulation Game",
    industry: "Gaming",
    client: "Soccerverse, UK",
    service: "Game UI/UX",
    year: "2025",
    featured: true,
    summary: "A data-driven football management game built on one idea: information at a glance, depth on demand.",
    images: [F("7RpCMfWc44akkDBGupOQ836uY4.png"), F("82SI0BZ1yd9nl3e5blBfwVGlTA8.png")],
    sections: [
      { heading: "The idea", body: "Football management games are full of data. The design principle was \"information at a glance, depth on demand\": show what matters first, and let players dig in when they want to." },
      { heading: "Visual direction", body: "A dark theme with dynamic team colours and sports-broadcast styling, so every club feels like its own." },
      { heading: "What I designed", body: "A customisable dashboard showing match results, player condition and performance, which leads into squad management with drag-and-drop formation builders, live match simulation with real-time tactical views, a transfer system with scout networks and AI-powered negotiations, and club finance and development tools." },
    ],
  },
  {
    slug: "hotel",
    title: "Dine-in App with 3D & AI",
    industry: "Food & entertainment",
    client: "External client",
    service: "Mobile app",
    year: "2024",
    summary: "A mobile app for a food delivery platform with 3D elements and an AI chatbot for restaurant owners and customers.",
    images: [F("SxyciCklZyfu2UmpXUHBaGP7iio.jpg"), F("s6exxwU8xutRUaVbvQT1ZURO4P0.png")],
    sections: [
      { heading: "The brief", body: "Design a mobile app for an internal food delivery platform that feels exciting to use, with 3D elements and an AI chatbot for both restaurant owners and customers." },
      { heading: "Approach", body: "I focused on an intuitive interface, consistent visuals and responsive design, so the 3D and AI features felt helpful rather than distracting." },
      { heading: "Goals", body: "Better usability and performance, more engagement, simpler navigation and a smooth, interactive experience." },
    ],
  },
  {
    slug: "gaming",
    title: "Launchpad Landing Page",
    industry: "Entertainment",
    client: "External client",
    service: "Website",
    year: "2024",
    summary: "A bold landing page for a game launch that shows off the characters, release details and key features, and builds anticipation.",
    images: [F("oa0g4sz9NSqqBQXqWGExZr3ogc.jpg")],
    sections: [
      { heading: "The brief", body: "Build excitement ahead of a game launch and give future players everything they need to know." },
      { heading: "Design", body: "Clear UI/UX principles to highlight the game's characters, release details and features, with smooth navigation and an immersive feel." },
    ],
  },
];

// ---------- EXPERIENCE ----------
export const experience = [
  {
    role: "Product Designer",
    company: "Strides Pharma Science",
    period: "Dec 2025 – Present",
    location: "Bengaluru",
    points: [
      "Leading end-to-end product design for complex pharma tools that support Strides' Lighthouse certification, with information architecture and user flows that meet strict regulatory standards.",
      "Building the frontend in React, HTML and CSS so production matches the design system pixel for pixel.",
    ],
    projects: ["Investigation AI", "Online Continuous Process Verification", "Vendor Management", "Digital Performance Monitoring", "Equipment Reliability", "Data Observability"],
  },
  {
    role: "UX/UI Designer",
    company: "Geekyants",
    period: "Feb 2024 – Dec 2025",
    location: "Bengaluru",
    points: [
      "Owned internal and client projects from research to handoff, with consistently positive client feedback.",
      "Brought generative AI and data visualisation into the UI of sales forecasting tools, using atomic design for cross-platform consistency.",
      "Ran contextual inquiries and usability tests across fintech, healthcare, real estate and gaming clients.",
    ],
    projects: ["Banking app (Dubai)", "Real estate platform (Australia)", "Eldercare app", "Soccerverse", "Football turf booking", "Internal hiring app", "Online gaming platform"],
  },
  {
    role: "Tech Lead (Design)",
    company: "Cognizant",
    period: "Aug 2021 – Dec 2023",
    location: "Bengaluru",
    points: [
      "Led a team of 6 designers and cut design inconsistencies by 50% with shared style guides and design specs.",
      "Bridged design and development across fintech, healthcare, e-commerce and TV apps.",
      "Ran design thinking workshops and heuristic evaluations for enterprise clients.",
    ],
    projects: ["Loblaw web platforms", "Etex website"],
  },
];

export const achievements = [
  "Gave a talk on \"AI Impact on UI/UX Design\" at the GeekyAnts design meetup (YouTube live).",
  "Led design system work that reduced design inconsistencies by 50% across enterprise apps.",
  "Managed client relationships and led junior designers on several projects at once.",
];

// ---------- EDUCATION ----------
export const education = [
  {
    title: "UI/UX Design",
    school: "Designerrs Academy",
    period: "2023",
    body: "Professional certification focused on designing mobile apps and websites.",
  },
  {
    title: "B.E. Electronics & Communication",
    school: "Don Bosco Institute of Technology, Bengaluru (VTU)",
    period: "2017 – 2021",
    body: "Graduated with a 7.2 CGPA and no backlogs. My final-year disease prediction app was recognised by VTU.",
  },
];

export const certifications = [
  { title: "GAMP 5", body: "Good Automated Manufacturing Practice" },
  { title: "Computer System Validation", body: "CSV for regulated systems" },
  { title: "ALCOA+ Data Integrity", body: "Data integrity principles" },
  { title: "Quality Risk Management", body: "ICH Q9 / Q12" },
];

