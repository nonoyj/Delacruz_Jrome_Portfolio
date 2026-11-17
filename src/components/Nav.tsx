import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile } from "../data/portfolio";

export const SECTION_IDS = ["about", "stack", "experience", "projects", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const LABELS: Record<SectionId, string> = {
  about: "About",
  stack: "Tech Stack",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};

interface Props {
  active: SectionId | "home";
}

export default function Nav({ active }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a href="#home" className="nav-logo" onClick={() => setOpen(false)}>
        j<span className="nav-logo-accent">'</span>rome<span className="nav-logo-dot">.dev</span>
      </a>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <span className="nav-num">0{SECTION_IDS.indexOf(id) + 1}.</span> {LABELS[id]}
          </a>
        ))}
      </nav>

      <div className="nav-socials">
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <GithubIcon size={17} />
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <LinkedinIcon size={17} />
        </a>
        <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
          <FacebookIcon size={17} />
        </a>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Hit Me Up
        </a>
        <button
          type="button"
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          title="Menu"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
