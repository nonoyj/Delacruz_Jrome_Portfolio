import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle } from "lucide-react";
import { FILES, type FileId } from "../data/files";
import { FileView, LineNumbers, GUTTER_LINES } from "./content";

interface Props {
  openTabs: FileId[];
  activeFile: FileId;
  onSelectTab: (id: FileId) => void;
  onCloseTab: (id: FileId) => void;
  onOpenFile: (id: FileId) => void;
  onLineChange: (n: number) => void;
}

export default function EditorArea({ openTabs, activeFile, onSelectTab, onCloseTab, onOpenFile, onLineChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const file = FILES[activeFile];
  const crumbs = ["portfolio", "src", ...file.path.slice(0, -1), file.name];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const line = max > 0 ? Math.min(999, Math.max(1, Math.round((el.scrollTop / max) * (GUTTER_LINES[activeFile] - 10)) + 1)) : 1;
    onLineChange(line);
  };

  return (
    <section className="editor-area">
      <div className="tabbar" role="tablist">
        {openTabs.map((id) => {
          const f = FILES[id];
          return (
            <div
              key={id}
              role="tab"
              aria-selected={id === activeFile}
              className={`tab ${id === activeFile ? "active" : ""}`}
              onClick={() => onSelectTab(id)}
            >
              <span className="tab-icon" style={{ color: f.color }}>{f.icon}</span>
              <span>{f.name}</span>
              <button
                type="button"
                className="tab-close"
                title={openTabs.length === 1 ? "At least one tab must stay open" : "Close tab"}
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(id);
                }}
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="breadcrumb">
        {crumbs.map((c, i) => (
          <span key={`${c}-${i}`} className={`crumb ${i === crumbs.length - 1 ? "current" : ""}`}>
            {c}
            {i < crumbs.length - 1 && <span className="sep">›</span>}
          </span>
        ))}
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, color: "var(--text-faint)", fontSize: 11 }}>
          <Circle size={7} fill="var(--accent)" color="var(--accent)" /> unsaved changes (they're features)
        </span>
      </div>

      <div className="editor-scroll" ref={scrollRef} onScroll={handleScroll}>
        <div className="editor-inner">
          <LineNumbers count={GUTTER_LINES[activeFile]} />
          <div className="editor-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <FileView id={activeFile} onOpenFile={onOpenFile} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
