import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Store,
  CloudSun,
  Code2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Music,
  Calculator,
  Flame,
  Box,
  Sparkles,
  GraduationCap,
  Coffee,
  Lightbulb,
  FolderGit2,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";
import { profile, projects, skillCategories, experience } from "../data/portfolio";
import type { FileId } from "../data/files";

/* ---------- shared helpers ---------- */

export function LineNumbers({ count }: { count: number }) {
  return (
    <div className="gutter" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

export const GUTTER_LINES: Record<FileId, number> = {
  welcome: 80,
  about: 110,
  skills: 120,
  projects: 130,
  experience: 110,
  contact: 95,
};

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const TYPE_PHRASES = [
  "IT / CS Student",
  "Aspiring Full-Stack Dev",
  "Problem Solver",
  "Caffeine Enthusiast",
  "Lifelong Learner",
];

function useTypewriter(phrases: string[], speed = 65, pause = 1700) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let t: number | undefined;
    if (!deleting && text === current) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
    } else {
      t = window.setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2.2 : speed
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, idx, phrases, speed, pause]);

  return text;
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function SectionHead({ file, title, accent, sub }: { file: string; title: string; accent: string; sub?: string }) {
  return (
    <>
      <div className="section-title">
        <span className="tok-com">{"// " + file}</span>
      </div>
      <motion.h2 className="section-heading" {...fadeUp}>
        {title} <span className="accent-word">{accent}</span>
      </motion.h2>
      {sub && (
        <motion.p className="section-sub" {...fadeUp}>
          {sub}
        </motion.p>
      )}
    </>
  );
}

/* ============================================================
   welcome.tsx — Hero
   ============================================================ */
