import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import MobileBar from "./components/MobileBar";
import { SECTION_IDS, type SectionId } from "./data/sections";
import { Hero, About, Stack, Experience, Projects, Education, Contact, Footer } from "./components/sections";
import { defaultContent } from "./data/portfolio";

export default function App() {
  const content = defaultContent;

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

      <Nav active={active} />

      <main>
        <Hero />
        <About />
        <Stack content={content} />
        <Experience content={content} />
        <Projects />
        <Education content={content} />
        <Contact />
      </main>

      <Footer onTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} progress={progress} />

      <MobileBar active={active} />
    </div>
  );
}
