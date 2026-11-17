import type { ReactNode } from "react";
import { FileCode2, FileJson, FileText, FolderOpen } from "lucide-react";

export type FileId = "welcome" | "about" | "skills" | "projects" | "experience" | "contact";

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
  contact: {
    id: "contact",
    name: "contact.ts",
    path: ["src", "contact.ts"],
    icon: <FileCode2 size={15} />,
    color: "#3178c6",
    language: "TypeScript",
  },
};

export const FILE_ORDER: FileId[] = ["welcome", "about", "skills", "projects", "experience", "contact"];
