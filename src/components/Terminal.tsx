import { useEffect, useRef, useState } from "react";
import { X, Trash2, Plus } from "lucide-react";
import { profile } from "../data/portfolio";
import type { FileId } from "../data/files";

interface Line {
  text: string;
  kind: "cmd" | "out" | "ok" | "err";
}

interface Props {
  onOpenFile: (id: FileId) => void;
  onClose: () => void;
  onEnterEditor: () => void;
  content: {
    skills: { title: string }[];
    experiences: { role: string; date: string }[];
    certifications: { name: string; issuer: string; year: string }[];
    education: { degree: string; period: string }[];
  };
}

const WELCOME: Line[] = [
  { text: "JromeOS Terminal — zsh", kind: "out" },
  { text: "Type 'help' to see available commands.", kind: "out" },
];

const HELP: Line[] = [
  { text: "Available commands:", kind: "out" },
  { text: "  about        → open about.tsx", kind: "out" },
  { text: "  skills       → open skills.json", kind: "out" },
  { text: "  projects     → open projects/", kind: "out" },
  { text: "  experience   → open experience.md", kind: "out" },
  { text: "  education    → open education.md", kind: "out" },
  { text: "  certs        → open certifications.json", kind: "out" },
  { text: "  contact      → open contact.ts", kind: "out" },
  { text: "  open <file>  → open a file (e.g. open projects)", kind: "out" },
  { text: "  editor       → Editor Mode (J'rome only 🔒)", kind: "out" },
  { text: "  whoami       → who is J'rome?", kind: "out" },
  { text: "  music        → current signal chain 🎸", kind: "out" },
  { text: "  socials      → links to GitHub / LinkedIn", kind: "out" },
  { text: "  clear        → clear the terminal", kind: "out" },
];

export default function Terminal({ onOpenFile, onClose, onEnterEditor, content }: Props) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const print = (newLines: Line[]) => setLines((l) => [...l, ...newLines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    print([{ text: `jrome@portfolio:~$ ${cmd}`, kind: "cmd" }]);
    if (!cmd) return;

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();

    switch (head.toLowerCase()) {
      case "help":
        print(HELP);
        break;
      case "clear":
        setLines([]);
        break;
      case "whoami":
        print([
          { text: `${profile.name} — ${profile.role}`, kind: "ok" },
          { text: `${profile.location} · ${profile.availability}`, kind: "out" },
        ]);
        break;
      case "about":
        onOpenFile("about");
        print([{ text: "Opening about.tsx…", kind: "ok" }]);
        break;
      case "skills":
        onOpenFile("skills");
        print([
          { text: "Opening skills.json…", kind: "ok" },
          { text: content.skills.map((c) => c.title).join(" · "), kind: "out" },
        ]);
        break;
      case "projects":
        onOpenFile("projects");
        print([
          { text: "Opening projects/…", kind: "ok" },
          { text: "  ▸ mindful-minute.tsx (2026)", kind: "out" },
          { text: "  ▸ m-gear-iloilo.tsx (2026)", kind: "out" },
          { text: "  ▸ mywarehouse-inventory.tsx (2026)", kind: "out" },
          { text: "  ▸ evolverse.tsx — collab (2026)", kind: "out" },
        ]);
        break;
      case "experience":
        onOpenFile("experience");
        print([
          { text: "Opening experience.md…", kind: "ok" },
          ...content.experiences.slice(0, 3).map((x) => ({ text: `  • ${x.date} — ${x.role}`, kind: "out" as const })),
        ]);
        break;
      case "education":
        onOpenFile("education");
        print([
          { text: "Opening education.md…", kind: "ok" },
          ...content.education.map((x) => ({ text: `  • ${x.period} — ${x.degree}`, kind: "out" as const })),
        ]);
        break;
      case "certs":
      case "certifications":
        onOpenFile("certifications");
        print([
          { text: "Opening certifications.json…", kind: "ok" },
          ...(content.certifications.length
            ? content.certifications.map((c) => ({ text: `  • ${c.name} (${c.issuer}, ${c.year})`, kind: "out" as const }))
            : [{ text: "  (empty — add some in Editor Mode)", kind: "out" as const }]),
        ]);
        break;
      case "contact":
        onOpenFile("contact");
        print([
          { text: "Opening contact.ts…", kind: "ok" },
          { text: `  Email: ${profile.email}`, kind: "out" },
        ]);
        break;
      case "editor":
        print([{ text: "Opening Editor Mode… (passcode required)", kind: "ok" }]);
        onEnterEditor();
        break;
      case "open": {
        const map: Record<string, FileId> = {
          welcome: "welcome",
          about: "about",
          skills: "skills",
          projects: "projects",
          experience: "experience",
          education: "education",
          certifications: "certifications",
          certs: "certifications",
          contact: "contact",
        };
        const target = map[arg];
        if (target) {
          onOpenFile(target);
          print([{ text: `Opening ${arg}…`, kind: "ok" }]);
        } else {
          print([{ text: `open: no such file '${arg}'. Try: welcome, about, skills, projects, experience, education, certs, contact`, kind: "err" }]);
        }
        break;
      }
      case "music":
        print([
          { text: "🎸 Signal chain: Guitar → Tuner → Overdrive → Delay → Amp", kind: "out" },
          { text: "Tone of the day: 'that one' — you know the one.", kind: "ok" },
        ]);
        break;
      case "socials":
        print([
          { text: `  GitHub:   github.com/nonoyj`, kind: "out" },
          { text: `  LinkedIn: in/j-rome-de-la-cruz`, kind: "out" },
          { text: `  Facebook: fb.com/hicbazzuka`, kind: "out" },
          { text: `  Email:    ${profile.email}`, kind: "out" },
        ]);
        break;
      case "ls":
        print([{ text: "welcome.tsx  about.tsx  skills.json  projects/  experience.md  education.md  certifications.json  contact.ts", kind: "out" }]);
        break;
      case "sudo":
        print([{ text: "Nice try. This user has no sudo privileges (or mercy).", kind: "err" }]);
        break;
      case "exit":
        print([{ text: "logout — just kidding, you can't leave. Use the X button.", kind: "out" }]);
        break;
      case "date":
        print([{ text: new Date().toString(), kind: "out" }]);
        break;
      default:
        print([
          { text: `zsh: command not found: ${head}`, kind: "err" },
          { text: "Type 'help' for available commands.", kind: "out" },
        ]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) {
        const next = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? history[next] : "");
    }
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-tabs">
        <span className="ttab">Problems</span>
        <span className="ttab">Output</span>
        <span className="ttab active">Terminal</span>
        <div className="t-actions">
          <button type="button" title="New terminal" onClick={() => print([{ text: "New terminal session started.", kind: "out" }])}>
            <Plus size={14} />
          </button>
          <button type="button" title="Kill terminal" onClick={() => setLines([])}>
            <Trash2 size={13} />
          </button>
          <button type="button" title="Close panel" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <div key={i} className="term-line">
            {l.kind === "cmd" ? (
              <>
                <span className="term-prompt">jrome@portfolio:~$</span>{" "}
                <span className="term-cmd">{l.text.replace(/^jrome@portfolio:~\$ /, "")}</span>
              </>
            ) : (
              <span className={l.kind === "err" ? "term-out" : l.kind === "ok" ? "term-out ok" : "term-out"}>
                {l.text}
              </span>
            )}
          </div>
        ))}
        <div className="term-line term-input-row">
          <span className="term-prompt">jrome@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
