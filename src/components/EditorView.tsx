import { useState } from "react";
import {
  Download,
  RotateCcw,
  LogOut,
  Code2,
  Layers,
  Award,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import type { EditableContent, SkillCategory, TechItem, Certification, ExperienceItem, EducationItem } from "../data/portfolio";

interface Props {
  content: EditableContent;
  save: (patch: Partial<EditableContent>) => void;
  reset: () => void;
  hasOverrides: boolean;
  onExit: () => void;
}

function Section({
  icon,
  title,
  hint,
  onAdd,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="ed-section">
      <div className="ed-section-head">
        <div className="ed-section-title">
          {icon}
          <span>{title}</span>
        </div>
        <button type="button" className="ed-btn" onClick={onAdd}>
          <Plus size={13} /> Add
        </button>
      </div>
      <div className="ed-hint">{hint}</div>
      {children}
    </section>
  );
}

function DelButton({ onClick, title }: { onClick: () => void; title?: string }) {
  return (
    <button type="button" className="ed-del" onClick={onClick} title={title ?? "Delete item"}>
      <Trash2 size={13} />
    </button>
  );
}

const inputStyle = "ed-input";

export default function EditorView({ content, save, reset, hasOverrides, onExit }: Props) {
  const [savedFlash, setSavedFlash] = useState(false);

  const flash = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  };

  const setSkills = (next: SkillCategory[]) => {
    save({ skills: next });
    flash();
  };
  const setTech = (next: TechItem[]) => {
    save({ techStack: next });
    flash();
  };
  const setCerts = (next: Certification[]) => {
    save({ certifications: next });
    flash();
  };
  const setExp = (next: ExperienceItem[]) => {
    save({ experiences: next });
    flash();
  };
  const setEdu = (next: EducationItem[]) => {
    save({ education: next });
    flash();
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDefaults = () => {
    if (window.confirm("Reset all content to the defaults from portfolio.ts? Local edits will be lost.")) {
      reset();
    }
  };

  return (
    <div className="editor-view">
      <div className="ed-toolbar">
        <div>
          <div className="ed-toolbar-title">
            <span className="tok-kw">editor.config</span> — signed in as{" "}
            <span className="ed-me">J'rome</span>
          </div>
          <div className="ed-toolbar-note">
            <Info size={12} />
            Changes save instantly to <strong>this browser</strong> only. Export JSON to
            publish them into <code>src/data/portfolio.ts</code>.
          </div>
        </div>
        <div className="ed-toolbar-actions">
          {savedFlash && <span className="ed-saved">✓ saved</span>}
          {hasOverrides && <span className="ed-chip-live">local edits active</span>}
          <button type="button" className="ed-btn" onClick={exportJson}>
            <Download size={13} /> Export JSON
          </button>
          <button type="button" className="ed-btn" onClick={resetDefaults}>
            <RotateCcw size={13} /> Reset
          </button>
          <button type="button" className="ed-btn ed-btn-exit" onClick={onExit}>
            <LogOut size={13} /> Exit Editor Mode
          </button>
        </div>
      </div>

      {/* ---------------- Skills ---------------- */}
      <Section
        icon={<Code2 size={14} />}
        title="skills — categories with bars"
        hint="Shown on skills.json. Level 0–100 drives the bar width."
        onAdd={() =>
          setSkills([...content.skills, { title: "New Category", skills: [{ name: "New Skill", level: 50 }] }])
        }
      >
        {content.skills.map((cat, ci) => (
          <div key={ci} className="ed-item">
            <div className="ed-item-top">
              <input
                className={inputStyle}
                value={cat.title}
                onChange={(e) => {
                  const next = content.skills.map((c, i) => (i === ci ? { ...c, title: e.target.value } : c));
                  setSkills(next);
                }}
                placeholder="Category title"
              />
              <DelButton
                title="Delete category"
                onClick={() => setSkills(content.skills.filter((_, i) => i !== ci))}
              />
            </div>
            {cat.skills.map((s, si) => (
              <div key={si} className="ed-row">
                <input
                  className={inputStyle}
                  style={{ flex: 2 }}
                  value={s.name}
                  onChange={(e) => {
                    const next = content.skills.map((c, i) =>
                      i === ci ? { ...c, skills: c.skills.map((x, j) => (j === si ? { ...x, name: e.target.value } : x)) } : c
                    );
                    setSkills(next);
                  }}
                  placeholder="Skill name"
                />
                <input
                  className={inputStyle}
                  style={{ flex: 0, width: 70 }}
                  type="number"
                  min={0}
                  max={100}
                  value={s.level}
                  onChange={(e) => {
                    const lvl = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                    const next = content.skills.map((c, i) =>
                      i === ci ? { ...c, skills: c.skills.map((x, j) => (j === si ? { ...x, level: lvl } : x)) } : c
                    );
                    setSkills(next);
                  }}
                />
                <DelButton
                  title="Delete skill"
                  onClick={() =>
                    setSkills(
                      content.skills.map((c, i) =>
                        i === ci ? { ...c, skills: c.skills.filter((_, j) => j !== si) } : c
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="ed-btn ed-btn-sm"
              onClick={() => {
                const next = content.skills.map((c, i) =>
                  i === ci ? { ...c, skills: [...c.skills, { name: "New Skill", level: 50 }] } : c
                );
                setSkills(next);
              }}
            >
              <Plus size={12} /> skill
            </button>
          </div>
        ))}
      </Section>

      {/* ---------------- Tech stack ---------------- */}
      <Section
        icon={<Layers size={14} />}
        title="tech_stack — chips"
        hint="The badge cloud under your skills. Category groups the chips."
        onAdd={() => setTech([...content.techStack, { name: "New Tech", category: "Other" }])}
      >
        <div className="ed-grid">
          {content.techStack.map((t, i) => (
            <div key={i} className="ed-row">
              <input
                className={inputStyle}
                style={{ flex: 2 }}
                value={t.name}
                onChange={(e) => setTech(content.techStack.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                placeholder="Name"
              />
              <input
                className={inputStyle}
                style={{ flex: 1 }}
                value={t.category}
                onChange={(e) => setTech(content.techStack.map((x, j) => (j === i ? { ...x, category: e.target.value } : x)))}
                placeholder="Category"
              />
              <DelButton onClick={() => setTech(content.techStack.filter((_, j) => j !== i))} />
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Certifications ---------------- */}
      <Section
        icon={<Award size={14} />}
        title="certifications"
        hint="Certificates, awards, completed courses. Shown on certifications.json."
        onAdd={() =>
          setCerts([...content.certifications, { name: "New Certification", issuer: "Issuer", year: "2026", link: "" }])
        }
      >
        {content.certifications.length === 0 && (
          <div className="ed-empty">No certifications yet — click “Add” to create your first.</div>
        )}
        {content.certifications.map((c, i) => (
          <div key={i} className="ed-item">
            <div className="ed-item-top">
              <input
                className={inputStyle}
                style={{ flex: 2 }}
                value={c.name}
                onChange={(e) => setCerts(content.certifications.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                placeholder="Certification name"
              />
              <DelButton onClick={() => setCerts(content.certifications.filter((_, j) => j !== i))} />
            </div>
            <div className="ed-row">
              <input
                className={inputStyle}
                style={{ flex: 1.5 }}
                value={c.issuer}
                onChange={(e) => setCerts(content.certifications.map((x, j) => (j === i ? { ...x, issuer: e.target.value } : x)))}
                placeholder="Issuer"
              />
              <input
                className={inputStyle}
                style={{ flex: 0, width: 90 }}
                value={c.year}
                onChange={(e) => setCerts(content.certifications.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))}
                placeholder="Year"
              />
              <input
                className={inputStyle}
                style={{ flex: 2 }}
                value={c.link ?? ""}
                onChange={(e) => setCerts(content.certifications.map((x, j) => (j === i ? { ...x, link: e.target.value } : x)))}
                placeholder="https://credential-url (optional)"
              />
            </div>
          </div>
        ))}
      </Section>

      {/* ---------------- Experiences ---------------- */}
      <Section
        icon={<Briefcase size={14} />}
        title="experiences — timeline entries"
        hint="Shown on experience.md, newest first."
        onAdd={() =>
          setExp([{ date: "2026", role: "New role", org: "Org / project", description: "What you did and learned." }, ...content.experiences])
        }
      >
        {content.experiences.map((x, i) => (
          <div key={i} className="ed-item">
            <div className="ed-item-top">
              <input
                className={inputStyle}
                style={{ flex: 0, width: 130 }}
                value={x.date}
                onChange={(e) => setExp(content.experiences.map((y, j) => (j === i ? { ...y, date: e.target.value } : y)))}
                placeholder="Date"
              />
              <input
                className={inputStyle}
                style={{ flex: 1.5 }}
                value={x.role}
                onChange={(e) => setExp(content.experiences.map((y, j) => (j === i ? { ...y, role: e.target.value } : y)))}
                placeholder="Role / title"
              />
              <DelButton onClick={() => setExp(content.experiences.filter((_, j) => j !== i))} />
            </div>
            <div className="ed-row">
              <input
                className={inputStyle}
                style={{ flex: 1 }}
                value={x.org}
                onChange={(e) => setExp(content.experiences.map((y, j) => (j === i ? { ...y, org: e.target.value } : y)))}
                placeholder="Org / project"
              />
            </div>
            <textarea
              className={`${inputStyle} ed-textarea`}
              rows={2}
              value={x.description}
              onChange={(e) => setExp(content.experiences.map((y, j) => (j === i ? { ...y, description: e.target.value } : y)))}
              placeholder="Description"
            />
          </div>
        ))}
      </Section>

      {/* ---------------- Education ---------------- */}
      <Section
        icon={<GraduationCap size={14} />}
        title="education"
        hint="Your schools and degrees. Shown on education.md."
        onAdd={() =>
          setEdu([
            ...content.education,
            { period: "Period", degree: "Degree", school: "School", description: "Details." },
          ])
        }
      >
        {content.education.map((x, i) => (
          <div key={i} className="ed-item">
            <div className="ed-item-top">
              <input
                className={inputStyle}
                style={{ flex: 0, width: 130 }}
                value={x.period}
                onChange={(e) => setEdu(content.education.map((y, j) => (j === i ? { ...y, period: e.target.value } : y)))}
                placeholder="Period"
              />
              <input
                className={inputStyle}
                style={{ flex: 1.5 }}
                value={x.degree}
                onChange={(e) => setEdu(content.education.map((y, j) => (j === i ? { ...y, degree: e.target.value } : y)))}
                placeholder="Degree / program"
              />
              <DelButton onClick={() => setEdu(content.education.filter((_, j) => j !== i))} />
            </div>
            <div className="ed-row">
              <input
                className={inputStyle}
                style={{ flex: 1 }}
                value={x.school}
                onChange={(e) => setEdu(content.education.map((y, j) => (j === i ? { ...y, school: e.target.value } : y)))}
                placeholder="School"
              />
            </div>
            <textarea
              className={`${inputStyle} ed-textarea`}
              rows={2}
              value={x.description}
              onChange={(e) => setEdu(content.education.map((y, j) => (j === i ? { ...y, description: e.target.value } : y)))}
              placeholder="Description"
            />
          </div>
        ))}
      </Section>
    </div>
  );
}
