"use client";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only set theme on client
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <button
      className="rounded-full border border-gray-300 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      type="button"
    >
      {mounted ? (
        theme === "dark" ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21 12.79A9 9 0 0 1 12.79 3a1 1 0 0 0-1.13 1.13A7 7 0 0 0 13 21a1 1 0 0 0 1.13-1.13A8.94 8.94 0 0 1 21 12.79Z"/></svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="currentColor"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.07 6.07-1.42-1.42M6.34 6.34 4.93 4.93m12.14 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
        )
      ) : null}
    </button>
  );
}
