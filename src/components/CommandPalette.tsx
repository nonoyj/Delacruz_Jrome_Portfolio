import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TerminalSquare, Copy, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import { FILES, FILE_ORDER, type FileId } from "../data/files";
import { profile } from "../data/portfolio";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenFile: (id: FileId) => void;
  onToggleTerminal: () => void;
}

export default function CommandPalette({ open, onClose, onOpenFile, onToggleTerminal }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = useMemo(() => {
    const fileCmds: Command[] = FILE_ORDER.map((id) => ({
      id: `file-${id}`,
      label: `Go to File: ${FILES[id].name}`,
      hint: FILES[id].path.join(" / "),
      icon: <span style={{ color: FILES[id].color }}>{FILES[id].icon}</span>,
      run: () => onOpenFile(id),
    }));
    return [
      ...fileCmds,
      {
        id: "action-terminal",
        label: "Toggle Terminal",
        hint: "Ctrl+`",
        icon: <TerminalSquare size={15} />,
        run: onToggleTerminal,
      },
      {
        id: "action-copy-email",
        label: "Copy Email Address",
        hint: profile.email,
        icon: <Copy size={15} />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => {});
        },
      },
      {
        id: "action-github",
        label: "Open GitHub Profile",
        hint: "github.com",
        icon: <GithubIcon size={15} />,
        run: () => window.open(profile.socials.github, "_blank", "noopener"),
      },
      {
        id: "action-linkedin",
        label: "Open LinkedIn Profile",
        hint: "linkedin.com",
        icon: <ArrowUpRight size={15} />,
        run: () => window.open(profile.socials.linkedin, "_blank", "noopener"),
      },
    ];
  }, [onOpenFile, onToggleTerminal]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open ]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>("[data-selected='true']");
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runSelected = () => {
    const cmd = filtered[selected];
    if (cmd) {
      cmd.run();
      onClose();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelected();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="palette"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input-row">
              <Search size={16} />
              <input
                ref={inputRef}
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="palette-list" ref={listRef}>
              {filtered.map((cmd, i) => (
                <div
                  key={cmd.id}
                  className={`palette-item ${i === selected ? "selected" : ""}`}
                  data-selected={i === selected}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => {
                    setSelected(i);
                    cmd.run();
                    onClose();
                  }}
                >
                  <span className="p-icon">{cmd.icon}</span>
                  <span>{cmd.label}</span>
                  <span className="p-hint">{cmd.hint}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="palette-empty">
                  No results for “{query}”. Try “projects” or “terminal”.
                </div>
              )}
            </div>
            <div className="palette-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
