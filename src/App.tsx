import { useCallback, useEffect, useState } from "react";
import { PanelLeft } from "lucide-react";
import TitleBar from "./components/TitleBar";
import ActivityBar, { type SidebarView } from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorArea from "./components/EditorArea";
import Terminal from "./components/Terminal";
import StatusBar from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import EditorGate from "./components/EditorGate";
import { useContent } from "./hooks/useContent";
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

  /* Editor Mode (admin) */
  const { content, save, reset, hasOverrides } = useContent();
  const [editorUnlocked, setEditorUnlocked] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const openFile = useCallback(
    (id: FileId) => {
      if (id === "editor" && !editorUnlocked) {
        setGateOpen(true);
        return;
      }
      setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
      setActiveFile(id);
      setMobileSidebar(false);
    },
    [editorUnlocked]
  );

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

  /* Editor Mode handlers */
  const handleUnlock = useCallback(() => {
    setEditorUnlocked(true);
    setGateOpen(false);
    setOpenTabs((tabs) => (tabs.includes("editor") ? tabs : [...tabs, "editor"]));
    setActiveFile("editor");
    setView("admin");
  }, []);

  const handleEnterEditor = useCallback(() => {
    if (editorUnlocked) {
      handleUnlock();
    } else {
      setGateOpen(true);
    }
  }, [editorUnlocked, handleUnlock]);

  const handleExitEditor = useCallback(() => {
    setEditorUnlocked(false);
    setOpenTabs((tabs) => {
      const next = tabs.filter((t) => t !== "editor");
      if (activeFile === "editor") setActiveFile(next[0] ?? "welcome");
      return next.length ? next : ["welcome"];
    });
    setView("explorer");
  }, [activeFile]);

  const handleUserClick = useCallback(() => {
    if (editorUnlocked) {
      handleEnterEditor();
    } else {
      setGateOpen(true);
    }
  }, [editorUnlocked, handleEnterEditor]);

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
        setGateOpen(false);
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
          editorUnlocked={editorUnlocked}
          onUserClick={handleUserClick}
        />

        {showSidebar && (
          <Sidebar
            view={view}
            activeFile={activeFile}
            onOpenFile={openFile}
            open={mobileSidebar}
            editorUnlocked={editorUnlocked}
            onEditorClick={() => openFile("editor")}
          />
        )}

        <EditorArea
          openTabs={openTabs}
          activeFile={activeFile}
          onSelectTab={selectTab}
          onCloseTab={closeTab}
          onOpenFile={openFile}
          onLineChange={setLine}
          content={content}
          editor={{ save, reset, hasOverrides, onExit: handleExitEditor, onEnter: handleEnterEditor }}
        />
      </div>

      {terminalOpen && (
        <Terminal
          onOpenFile={openFile}
          onClose={() => setTerminalOpen(false)}
          onEnterEditor={handleEnterEditor}
          content={content}
        />
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
        editorUnlocked={editorUnlocked}
        onEnterEditor={handleEnterEditor}
        onExitEditor={handleExitEditor}
      />

      <EditorGate open={gateOpen} onClose={() => setGateOpen(false)} onUnlock={handleUnlock} />
    </div>
  );
}
