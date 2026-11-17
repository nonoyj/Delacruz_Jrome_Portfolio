import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FilePlus2,
  FolderPlus,
  RefreshCw,
  MoreHorizontal,
  Search as SearchIcon,
  GitCommitHorizontal,
  CircleDot,
  ListTree,
  Clock3,
  Star,
} from "lucide-react";
import { FILES, FILE_ORDER, type FileId } from "../data/files";
import { projects } from "../data/portfolio";
import type { SidebarView } from "./ActivityBar";

interface Props {
  view: SidebarView;
  activeFile: FileId;
  onOpenFile: (id: FileId) => void;
  open?: boolean;
}

const COMMITS = [
  { msg: "feat: add interactive terminal", meta: "jrome · 2 hours ago" },
  { msg: "fix: purple accent contrast", meta: "jrome · yesterday" },
  { msg: "docs: update README with setup guide", meta: "jrome · 3 days ago" },
  { msg: "feat: command palette with fuzzy search", meta: "jrome · last week" },
];

const EXTENSIONS = [
  { name: "Purple Dark+", desc: "An elegant dark theme with purple accents. (This site)", meta: "1.2M downloads" },
  { name: "Portfolio Explorer", desc: "Turns your portfolio into a VS Code workspace.", meta: "48K downloads" },
  { name: "Terminal Playground", desc: "A fake terminal that actually responds to commands.", meta: "12K downloads" },
  { name: "Coffee Break", desc: "Reminds you to drink coffee. Essential for students.", meta: "900K downloads" },
];

