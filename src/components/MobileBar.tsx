import { Home, Cpu, FolderGit2, Send } from "lucide-react";
import type { SectionId } from "../data/sections";

/* Thumb-friendly bottom quick-nav shown on small screens only (CSS hides it
   on desktop). Anchors reuse the site's smooth-scroll behaviour. */

const ITEMS: { id: SectionId | "home"; label: string; Icon: typeof Home; href: string }[] = [
  { id: "home", label: "Home", Icon: Home, href: "#home" },
  { id: "stack", label: "Stack", Icon: Cpu, href: "#stack" },
  { id: "projects", label: "Projects", Icon: FolderGit2, href: "#projects" },
  { id: "contact", label: "Contact", Icon: Send, href: "#contact" },
];

export default function MobileBar({ active }: { active: SectionId | "home" }) {
  return (
    <nav className="mobile-bar" aria-label="Quick navigation">
      {ITEMS.map(({ id, label, Icon, href }) => (
        <a key={id} href={href} className={active === id ? "mb-item active" : "mb-item"} aria-label={label}>
          <Icon size={19} strokeWidth={active === id ? 2.4 : 1.8} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
