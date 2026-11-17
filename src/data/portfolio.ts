/* ============================================================
   PORTFOLIO CONTENT — EDIT THIS FILE
   ------------------------------------------------------------
   Everything on the site reads from here. Replace the
   placeholder projects / experience / links with your real
   details and the whole site updates automatically.
   ============================================================ */

export const profile = {
  name: "Jrome Delacruz",
  firstName: "Jrome",
  role: "IT / Computer Science Student",
  location: "Cebu City, Philippines",
  email: "hello@jromedelacruz.dev", // ← your real email
  availability: "Open to internships & freelance work",
  tagline:
    "I build digital experiences one commit at a time — turning caffeine and curiosity into working software.",
  bio: [
    "I'm an Information Technology student from Cebu City, Philippines, passionate about building software that solves real problems. My journey started with curiosity about how websites work — now I'm deep into web development, systems programming, and everything in between.",
    "When I'm not coding, you'll find me exploring new technologies, joining hackathons, or helping classmates debug their projects at 2 AM. I believe the best way to learn is to build — so I build a lot.",
  ],
  currentlyLearning: ["React & TypeScript", "Node.js APIs", "UI/UX fundamentals"],
  funFacts: [
    "I debug better with lo-fi music playing",
    "My first program was a calculator in Python",
    "I have a GitHub streak I'm weirdly proud of",
    "I can solve a Rubik's cube in under 2 minutes",
  ],
  stats: [
    { value: "15+", label: "Projects Built" },
    { value: "10+", label: "Technologies" },
    { value: "500+", label: "Git Commits" },
    { value: "∞", label: "Coffee Consumed" },
  ],
  socials: {
    github: "https://github.com/jromedelacruz", // ← your real GitHub
    linkedin: "https://linkedin.com/in/jromedelacruz", // ← your real LinkedIn
    facebook: "https://facebook.com/jromedelacruz",
  },
};

/* ---------------- Skills ---------------- */
export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level: 0–100
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "Python", level: 80 },
      { name: "Java", level: 70 },
      { name: "C++", level: 60 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 80 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Responsive Design", level: 85 },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 65 },
      { name: "Git & GitHub", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 55 },
      { name: "Firebase", level: 60 },
    ],
  },
];

/* ---------------- Projects ----------------
   ← REPLACE these placeholders with your real projects.
   Fields: name, description, tech[], year, github, live (optional) */
export interface Project {
  name: string;
  description: string;
  tech: string[];
  year: string;
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: "CampusConnect",
    description:
      "A student organization management system that digitizes membership tracking, event announcements, and attendance for campus orgs. Built with a team of 4 as our capstone project.",
    tech: ["React", "Firebase", "Tailwind CSS"],
    year: "2025",
    github: "https://github.com/jromedelacruz/campusconnect",
    live: "https://campusconnect-demo.vercel.app",
  },
  {
    name: "StockTrack POS",
    description:
      "Point-of-sale and inventory system for small sari-sari stores. Handles sales transactions, low-stock alerts, and daily reports — designed for stores without reliable internet.",
    tech: ["Python", "SQLite", "Tkinter"],
    year: "2024",
    github: "https://github.com/jromedelacruz/stocktrack-pos",
  },
  {
    name: "WeatherScope",
    description:
      "A weather dashboard that visualizes real-time forecasts with charts and city search. Consumes the OpenWeather API and caches results for offline viewing.",
    tech: ["JavaScript", "OpenWeather API", "Chart.js"],
    year: "2024",
    github: "https://github.com/jromedelacruz/weatherscope",
    live: "https://weatherscope.vercel.app",
  },
  {
    name: "DevFolio",
    description:
      "This very portfolio — a VS Code-inspired personal website with a working command palette, interactive terminal, and tabbed file explorer. Built with React and TypeScript.",
    tech: ["React", "TypeScript", "Framer Motion"],
    year: "2025",
    github: "https://github.com/jromedelacruz/Delacruz_Jrome_Portfolio",
    live: "https://jromedelacruz.vercel.app",
  },
];

/* ---------------- Experience ----------------
   ← REPLACE these placeholders with your real history. */
export interface ExperienceItem {
  date: string;
  role: string;
  org: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    date: "2023 — Present",
    role: "BS in Information Technology",
    org: "University — Cebu City, Philippines", // ← your school
    description:
      "Currently pursuing my degree with a focus on web systems and software development. Coursework includes Web Systems, Data Structures, Database Systems, and Systems Analysis & Design.",
  },
  {
    date: "2025",
    role: "Capstone Project Lead",
    org: "CampusConnect — Student Org System",
    description:
      "Led a team of 4 in designing and building a management system for campus organizations. Handled the frontend architecture and Firebase integration from concept to deployment.",
  },
  {
    date: "2024",
    role: "Hackathon Participant",
    org: "Regional Hackathon — Cebu",
    description:
      "Built a working prototype in 36 hours with a team of strangers who became friends. Learned more about teamwork under pressure in one weekend than in a whole semester.",
  },
  {
    date: "2024",
    role: "Tech Organization Member",
    org: "School Developer Community",
    description:
      "Active member of our school's developer community — organizing coding workshops, peer tutoring sessions, and tech talks for fellow IT students.",
  },
  {
    date: "2023",
    role: "The Beginning",
    org: "Self-taught",
    description:
      "Wrote my first line of code in Python and never looked back. Started with a calculator, then a to-do app, then... well, you can see the rest in the projects tab.",
  },
];
