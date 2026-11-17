import { Minus, Square, X, Search } from "lucide-react";
import { profile } from "../data/portfolio";

interface Props {
  onOpenPalette: () => void;
}

const MENUS = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export default function TitleBar({ onOpenPalette }: Props) {
  return (
    <header className="titlebar">
      <nav className="titlebar-menus">
        {MENUS.map((m) => (
          <button key={m} type="button" title={`${m} (decorative — this is a portfolio, not an IDE)`}>
            {m}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="titlebar-search"
        onClick={onOpenPalette}
        title="Search files and commands (Ctrl+K)"
      >
        <Search size={12} />
        <span className="search-text">
          {profile.name} — Portfolio
        </span>
        <kbd>Ctrl K</kbd>
      </button>

      <div className="titlebar-controls">
        <button type="button" title="Minimize (nice try)">
          <Minus size={14} />
        </button>
        <button type="button" title="Maximize (already fullscreen)">
          <Square size={11} />
        </button>
        <button type="button" className="close" title="Close (you can't — this portfolio is forever)">
          <X size={15} />
        </button>
      </div>
    </header>
  );
}
