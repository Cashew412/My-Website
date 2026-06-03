"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-brand ${className}`}
    >
      {mounted ? <Icon name={dark ? "sun" : "moon"} size={17} /> : <span className="h-[17px] w-[17px]" />}
    </button>
  );
}