export default function Sidebar({ view, activeFile, onOpenFile, open }: Props) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [outlineOpen, setOutlineOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = FILE_ORDER.filter((id) =>
    FILES[id].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      {view === "explorer" && (
        <>
          <div className="sidebar-header">
            <span>Explorer</span>
            <div className="header-actions">
              <button type="button" title="New File"><FilePlus2 size={15} /></button>
              <button type="button" title="New Folder"><FolderPlus size={15} /></button>
              <button type="button" title="Refresh"><RefreshCw size={14} /></button>
              <button type="button" title="More"><MoreHorizontal size={15} /></button>
            </div>
          </div>

          <div className="sidebar-scroll">
            <div
              className={`tree-section-title ${explorerOpen ? "" : "collapsed"}`}
              onClick={() => setExplorerOpen(!explorerOpen)}
            >
              <ChevronDown size={14} className="chevron" />
              PORTFOLIO
            </div>

            {explorerOpen && (
              <>
                {FILE_ORDER.map((id) => {
                  const file = FILES[id];
                  if (id === "projects") {
                    return (
                      <div key={id}>
                        <div
                          className={`tree-row ${activeFile === "projects" ? "active" : ""}`}
                          style={{ paddingLeft: 22 }}
                          onClick={() => {
                            setProjectsOpen((o) => !o);
                            onOpenFile("projects");
                          }}
                        >
                          <span className="tree-icon" style={{ color: file.color }}>
                            {projectsOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </span>
                          <span className="tree-icon" style={{ color: file.color }}>{file.icon}</span>
                          <span className="tree-label">{file.name}</span>
                          <span className="tree-meta">{projects.length}</span>
                        </div>
                        {projectsOpen &&
                          projects.map((p) => (
                            <div
                              key={p.name}
                              className="tree-row"
                              style={{ paddingLeft: 52 }}
                              onClick={() => onOpenFile("projects")}
                              title={p.name}
                            >
                              <span className="tree-icon" style={{ color: "#a78bfa" }}>
                                <CircleDot size={12} />
                              </span>
                              <span className="tree-label">{p.name.toLowerCase()}.tsx</span>
                            </div>
                          ))}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={id}
                      className={`tree-row ${activeFile === id ? "active" : ""}`}
                      style={{ paddingLeft: 34 }}
                      onClick={() => onOpenFile(id)}
                    >
                      <span className="tree-icon" style={{ color: file.color }}>{file.icon}</span>
                      <span className="tree-label">{file.name}</span>
                    </div>
                  );
                })}

                <div className="sidebar-note">
                  <strong>Psst — try this</strong>
                  Press <code>Ctrl</code> + <code>K</code> to open the command palette, or type{" "}
                  <code>help</code> in the terminal below.
                </div>
              </>
            )}

            <div
              className={`tree-section-title ${outlineOpen ? "" : "collapsed"}`}
              onClick={() => setOutlineOpen(!outlineOpen)}
              style={{ marginTop: 8 }}
            >
              <ChevronDown size={14} className="chevron" />
              OUTLINE
            </div>
            {outlineOpen && (
              <>
                <div className="outline-item" onClick={() => onOpenFile("welcome")}>
                  <ListTree size={13} /> Welcome
                </div>
                <div className="outline-item" onClick={() => onOpenFile("about")}>
                  <ListTree size={13} /> About
                </div>
                <div className="outline-item" onClick={() => onOpenFile("skills")}>
                  <ListTree size={13} /> Skills
                </div>
                <div className="outline-item" onClick={() => onOpenFile("projects")}>
                  <ListTree size={13} /> Projects
                </div>
                <div className="outline-item" onClick={() => onOpenFile("experience")}>
                  <ListTree size={13} /> Experience
                </div>
                <div className="outline-item" onClick={() => onOpenFile("contact")}>
                  <ListTree size={13} /> Contact
                </div>
              </>
            )}

            <div className="tree-section-title" style={{ marginTop: 8 }}>
              <ChevronDown size={14} className="chevron" />
              TIMELINE
            </div>
            <div className="outline-item">
              <Clock3 size={13} /> 2025 — building this site
            </div>
            <div className="outline-item">
              <Clock3 size={13} /> 2024 — first hackathon
            </div>
            <div className="outline-item">
              <Clock3 size={13} /> 2023 — first line of code
            </div>
          </div>
        </>
      )}

      {view === "search" && (
        <>
          <div className="sidebar-header"><span>Search</span></div>
          <div className="panel-search-input">
            <SearchIcon size={14} color="#858585" />
            <input
              placeholder="Search files…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sidebar-scroll">
            <div className="tree-section-title">
              <ChevronDown size={14} className="chevron" />
              {searchResults.length} RESULT{searchResults.length === 1 ? "" : "S"}
            </div>
            {searchResults.map((id) => (
              <div
                key={id}
                className={`tree-row ${activeFile === id ? "active" : ""}`}
                style={{ paddingLeft: 22 }}
                onClick={() => onOpenFile(id)}
              >
                <span className="tree-icon" style={{ color: FILES[id].color }}>{FILES[id].icon}</span>
                <span className="tree-label">{FILES[id].name}</span>
              </div>
            ))}
            {searchResults.length === 0 && (
              <div style={{ padding: "10px 22px", fontSize: 12.5, color: "#858585" }}>
                No files match “{searchQuery}”.
              </div>
            )}
          </div>
        </>
      )}

      {view === "git" && (
        <>
          <div className="sidebar-header"><span>Source Control</span></div>
          <div className="sidebar-scroll">
            <div className="tree-section-title">
              <ChevronDown size={14} className="chevron" />
              CHANGES — 3
            </div>
            {["portfolio.ts (modified)", "index.css (modified)", "README.md (untracked)"].map((f) => (
              <div key={f} className="tree-row" style={{ paddingLeft: 22 }}>
                <span className="tree-label" style={{ fontSize: 12.5 }}>{f}</span>
              </div>
            ))}
            <div className="tree-section-title" style={{ marginTop: 10 }}>
              <ChevronDown size={14} className="chevron" />
              HISTORY
            </div>
            {COMMITS.map((c) => (
              <div key={c.msg} className="commit-item">
                <div className="commit-msg">
                  <GitCommitHorizontal size={13} color="#a78bfa" />
                  {c.msg}
                </div>
                <div className="commit-meta">{c.meta}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "extensions" && (
        <>
          <div className="sidebar-header"><span>Extensions</span></div>
          <div className="sidebar-scroll">
            <div className="tree-section-title">
              <ChevronDown size={14} className="chevron" />
              INSTALLED
            </div>
            {EXTENSIONS.map((e) => (
              <div key={e.name} className="ext-item">
                <div className="ext-icon"><Star size={16} /></div>
                <div>
                  <div className="ext-name">{e.name}</div>
                  <div className="ext-desc">{e.desc}</div>
                  <div className="ext-meta">{e.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
