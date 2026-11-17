import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, ShieldCheck, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

const HASH_KEY = "jrome-editor-passcode";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomSalt(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function EditorGate({ open, onClose, onUnlock }: Props) {
  const [mode, setMode] = useState<"set" | "unlock">("unlock");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setPass("");
      setConfirm("");
      setError("");
      setMode(localStorage.getItem(HASH_KEY) ? "unlock" : "set");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const fail = (msg: string) => {
    setError(msg);
    setShake((s) => s + 1);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    if (mode === "set") {
      if (pass.length < 4) {
        setBusy(false);
        return fail("Passcode must be at least 4 characters.");
      }
      if (pass !== confirm) {
        setBusy(false);
        return fail("Passcodes don't match.");
      }
      const salt = randomSalt();
      const hash = await sha256(`${salt}:${pass}`);
      localStorage.setItem(HASH_KEY, `${salt}:${hash}`);
      setBusy(false);
      onUnlock();
    } else {
      const stored = localStorage.getItem(HASH_KEY);
      const [salt, hash] = stored ? stored.split(":") : ["", ""];
      const attempt = await sha256(`${salt}:${pass}`);
      setBusy(false);
      if (attempt === hash) {
        onUnlock();
      } else {
        fail("Wrong passcode. Only J'rome gets past this door.");
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            key={shake}
            initial={{ opacity: 0, y: -14, scale: 0.98, x: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: [0, -7, 7, -4, 0] }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="modal-icon">
                <LockKeyhole size={16} />
              </span>
              <div>
                <div className="modal-title">
                  {mode === "set" ? "Set your Editor passcode" : "Editor Mode — sign in"}
                </div>
                <div className="modal-sub">
                  {mode === "set"
                    ? "First time here: create a passcode only you know. You'll need it next time."
                    : "Restricted area — J'rome only."}
                </div>
              </div>
              <button type="button" className="modal-close" onClick={onClose} title="Close">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={submit}>
              <label className="modal-label">
                {mode === "set" ? "new passcode" : "passcode"}
              </label>
              <input
                ref={inputRef}
                type="password"
                className="modal-input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === "set" ? "new-password" : "current-password"}
              />
              {mode === "set" && (
                <>
                  <label className="modal-label">confirm passcode</label>
                  <input
                    type="password"
                    className="modal-input"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </>
              )}

              {error && <div className="modal-error">{error}</div>}

              <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 14 }}>
                <ShieldCheck size={15} />
                {mode === "set" ? "Create & Enter" : "Unlock"}
              </button>
              <div className="modal-hint">
                Stored as a salted SHA-256 hash in this browser. Edits made in Editor
                Mode save to this browser only — export JSON from the editor to publish.
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
