import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import Nav, { SECTION_IDS, type SectionId } from "./components/Nav";
import { Hero, About, Stack, Experience, Projects, Education, Contact, Footer, EditorModal } from "./components/sections";
import EditorGate from "./components/EditorGate";
import { useContent } from "./hooks/useContent";

export default function App() {
  const { content, save, reset, hasOverrides } = useContent();

  /* Editor Mode (admin) */
  const [editorUnlocked, setEditorUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const handleEnterEditor = useCallback(() => {
    if (editorUnlocked) setEditorOpen(true);
    else setGateOpen(true);
  }, [editorUnlocked]);

  const handleUnlock = useCallback(() => {
    setEditorUnlocked(true);
    setGateOpen(false);
    setEditorOpen(true);
  }, []);

  const handleExitEditor = useCallback(() => {
    setEditorUnlocked(false);
    setEditorOpen(false);
  }, []);

  /* lock page scroll while a modal is open */
  useEffect(() => {
    const locked = gateOpen || editorOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gateOpen, editorOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGateOpen(false);
        setEditorOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  /* cursor-follow glow (desktop) */
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  /* scroll spy for nav */
  const [active, setActive] = useState<SectionId | "home">("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActive(SECTION_IDS.includes(id as SectionId) ? id : "home");
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const home = document.getElementById("home");
    if (home) obs.observe(home);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page">
      <motion.div className="cursor-glow" style={{ x: mx, y: my }} aria-hidden="true" />
      <motion.div className="progress-bar" style={{ scaleX: progress }} aria-hidden="true" />

      <Nav active={active} onEditorClick={handleEnterEditor} />

      <main>
        <Hero />
        <About />
        <Stack content={content} />
        <Experience content={content} />
        <Projects />
        <Education content={content} onEnterEditor={handleEnterEditor} />
        <Contact />
      </main>

      <Footer onEditorClick={handleEnterEditor} onTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

      <EditorModal
        open={editorOpen}
        content={content}
        save={save}
        reset={reset}
        hasOverrides={hasOverrides}
        onClose={() => setEditorOpen(false)}
        onExit={handleExitEditor}
      />

      <EditorGate open={gateOpen} onClose={() => setGateOpen(false)} onUnlock={handleUnlock} />
    </div>
  );
}
