import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import {
  ArrowUp,
  Award,
  Brain,
  Bike,
  Warehouse,
  Siren,
  Copy,
  Check,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Guitar,
  ShieldCheck,
  Puzzle,
  Music,
} from "lucide-react";
import { profile, projects } from "../data/portfolio";
import type { EditableContent } from "../data/portfolio";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./icons";

/* ---------- shared ---------- */

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function SectionHead({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) {
  return (
    <div className="section-head">
      <motion.div className="eyebrow" {...fadeUp}>
        <span className="tok-com">{"// " + eyebrow}</span>
      </motion.div>
      <motion.h2 className="section-title" {...fadeUp}>
        {title} <span className="accent-word">{accent}</span>
      </motion.h2>
      {sub && (
        <motion.p className="section-sub" {...fadeUp}>
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function useTypewriter(phrases: string[], speed = 62, pause = 1600) {
  /* Respect prefers-reduced-motion: render the first phrase statically. */
  const reduced = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    []
  );
  const [text, setText] = useState(reduced ? phrases[0] : "");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = phrases[idx % phrases.length];
    let t: number | undefined;
    if (!deleting && text === current) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      t = window.setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % phrases.length);
      }, 0);
    } else {
      t = window.setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2.2 : speed
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, idx, phrases, speed, pause, reduced]);

  return text;
}

function CountUp({ value, label }: { value: string; label: string }) {
  const num = parseInt(value, 10);
  const suffix = value.replace(/^[0-9]+/, "");
  const isNum = !isNaN(num);
  const [display, setDisplay] = useState(isNum ? "0" : value);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNum) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1300;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setDisplay(String(Math.round(num * (1 - Math.pow(1 - p, 3)))) + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isNum, num, suffix]);

  return (
    <motion.div className="stat" variants={staggerItem} ref={ref}>
      <div className="stat-num">{display}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
const TYPE_PHRASES = ["IT Student", "Cybersecurity Enthusiast", "Software Developer", "Web & App Developer", "Tech × Music Enthusiast"];

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
    >
      <div className="photo-ring" />
      <div className="photo-frame">
        {!failed ? (
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} fetchPriority="high" decoding="async" onError={() => setFailed(true)} />
        ) : (
          <div className="photo-fallback">JD</div>
        )}
      </div>
      <motion.div
        className="float-chip chip-music"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Puzzle size={14} /> software dev
      </motion.div>
      <motion.div
        className="float-chip chip-sec"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <ShieldCheck size={14} /> cybersecurity
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const typed = useTypewriter(TYPE_PHRASES);

  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-main">
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <span className="pulse-dot" />
            <span className="tok-com">{"// hello kalibutan, i'm"}</span>
          </motion.div>

          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
            <span className="hero-name-solid">J'ROME</span>
            <span className="hero-name-outline">DE LA CRUZ</span>
          </motion.h1>

          <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <span className="tok-kw">const</span> <span className="tok-var">role</span> = <span className="typed">"{typed}"</span>
            <span className="caret" />
          </motion.div>

          <motion.p className="hero-desc" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.55 }}>
            {profile.tagline} Based in <strong>{profile.location}</strong> — studying IT and learning how everything works under the hood.
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.55 }}>
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
            <a className="btn btn-ghost" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} /> GitHub
            </a>
          </motion.div>
        </div>

        <ProfilePhoto />
      </div>

      <motion.div className="hero-stats wrap" variants={stagger} initial="hidden" animate="show">
        {profile.stats.map((s) => (
          <CountUp key={s.label} value={s.value} label={s.label} />
        ))}
      </motion.div>

      <motion.a href="#about" className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} aria-label="Scroll to About section">
        <span className="si-text">scroll</span>
        <span className="si-track" aria-hidden="true">
          <span className="si-thumb" />
        </span>
        <span className="si-text">scroll</span>
      </motion.a>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
