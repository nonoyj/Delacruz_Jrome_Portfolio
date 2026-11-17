/* ============================================================
   PORTFOLIO CONTENT — EDIT THIS FILE
   ------------------------------------------------------------
   Everything on the site reads from here. Skills, tech stack,
   certifications, experiences and education can also be edited
   live via Editor Mode (click the person icon in the activity
   bar or Ctrl+K → "Enter Editor Mode") — those edits save to
   your browser. To publish for everyone, edit this file.
   ============================================================ */

export const profile = {
  name: "J'rome A. De la Cruz",
  firstName: "J'rome",
  role: "IT Student",
  location: "Iloilo City, Philippines",
  email: "delacruzjrome@gmail.com",
  availability: "Open to internships & freelance work",
  /* Photo shown on the landing page. Using the GitHub profile picture for
     now — to use another photo, drop it in the `public/` folder (e.g.
     public/me.jpg) and change this to "/me.jpg". */
  photo: "https://avatars.githubusercontent.com/u/269455933?v=4",
  tagline:
    "I turn curiosity into code and ideas into working software — where technology meets music.",
  bio: [
    "I'm an IT student from Iloilo City, Philippines, passionate about technology, programming, and cybersecurity. I have a strong interest in learning how things work — and in building practical projects that put that understanding to use.",
    "Outside academics, I'm into music: guitar, exploring guitar tones, effects, and audio technology. I enjoy experimenting with new ideas, solving technical problems, and developing creative projects that combine technology and music.",
  ],
  currentlyLearning: ["Cybersecurity fundamentals", "Flutter & mobile dev", "Audio tech & DSP"],
  funFacts: [
    "I chase the perfect guitar tone — it's a journey, not a destination",
    "Cybersecurity fascinates me: how systems break, and how to fix them",
    "I take things apart to see how they work (they usually go back together)",
    "My projects keep crashing into my hobbies — tech × music",
  ],
  stats: [
    { value: "4", label: "Projects Built" },
    { value: "15+", label: "Technologies" },
    { value: "3", label: "Public Repos" },
    { value: "∞", label: "Riffs Jammed" },
  ],
  socials: {
    github: "https://github.com/nonoyj",
    linkedin: "https://www.linkedin.com/in/j-rome-de-la-cruz-ab3543446",
    facebook: "https://facebook.com/hicbazzuka",
  },
};

/* ---------------- Skills (editable in Editor Mode) ---------------- */
export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level: 0–100
}

export const defaultSkills: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Dart", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "JavaScript", level: 72 },
      { name: "Python", level: 60 },
      { name: "C#", level: 58 },
      { name: "SQL", level: 62 },
      { name: "HTML / CSS", level: 85 },
    ],
  },
  {
    title: "Frameworks & Runtime",
    skills: [
      { name: "Flutter", level: 75 },
      { name: "React", level: 68 },
      { name: "Vite", level: 72 },
      { name: "Node.js", level: 60 },
    ],
  },
  {
    title: "Mobile, Tools & Security",
    skills: [
      { name: "Android (Kotlin)", level: 55 },
      { name: "Git & GitHub", level: 78 },
      { name: "Responsive Design", level: 80 },
      { name: "Cybersecurity Fundamentals", level: 55 },
    ],
  },
];

/* ---------------- Tech stack (editable in Editor Mode) ---------------- */
export interface TechItem {
  name: string;
  category: string;
  icon?: string; // devicon slug (https://devicon.dev) — e.g. "react"
}

export const defaultTechStack: TechItem[] = [
  { name: "Dart", category: "Languages", icon: "dart" },
  { name: "TypeScript", category: "Languages", icon: "typescript" },
  { name: "JavaScript", category: "Languages", icon: "javascript" },
  { name: "Python", category: "Languages", icon: "python" },
  { name: "C#", category: "Languages", icon: "csharp" },
  { name: "SQL", category: "Databases", icon: "mysql" },
  { name: "SQLite", category: "Databases", icon: "sqlite" },
  { name: "Firebase", category: "Databases", icon: "firebase" },
  { name: "Flutter", category: "Frameworks", icon: "flutter" },
  { name: "React", category: "Frameworks", icon: "react" },
  { name: "Vite", category: "Frameworks", icon: "vite" },
  { name: "Node.js", category: "Frameworks", icon: "nodejs" },
  { name: "Kotlin", category: "Frameworks", icon: "kotlin" },
  { name: "HTML5 / CSS3", category: "Web & Tools", icon: "html5" },
  { name: "Tailwind CSS", category: "Web & Tools", icon: "tailwindcss" },
  { name: "Git & GitHub", category: "Web & Tools", icon: "git" },
  { name: "Android", category: "Web & Tools", icon: "android" },
];

