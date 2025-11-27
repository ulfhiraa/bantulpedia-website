// src/hooks/useDarkMode.js
import { useEffect, useState } from "react";

const STORAGE_KEY = "bantulpedia-theme";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === "dark";
      // fallback to OS preference
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        localStorage.setItem(STORAGE_KEY, "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem(STORAGE_KEY, "light");
      }
    } catch (e) {
      // ignore
    }
  }, [isDark]);

  // optional: react to OS changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = (e) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener ? mq.addEventListener("change", handle) : mq.addListener(handle);
    return () => mq.removeEventListener ? mq.removeEventListener("change", handle) : mq.removeListener(handle);
  }, []);

  return [isDark, setIsDark];
}
