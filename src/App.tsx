import { useCallback, useEffect, useState } from "react";
import { PanelLeft } from "lucide-react";
import TitleBar from "./components/TitleBar";
import ActivityBar, { type SidebarView } from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorArea from "./components/EditorArea";
import Terminal from "./components/Terminal";
import StatusBar from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import type { FileId } from "./data/files";

export default function App() {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["welcome"]);
  const [activeFile, setActiveFile] = useState<FileId>("welcome");
  const [view, setView] = useState<SidebarView>("explorer");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [line, setLine] = useState(1);

  const openFile = useCallback((id: FileId) => {
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    setActiveFile(id);
    setMobileSidebar(false);
  }, []);

  const selectTab = useCallback((id: FileId) => setActiveFile(id), []);

  const closeTab = useCallback(
    (id: FileId) => {
      setOpenTabs((tabs) => {
        if (tabs.length === 1) return tabs;
        const idx = tabs.indexOf(id);
        const next = tabs.filter((t) => t !== id);
        if (id === activeFile) setActiveFile(next[Math.max(0, idx - 1)]);
        return next;
      });
    },
    [activeFile]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      } else if (mod && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((t) => !t);
      } else if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setShowSidebar((s) => !s);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="vscode-window">
      <TitleBar onOpenPalette={() => setPaletteOpen(true)} />

      <div className="main-row">
        <ActivityBar
          view={view}
          onChangeView={setView}
          terminalOpen={terminalOpen}
          onToggleTerminal={() => setTerminalOpen((t) => !t)}
        />

        {showSidebar && (
          <Sidebar view={view} activeFile={activeFile} onOpenFile={openFile} open={mobileSidebar} />
        )}

        <EditorArea
          openTabs={openTabs}
          activeFile={activeFile}
          onSelectTab={selectTab}
          onCloseTab={closeTab}
          onOpenFile={openFile}
          onLineChange={setLine}
        />
      </div>

      {terminalOpen && (
        <Terminal onOpenFile={openFile} onClose={() => setTerminalOpen(false)} />
      )}

      <StatusBar
        activeFile={activeFile}
        line={line}
        onToggleTerminal={() => setTerminalOpen((t) => !t)}
      />

      <button
        type="button"
        className="mobile-toggle"
        title="Toggle file explorer"
        onClick={() => setMobileSidebar((m) => !m)}
      >
        <PanelLeft size={20} />
      </button>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenFile={openFile}
        onToggleTerminal={() => setTerminalOpen((t) => !t)}
      />
    </div>
  );
}
