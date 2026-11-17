import { useCallback, useState } from "react";
import { defaultContent, type EditableContent } from "../data/portfolio";

const STORAGE_KEY = "jrome-editor-content-v1";

function loadOverrides(): Partial<EditableContent> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Content = defaults from src/data/portfolio.ts merged with any overrides
 * saved locally via Editor Mode (browser localStorage).
 */
export function useContent() {
  const [overrides, setOverrides] = useState<Partial<EditableContent> | null>(loadOverrides);

  const content: EditableContent = { ...defaultContent, ...(overrides ?? {}) };

  const save = useCallback((patch: Partial<EditableContent>) => {
    setOverrides((prev) => {
      const next = { ...(prev ?? {}), ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage full/blocked — state still updates for this session */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setOverrides(null);
  }, []);

  return { content, save, reset, hasOverrides: overrides !== null };
}