function WelcomeView({ onOpenFile }: { onOpenFile: (id: FileId) => void }) {
  const typed = useTypewriter(TYPE_PHRASES);

  return (
    <div className="hero">
      <motion.div className="hero-eyebrow" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <span className="pulse-dot" />
        <span className="tok-com">{"// hello world, i'm"}</span>
      </motion.div>

      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
      >
        Jrome <span className="gradient">Delacruz</span>
      </motion.h1>

      <motion.div
        className="hero-role"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="tok-kw">const</span>{" "}
        <span className="tok-var">role</span>{" "}
        <span className="tok-plain">=</span>{" "}
        <span className="typed">"{typed}"</span>
        <span className="caret" />
      </motion.div>

      <motion.p className="hero-desc" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.55 }}>
        {profile.tagline.split("—")[0]}— based in <strong>{profile.location}</strong>. Currently a{" "}
        <strong>{profile.role}</strong>, {profile.availability.toLowerCase()}.
      </motion.p>

      <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.55 }}>
        <button type="button" className="btn btn-primary" onClick={() => onOpenFile("projects")}>
          <FolderGit2 size={16} />
          View Projects
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onOpenFile("contact")}>
          <MessageSquare size={16} />
          Contact Me
        </button>
        <a className="btn btn-ghost" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
          <GithubIcon size={16} />
          GitHub
        </a>
      </motion.div>

      <motion.div className="hero-stats" variants={stagger} initial="hidden" animate="show">
        {profile.stats.map((s) => (
          <motion.div key={s.label} className="stat-card" variants={staggerItem}>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="hero-code" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
        <div className="code-block">
          <div className="cb-header">
            <span className="cb-dots"><span /><span /><span /></span>
            jrome.config.ts — developer profile
          </div>
          <div><span className="tok-kw">const</span> <span className="tok-var">jrome</span> <span className="tok-plain">=</span> <span className="tok-plain">{"{"}</span></div>
          <div>{"  "}role<span className="tok-plain">:</span> <span className="tok-str">"{profile.role}"</span><span className="tok-plain">,</span></div>
          <div>{"  "}location<span className="tok-plain">:</span> <span className="tok-str">"{profile.location}"</span><span className="tok-plain">,</span></div>
          <div>{"  "}focus<span className="tok-plain">:</span> <span className="tok-plain">[</span><span className="tok-str">"web dev"</span><span className="tok-plain">,</span> <span className="tok-str">"systems"</span><span className="tok-plain">,</span> <span className="tok-str">"UI/UX"</span><span className="tok-plain">],</span></div>
          <div>{"  "}coffee<span className="tok-plain">:</span> <span className="tok-type">Infinity</span><span className="tok-plain">,</span></div>
          <div>{"  "}openToWork<span className="tok-plain">:</span> <span className="tok-kw">true</span><span className="tok-plain">,</span></div>
          <div><span className="tok-plain">{"}"}</span><span className="tok-plain">;</span></div>
        </div>
      </motion.div>

      <motion.div className="shortcut-hints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.6 }}>
        <span><kbd>Ctrl</kbd><kbd>K</kbd> command palette</span>
        <span><kbd>Ctrl</kbd><kbd>`</kbd> terminal</span>
        <span>try typing <kbd>help</kbd> in the terminal</span>
      </motion.div>
    </div>
  );
}

/* ============================================================
   about.tsx — About
   ============================================================ */
function AboutView() {
  const factIcons = [Music, Calculator, Flame, Box];

  return (
    <div>
      <SectionHead
        file="src/about.tsx"
        title="About"
        accent="Me"
        sub="A quick `npm run intro` on who I am, what I do, and why I love this stuff."
      />

      <div className="about-grid">
        <motion.div className="info-card" {...fadeUp}>
          <h3><GraduationCap size={15} /> bio()</h3>
          {profile.bio.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--text-dim)", marginBottom: i < profile.bio.length - 1 ? 14 : 0 }}>
              {p}
            </p>
          ))}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", marginBottom: 10 }}>
              <span className="tok-com">{"// currently learning"}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {profile.currentlyLearning.map((c) => (
                <span key={c} className="tag"><Sparkles size={11} style={{ marginRight: 5, verticalAlign: -1 }} />{c}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <motion.div className="info-card" {...fadeUp}>
            <h3><Lightbulb size={15} /> fun_facts.json</h3>
            <ul className="fact-list">
              {profile.funFacts.map((f, i) => {
                const Icon = factIcons[i % factIcons.length];
                return (
                  <li key={f}><Icon size={15} /> <span>{f}</span></li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div className="info-card" {...fadeUp}>
            <h3><Coffee size={15} /> workspace.setup</h3>
            <div className="code-block" style={{ padding: "12px 16px", fontSize: 12.5 }}>
              <div><span className="tok-kw">const</span> <span className="tok-var">setup</span> <span className="tok-plain">= {"{"}</span></div>
              <div>{"  "}editor<span className="tok-plain">:</span> <span className="tok-str">"VS Code (obviously)"</span><span className="tok-plain">,</span></div>
              <div>{"  "}theme<span className="tok-plain">:</span> <span className="tok-str">"Purple Dark+"</span><span className="tok-plain">,</span></div>
              <div>{"  "}music<span className="tok-plain">:</span> <span className="tok-str">"lo-fi beats to debug to"</span><span className="tok-plain">,</span></div>
              <div><span className="tok-plain">{"}"}</span>;</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   skills.json — Skills
   ============================================================ */
function SkillsView() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div>
      <SectionHead
        file="src/skills.json"
        title="Tools of the"
        accent="Trade"
        sub="Honest self-assessment — always leveling up, never done learning."
      />

      <motion.div className="code-block" {...fadeUp} style={{ marginBottom: 26 }}>
        <div className="cb-header">
          <span className="cb-dots"><span /><span /><span /></span>
          src/skills.json — excerpt
        </div>
        <div><span className="tok-plain">{"{"}</span></div>
        <div>{"  "}<span className="tok-prop">"status"</span><span className="tok-plain">:</span> <span className="tok-str">"learning_everyday"</span><span className="tok-plain">,</span></div>
        <div>{"  "}<span className="tok-prop">"approach"</span><span className="tok-plain">:</span> <span className="tok-str">"build_real_things"</span><span className="tok-plain">,</span></div>
        <div>{"  "}<span className="tok-prop">"stack"</span><span className="tok-plain">:</span> <span className="tok-plain">{"{"}</span> <span className="tok-dim">/* see below */</span> <span className="tok-plain">{"}"} </span></div>
        <div><span className="tok-plain">{"}"}</span></div>
      </motion.div>

      <motion.div className="skills-grid" ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
        {skillCategories.map((cat) => (
          <motion.div key={cat.title} className={`skill-card ${inView ? "visible" : ""}`} variants={staggerItem}>
            <h3><Code2 size={14} /> {cat.title}</h3>
            {cat.skills.map((s) => (
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ "--w": `${s.level}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   projects/ — Projects
   ============================================================ */
function ProjectsView() {
  const icons = [Rocket, Store, CloudSun, Code2, FolderGit2];

  return (
    <div>
      <SectionHead
        file="src/projects/"
        title="Things I've"
        accent="Built"
        sub="Real projects, real problems, real commits at 2 AM. (Content lives in src/data/portfolio.ts — ready for my actual repos.)"
      />

      <motion.div className="projects-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
        {projects.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.article key={p.name} className="project-card" variants={staggerItem}>
              <div className="project-top">
                <div className="project-icon"><Icon size={20} /></div>
                <div className="project-links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" title="Live demo">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" title="Source code">
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
              <div className="project-name">
                {p.name.toLowerCase().replace(/\s+/g, "-")}
                <span className="ext"> .tsx</span>
              </div>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="project-year">{"// shipped " + p.year}</div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ============================================================
   experience.md — Timeline
   ============================================================ */
function ExperienceView() {
  return (
    <div>
      <SectionHead
        file="src/experience.md"
        title="The Journey"
        accent="So Far"
        sub="From first line of code to leading projects — rendered as git log --graph, but prettier."
      />

      <div className="timeline" ref={(el) => { if (el) el.querySelectorAll<HTMLElement>(".reveal").forEach((n, i) => { n.style.transitionDelay = `${i * 60}ms`; }); }}>
        {experience.map((e) => (
          <motion.div key={e.role} className="timeline-item reveal" {...fadeUp}>
            <div className="timeline-dot" />
            <div className="timeline-date">{e.date}</div>
            <div className="timeline-role">{e.role}</div>
            <div className="timeline-org">{e.org}</div>
            <p className="timeline-desc">{e.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   contact.ts — Contact
   ============================================================ */
function ContactView() {
  const [status, setStatus] = useState<{ kind: "success" | "error"; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ kind: "error", msg: "Error: all fields are required. (Even the fun ones.)" });
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus({ kind: "success", msg: "// opening your mail client… or just email me directly below" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({ kind: "error", msg: "Clipboard blocked — email shown below instead." });
    }
  };

  const socials = [
    { icon: GithubIcon, label: "GitHub", handle: "github.com/jromedelacruz", url: profile.socials.github },
    { icon: LinkedinIcon, label: "LinkedIn", handle: "in/jromedelacruz", url: profile.socials.linkedin },
    { icon: FacebookIcon, label: "Facebook", handle: "fb.com/jromedelacruz", url: profile.socials.facebook },
    { icon: Mail, label: "Email", handle: profile.email, url: `mailto:${profile.email}` },
  ];

  return (
    <div>
      <SectionHead
        file="src/contact.ts"
        title="Let's Build Something"
        accent="Together"
        sub="Open to internships, freelance work, hackathon teams, or just talking shop about code."
      />

      <div className="contact-grid">
        <motion.div className="contact-form" {...fadeUp}>
          <form onSubmit={submit}>
            <label><span className="tok-kw">const</span> name =</label>
            <input
              placeholder='"Your Name"'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label><span className="tok-kw">const</span> email =</label>
            <input
              type="email"
              placeholder='"you@example.com"'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label><span className="tok-kw">const</span> message =</label>
            <textarea
              rows={5}
              placeholder={`// hi jrome, let's work on…`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <Send size={15} />
              send_message();
            </button>
            <div className={`form-status ${status?.kind ?? ""}`}>{status?.msg}</div>
          </form>
        </motion.div>

        <motion.div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <motion.div className="info-card" {...fadeUp}>
            <h3><Mail size={15} /> direct.contact</h3>
            <div className="code-block" style={{ padding: "14px 16px", fontSize: 13 }}>
              <div><span className="tok-kw">export const</span> <span className="tok-var">contact</span> <span className="tok-plain">= {"{"}</span></div>
              <div>{"  "}email<span className="tok-plain">:</span> <span className="tok-str">"{profile.email}"</span><span className="tok-plain">,</span></div>
              <div>{"  "}location<span className="tok-plain">:</span> <span className="tok-str">"{profile.location}"</span><span className="tok-plain">,</span></div>
              <div>{"  "}responseTime<span className="tok-plain">:</span> <span className="tok-str">"&lt; 24 hours"</span><span className="tok-plain">,</span></div>
              <div><span className="tok-plain">{"}"};</span></div>
            </div>
            <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied to clipboard!" : "Copy email address"}
            </button>
          </motion.div>

          <motion.div className="info-card" {...fadeUp}>
            <h3><MapPin size={15} /> find_me_on</h3>
            <div className="social-list">
              {socials.map((s) => (
                <a key={s.label} className="social-item" href={s.url} target="_blank" rel="noopener noreferrer">
                  <span className="social-icon"><s.icon size={17} /></span>
                  <span>
                    <span className="social-label">{s.label}</span>
                    <span className="social-handle" style={{ display: "block" }}>{s.handle}</span>
                  </span>
                  <span className="social-arrow">→</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 7 }}>
              <Phone size={13} style={{ color: "var(--accent)" }} />
              Prefer chat? The terminal below accepts `contact` too.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function FileView({ id, onOpenFile }: { id: FileId; onOpenFile: (id: FileId) => void }) {
  switch (id) {
    case "welcome": return <WelcomeView onOpenFile={onOpenFile} />;
    case "about": return <AboutView />;
    case "skills": return <SkillsView />;
    case "projects": return <ProjectsView />;
    case "experience": return <ExperienceView />;
    case "contact": return <ContactView />;
  }
}