export function About() {
  const factIcons = [Guitar, ShieldCheck, Puzzle, Music];

  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead eyebrow="about-me" title="Who is" accent="J'rome?" />

        <motion.p className="about-statement" {...fadeUp}>
          I'm an <span className="hl">IT student</span> passionate about{" "}
          <span className="hl">technology, programming, and cybersecurity</span> — with a strong
          interest in learning <em>how things work</em> and building practical projects. Outside
          academics, I'm into <span className="hl hl-2">music, guitar, and audio technology.</span>
        </motion.p>

        <div className="about-grid">
          {profile.bio.map((p, i) => (
            <motion.p key={i} className="about-body" {...fadeUp}>
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div className="about-cards" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          <motion.div className="card" variants={staggerItem}>
            <h3><Sparkles size={15} /> currently_learning</h3>
            <div className="chip-row">
              {profile.currentlyLearning.map((c) => (
                <span key={c} className="tag">{c}</span>
              ))}
            </div>
          </motion.div>
          <motion.div className="card" variants={staggerItem}>
            <h3><Music size={15} /> fun_facts</h3>
            <ul className="fact-list">
              {profile.funFacts.map((f, i) => {
                const Icon = factIcons[i % factIcons.length];
                return <li key={f}><Icon size={15} /> <span>{f}</span></li>;
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   TECH STACK
   ============================================================ */
function TechTile({ name, img, icon }: { name: string; img?: string; icon?: string }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <motion.div
      className="tech-tile"
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
    >
      {img && !imgErr ? (
        <img
          src={img}
          alt={name}
          width={42}
          height={42}
          loading="lazy"
          onError={() => setImgErr(true)}
        />
      ) : icon && !imgErr ? (
        <img
          src={`https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/${icon}/${icon}-original.svg`}
          alt={name}
          width={42}
          height={42}
          loading="lazy"
          onError={() => setImgErr(true)}
        />
      ) : (
        <span className="tech-tile-dot" />
      )}
      <span>{name}</span>
    </motion.div>
  );
}

export function Stack({ content }: { content: EditableContent }) {
  const categories = Array.from(new Set(content.techStack.map((t) => t.category)));

  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="my-stack"
          title="Tools of the"
          accent="Trade"
          sub="The languages, frameworks and gear I reach for — honest levels, always leveling up."
        />

        {categories.map((cat) => (
          <div key={cat} className="stack-group">
            <motion.div className="stack-cat" {...fadeUp}>
              <span className="tok-kw">const</span> <span className="tok-var">{cat.toLowerCase().replace(/[^a-z]+/g, "_")}</span> <span className="tok-com">{"// " + cat}</span>
            </motion.div>
            <motion.div className="tech-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
              {content.techStack
                .filter((t) => t.category === cat)
                .map((t) => (
                  <TechTile key={t.name} name={t.name} img={t.img} icon={t.icon} />
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
export function Experience({ content }: { content: EditableContent }) {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="career-path"
          title="The Journey"
          accent="So Far"
          sub="Projects, collaborations and milestones — every one taught me something new."
        />

        <div className="timeline">
          {content.experiences.map((e) => (
            <motion.div key={`${e.role}-${e.date}`} className="titem" {...fadeUp}>
              <div className="tdot" />
              <div className="tdate">{e.date}</div>
              <div className="trole">{e.role}</div>
              <div className="torg">{e.org}</div>
              <p className="tdesc">{e.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */
const PROJECT_ICONS = [Brain, Bike, Warehouse, Siren];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="projects"
          title="Things I've"
          accent="Built"
          sub="Real repos, real commits — plus one team collaboration live on the web."
        />

        <motion.div className="projects-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          {projects.map((p, i) => {
            const Icon = PROJECT_ICONS[i % PROJECT_ICONS.length];
            return (
              <motion.article key={p.name} className="project-card" variants={staggerItem}>
                <div className="project-top">
                  {p.logo ? (
                    <a
                      className="project-logo"
                      href={p.live ?? p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={p.live ? `Open ${p.name}` : `${p.name} on GitHub`}
                    >
                      <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" />
                    </a>
                  ) : (
                    <div className="project-icon"><Icon size={20} /></div>
                  )}
                  <div className="project-links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" title="Live demo">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {p.apk && (
                      <a href={p.apk} target="_blank" rel="noopener noreferrer" title="Download APK" className="apk-link">
                        <Download size={16} />
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer" title="Source code">
                      <GithubIcon size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="project-name">
                  {p.name}
                  {p.collab && <span className="tag tag-collab">team collab</span>}
                </h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-footer">
                  <div className="project-year">{"// shipped " + p.year}</div>
                  {p.apk && (
                    <a className="apk-btn" href={p.apk} target="_blank" rel="noopener noreferrer">
                      <Download size={14} /> Download APK
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div className="github-more" {...fadeUp}>
          <a className="btn btn-ghost" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={16} /> More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   EDUCATION + CERTIFICATIONS
   ============================================================ */
export function Education({ content }: { content: EditableContent }) {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="credentials"
          title="Education &"
          accent="Certifications"
          sub="Degrees in progress, certificates on the wall — and the ongoing curriculum of curiosity."
        />

        <div className="edu-grid">
          <div>
            <motion.div className="stack-cat" {...fadeUp}>
              <span className="tok-kw">education</span>
            </motion.div>
            <div className="timeline">
              {content.education.map((e) => (
                <motion.div key={`${e.degree}-${e.period}`} className="titem" {...fadeUp}>
                  <div className="tdot" />
                  <div className="tdate">{e.period}</div>
                  <div className="trole">{e.degree}</div>
                  <div className="torg">{e.school}</div>
                  <p className="tdesc">{e.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.div className="stack-cat" {...fadeUp}>
              <span className="tok-kw">certifications</span>
            </motion.div>
            {content.certifications.length === 0 ? (
              <motion.div className="certs-empty" {...fadeUp}>
                <Award size={30} />
                <div className="certs-empty-title">No certifications listed yet</div>
                <p>More credentials coming soon — check back!</p>
              </motion.div>
            ) : (
              <motion.div className="certs-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
                {content.certifications.map((c) => (
                  <motion.div key={c.name} className={`cert-card ${c.image ? "cert-featured" : ""}`} variants={staggerItem}>
                    {c.image && (
                      <a
                        className="cert-img-link"
                        href={c.link ?? c.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={c.link ? "View PDF credential" : "View certificate"}
                      >
                        <img src={c.image} alt={`${c.name} certificate`} loading="lazy" decoding="async" />
                      </a>
                    )}
                    <div className="cert-body">
                      {!c.image && (
                        <div className="cert-icon"><Award size={18} /></div>
                      )}
                      <div>
                        <div className="cert-name">{c.name}</div>
                        <div className="cert-issuer">{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
                        {c.link && (
                          <a className="cert-link" href={c.link} target="_blank" rel="noopener noreferrer">
                            view credential (pdf) <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
export function Contact() {
  const [status, setStatus] = useState<{ kind: "success" | "error" | "sending"; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honey, setHoney] = useState("");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Sends directly to J'rome's inbox via FormSubmit (formsubmit.co/ajax).
     First-ever submission triggers a one-time activation email; after that,
     every message lands straight in delacruzjrome@gmail.com.
     The hidden "_honey" field is a spam trap — bots fill it, humans never see it. */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) {
      /* Bot detected — silently pretend success so it learns nothing. */
      setForm({ name: "", email: "", message: "" });
      setStatus({ kind: "success", msg: "Message sent! I'll get back to you soon. ✓" });
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ kind: "error", msg: "All fields are required — even the fun ones." });
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus({ kind: "error", msg: "That email doesn't look right — double-check it?" });
      return;
    }
    setStatus({ kind: "sending", msg: "// sending your message…" });
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim().slice(0, 80),
          email: form.email.trim().slice(0, 120),
          message: form.message.trim().slice(0, 2000),
          _subject: `Portfolio contact from ${form.name.trim().slice(0, 80)}`,
          _template: "table",
          _captcha: "false",
          _honey: honey,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === "true" || data.success === true)) {
        setForm({ name: "", email: "", message: "" });
        setStatus({ kind: "success", msg: "Message sent! I'll get back to you soon. ✓" });
      } else {
        throw new Error(data.message || "send failed");
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({
        kind: "error",
        msg: "Direct send failed — opened your mail app instead. Or email me directly.",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({ kind: "error", msg: "Clipboard blocked — email shown below." });
    }
  };

  const socials = [
    { icon: GithubIcon, label: "GitHub", handle: "github.com/nonoyj", url: profile.socials.github },
    { icon: LinkedinIcon, label: "LinkedIn", handle: "in/j-rome-de-la-cruz", url: profile.socials.linkedin },
    { icon: FacebookIcon, label: "Facebook", handle: "fb.com/hicbazzuka", url: profile.socials.facebook },
    { icon: Mail, label: "Email", handle: profile.email, url: `mailto:${profile.email}` },
  ];

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="contact"
          title="Let's Build Something"
          accent="Together"
          sub="Internships, freelance work, collabs — or just talking shop about code and guitar tones."
        />

        <div className="contact-grid">
          <motion.div {...fadeUp}>
            <div className="card contact-direct">
              <h3><Mail size={15} /> direct.contact</h3>
              <button type="button" className="email-line" onClick={copyEmail} title="Click to copy">
                <span className="tok-var">email:</span>
                <span className="email-addr">{profile.email}</span>
                {copied ? <Check size={14} className="copy-ic ok" /> : <Copy size={14} className="copy-ic" />}
              </button>
              <div className="contact-loc">
                <MapPin size={14} /> {profile.location} — usually awake, always caffeinated.
              </div>
            </div>

            <div className="social-list">
              {socials.map((s) => (
                <a key={s.label} className="social-item" href={s.url} target="_blank" rel="noopener noreferrer">
                  <span className="social-icon"><s.icon size={17} /></span>
                  <span>
                    <span className="social-label">{s.label}</span>
                    <span className="social-handle">{s.handle}</span>
                  </span>
                  <span className="social-arrow">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form className="card contact-form" onSubmit={submit} {...fadeUp}>
            <input
              type="text"
              name="_honey"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              className="hp-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label><span className="tok-kw">const</span> name =</label>
            <input placeholder='"Your Name"' value={form.name} maxLength={80} autoComplete="name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label><span className="tok-kw">const</span> email =</label>
            <input type="email" placeholder='"you@example.com"' value={form.email} maxLength={120} autoComplete="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label><span className="tok-kw">const</span> message =</label>
            <textarea rows={5} placeholder="// hi j'rome, let's work on…" value={form.message} maxLength={2000} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={status?.kind === "sending"}
            >
              <Send size={15} />
              {status?.kind === "sending" ? "sending…" : "send_message();"}
            </button>
            <div className={`form-status ${status?.kind ?? ""}`} role="status" aria-live="polite">{status?.msg}</div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
export function Footer({ onTop, progress }: { onTop: () => void; progress: MotionValue<number> }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-note tok-com">{"// designed & built by J'rome A. De la Cruz — React + TypeScript"}</div>
        <div className="footer-actions">
          <button type="button" className="top-btn" onClick={onTop} title="Back to top" aria-label="Back to top">
            <svg className="top-ring" viewBox="0 0 36 36" aria-hidden="true">
              <circle className="top-ring-bg" cx="18" cy="18" r="16" />
              <motion.circle
                className="top-ring-fg"
                cx="18"
                cy="18"
                r="16"
                style={{ pathLength: progress }}
              />
            </svg>
            <ArrowUp size={15} className="top-arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* (Editor Mode removed — all content is managed in src/data/portfolio.ts) */