/* ---------------- Certifications (editable in Editor Mode) ----------------
   Empty by default — add yours in Editor Mode (person icon in the activity
   bar), or directly here. */
export interface Certification {
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export const defaultCertifications: Certification[] = [];

/* ---------------- Projects (real — from github.com/nonoyj) ---------------- */
export interface Project {
  name: string;
  description: string;
  tech: string[];
  year: string;
  github: string;
  live?: string;
  collab?: boolean;
}

export const projects: Project[] = [
  {
    name: "Mindful Minute",
    description:
      "A wellbeing app that reminds you to take mindful breaks. Runs a persistent Android background monitoring service (Kotlin) so reminders survive even when the app is swiped away — refined through 8 releases, with an in-app FAQ and feedback flow.",
    tech: ["Flutter", "Dart", "Kotlin", "Android"],
    year: "2026",
    github: "https://github.com/nonoyj/Mindful-Minute",
  },
  {
    name: "M-Gear Iloilo",
    description:
      "A responsive web application for M-Gear Iloilo, built with a component-driven React + TypeScript architecture and Vite tooling.",
    tech: ["React", "TypeScript", "Vite", "CSS"],
    year: "2026",
    github: "https://github.com/nonoyj/M-Gear-Iloilo",
  },
  {
    name: "MyWarehouse Inventory",
    description:
      "A warehouse inventory management system built as a DBMS2 course requirement — a C# application with database-driven product, stock, and transaction management.",
    tech: ["C#", "SQL", "Database Design"],
    year: "2026",
    github: "https://github.com/nonoyj/DBMS---MyWarehouse-Inventory-Management-",
  },
  {
    name: "Emergen",
    description:
      "A community emergency-alert web app for Iloilo City, built with Team Klyxen for DevDash 2026. Post disaster alerts (fire, flood, earthquake, typhoon…), verify reports in real time, and keep reporting even offline with a dedicated offline mode.",
    tech: ["Web App", "Realtime", "Offline Mode"],
    year: "2026",
    github: "https://github.com/Klyxen/DevDash2026-Evolverse",
    live: "https://emergeng.netlify.app/",
    collab: true,
  },
];

/* ---------------- Experiences (editable in Editor Mode) ---------------- */
export interface ExperienceItem {
  date: string;
  role: string;
  org: string;
  description: string;
}

export const defaultExperiences: ExperienceItem[] = [
  {
    date: "2026",
    role: "Developer — M-Gear Iloilo",
    org: "React · TypeScript · Vite",
    description:
      "Developing a responsive web app for M-Gear Iloilo with a component-driven architecture and typed data models.",
  },
  {
    date: "2026",
    role: "Creator — Mindful Minute",
    org: "Flutter · Android (Kotlin)",
    description:
      "Built a wellbeing app that helps people take mindful breaks — persistent background monitoring on Android, break scheduling, and 8 iterations of refinement based on real-device feedback.",
  },
  {
    date: "2026",
    role: "Team Collaboration — DevDash 2026",
    org: "Team Klyxen · 'Evolverse'",
    description:
      "Collaborated on 'Evolverse' for DevDash 2026 — planning, dividing work, and shipping as a team in a shared repository.",
  },
  {
    date: "2026",
    role: "DBMS — MyWarehouse Inventory Management",
    org: "Database project",
    description:
      "Designed and built a warehouse inventory management system — schema design, stock tracking, and transaction handling with SQL.",
  },
  {
    date: "The spark",
    role: "First Lines of Code",
    org: "Self-taught",
    description:
      "Curiosity about how things work turned into writing code — and it hasn't stopped since.",
  },
];

/* ---------------- Education (editable in Editor Mode) ---------------- */
export interface EducationItem {
  period: string;
  degree: string;
  school: string;
  description: string;
}

export const defaultEducation: EducationItem[] = [
  {
    period: "Present",
    degree: "BS Information Technology",
    school: "Iloilo City, Philippines", // ← add your school's name (Editor Mode)
    description:
      "Pursuing my IT degree — focused on programming, databases, and cybersecurity, with coursework spanning web systems, data structures, and networking.",
  },
];

/* ---------------- Bundle of Editor Mode-editable content ---------------- */
export interface EditableContent {
  skills: SkillCategory[];
  techStack: TechItem[];
  certifications: Certification[];
  experiences: ExperienceItem[];
  education: EducationItem[];
}

export const defaultContent: EditableContent = {
  skills: defaultSkills,
  techStack: defaultTechStack,
  certifications: defaultCertifications,
  experiences: defaultExperiences,
  education: defaultEducation,
};
