import { Files, Search, GitBranch, Blocks, UserCircle, Settings, TerminalSquare } from "lucide-react";

export type SidebarView = "explorer" | "search" | "git" | "extensions" | "admin";

interface Props {
  view: SidebarView;
  onChangeView: (v: SidebarView) => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
  editorUnlocked: boolean;
  onUserClick: () => void;
}

export default function ActivityBar({ view, onChangeView, terminalOpen, onToggleTerminal, editorUnlocked, onUserClick }: Props) {
  const items: { id: SidebarView; icon: React.ReactNode; label: string; badge?: string }[] = [
    { id: "explorer", icon: <Files size={24} />, label: "Explorer (Ctrl+Shift+E)" },
    { id: "search", icon: <Search size={24} />, label: "Search (Ctrl+Shift+F)" },
    { id: "git", icon: <GitBranch size={24} />, label: "Source Control (Ctrl+Shift+G)", badge: "3" },
    { id: "extensions", icon: <Blocks size={24} />, label: "Extensions (Ctrl+Shift+X)" },
  ];

  return (
    <div className="activitybar">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={view === item.id ? "active" : ""}
          onClick={() => onChangeView(item.id)}
          title={item.label}
        >
          {item.icon}
          {item.badge && <span className="badge">{item.badge}</span>}
        </button>
      ))}

      <button
        type="button"
        className={terminalOpen ? "active" : ""}
        onClick={onToggleTerminal}
        title="Toggle Terminal (Ctrl+`)"
      >
        <TerminalSquare size={24} />
      </button>

      <div className="spacer" />

      <button
        type="button"
        className={`admin-btn ${editorUnlocked ? "unlocked" : ""} ${view === "admin" ? "active" : ""}`}
        onClick={onUserClick}
        title={editorUnlocked ? "Editor Mode — open editor.config" : "Editor Mode — sign in (J'rome only)"}
      >
        <UserCircle size={24} />
        {editorUnlocked && <span className="admin-dot" />}
      </button>
      <button type="button" title="Settings (purple, obviously)">
        <Settings size={24} />
      </button>
    </div>
  );
}
