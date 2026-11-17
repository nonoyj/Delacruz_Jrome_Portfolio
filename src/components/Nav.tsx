import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { SECTION_IDS, type SectionId } from "../data/sections";
import { profile } from "../data/portfolio";

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

  /* Drawer behaviour: close on Escape, lock body scroll while open. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a href="#home" className="nav-logo" onClick={close}>
        j<span className="nav-logo-accent">'</span>rome<span className="nav-logo-dot">.dev</span>
      </a>

      {/* Desktop inline links / mobile slide-in drawer (same DOM, CSS switches) */}
      <nav
        id="mobile-menu"
        className={`nav-links ${open ? "open" : ""}`}
        aria-label="Primary"
      >
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
            onClick={close}
            tabIndex={open ? undefined : -1}
          >
            <span className="nav-num">0{SECTION_IDS.indexOf(id) + 1}.</span> {LABELS[id]}
          </a>
        ))}

        {/* Drawer-only footer: socials + CTA (hidden by desktop CSS) */}
        <div className="nav-drawer-foot">
          <a className="nav-cta" href="#contact" onClick={close}>
            Hit Me Up
          </a>
          <div className="nav-drawer-socials">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </nav>

      <div className={`nav-backdrop ${open ? "show" : ""}`} onClick={close} aria-hidden="true" />

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
        <a className="nav-cta" href="#contact" onClick={close}>
          Hit Me Up
        </a>
        <button
          type="button"
          className={`nav-burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
