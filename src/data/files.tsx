import type { ReactNode } from "react";
import { FileCode2, FileJson, FileText, FolderOpen, GraduationCap, Award, Settings2 } from "lucide-react";

export type FileId =
  | "welcome"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "contact"
  | "editor";

export interface FileDef {
  id: FileId;
  name: string;
  path: string[];
  icon: ReactNode;
  color: string;
  language: string;
}

export const FILES: Record<FileId, FileDef> = {
  welcome: {
    id: "welcome",
    name: "welcome.tsx",
    path: ["src", "welcome.tsx"],
    icon: <FileCode2 size={15} />,
    color: "#61dafb",
    language: "TypeScript React",
  },
  about: {
    id: "about",
    name: "about.tsx",
    path: ["src", "about.tsx"],
    icon: <FileCode2 size={15} />,
    color: "#61dafb",
    language: "TypeScript React",
  },
  skills: {
    id: "skills",
    name: "skills.json",
    path: ["src", "skills.json"],
    icon: <FileJson size={15} />,
    color: "#cbcb41",
    language: "JSON",
  },
  projects: {
    id: "projects",
    name: "projects",
    path: ["src", "projects"],
    icon: <FolderOpen size={15} />,
    color: "#dcb67a",
    language: "Folder",
  },
  experience: {
    id: "experience",
    name: "experience.md",
    path: ["src", "experience.md"],
    icon: <FileText size={15} />,
    color: "#519aba",
    language: "Markdown",
  },
  education: {
    id: "education",
    name: "education.md",
    path: ["src", "education.md"],
    icon: <GraduationCap size={15} />,
    color: "#519aba",
    language: "Markdown",
  },
  certifications: {
    id: "certifications",
    name: "certifications.json",
    path: ["src", "certifications.json"],
    icon: <Award size={15} />,
    color: "#dcb67a",
    language: "JSON",
  },
  contact: {
    id: "contact",
    name: "contact.ts",
    path: ["src", "contact.ts"],
    icon: <FileCode2 size={15} />,
    color: "#3178c6",
    language: "TypeScript",
  },
  editor: {
    id: "editor",
    name: "editor.config",
    path: [".admin", "editor.config"],
    icon: <Settings2 size={15} />,
    color: "#a78bfa",
    language: "Editor Config",
  },
};

/** Files visible in the explorer to everyone. `editor` is admin-only. */
export const FILE_ORDER: Exclude<FileId, "editor">[] = [
  "welcome",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
];
