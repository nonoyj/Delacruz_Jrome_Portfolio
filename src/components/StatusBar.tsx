import { useEffect, useState } from "react";
import { GitBranch, RefreshCw, CircleCheck, CircleAlert, Bell, Sparkles } from "lucide-react";
import { FILES, type FileId } from "../data/files";

interface Props {
  activeFile: FileId;
  line: number;
  onToggleTerminal: () => void;
}

export default function StatusBar({ activeFile, line, onToggleTerminal }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="statusbar">
      <div className="sb-item" title="Remote: origin">
        <CircleCheck size={12} />
      </div>
      <div className="sb-item" title="Branch: main">
        <GitBranch size={12} />
        <span>main*</span>
      </div>
      <div className="sb-item" title="Sync changes">
        <RefreshCw size={11} />
        <span className="hide-mobile">0↓ 0↑</span>
      </div>
      <div className="sb-item" title="No problems detected">
        <CircleAlert size={12} />
        <span>0</span>
        <CircleAlert size={12} />
        <span>0</span>
      </div>

      <div className="sb-right">
        <div className="sb-item hide-mobile" title="Cursor position">
          <span>Ln {line}, Col 1</span>
        </div>
        <div className="sb-item hide-mobile" title="Indentation">
          <span>Spaces: 2</span>
        </div>
        <div className="sb-item hide-mobile" title="Encoding">
          <span>UTF-8</span>
        </div>
        <div className="sb-item" title="Language mode">
          <span>{FILES[activeFile].language}</span>
        </div>
        <div className="sb-item hide-mobile" title="Prettier: formatted">
          <Sparkles size={11} />
          <span>Prettier</span>
        </div>
        <div className="sb-item" onClick={onToggleTerminal} title="Toggle terminal (Ctrl+`)">
          <span>Terminal</span>
        </div>
        <div className="sb-item sb-clock" title="Local time">
          <span>{time}</span>
        </div>
        <div className="sb-item" title="Notifications">
          <Bell size={12} />
        </div>
      </div>
    </footer>
  );
}
