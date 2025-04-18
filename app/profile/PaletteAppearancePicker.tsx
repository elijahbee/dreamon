"use client";
import { useEffect, useState } from "react";
import PalettePicker, { Palette } from "../components/PalettePicker";

const PALETTE_KEY = "dreamon_palette";

function applyPalette(palette: Palette) {
  // Example: set CSS variables for accent/background, etc.
  let root = document.documentElement;
  switch (palette) {
    case "greyscale":
      root.style.setProperty("--accent", "#666");
      root.style.setProperty("--accent2", "#bbb");
      root.style.setProperty("--bg-main", "#fff");
      root.style.setProperty("--bg-alt", "#111");
      break;
    case "orangePurple":
      root.style.setProperty("--accent", "#ff61f6");
      root.style.setProperty("--accent2", "#ff9800");
      root.style.setProperty("--bg-main", "#fff6f9");
      root.style.setProperty("--bg-alt", "#470137");
      break;
    case "blueGrey":
      root.style.setProperty("--accent", "#0077b6");
      root.style.setProperty("--accent2", "#adb5bd");
      root.style.setProperty("--bg-main", "#f8f9fa");
      root.style.setProperty("--bg-alt", "#22223b");
      break;
    case "pastel":
      root.style.setProperty("--accent", "#a7c7e7");
      root.style.setProperty("--accent2", "#f7cac9");
      root.style.setProperty("--bg-main", "#f6eac2");
      root.style.setProperty("--bg-alt", "#92a8d1");
      break;
  }
}

export default function PaletteAppearancePicker() {
  const [palette, setPalette] = useState<Palette>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(PALETTE_KEY) as Palette) || "greyscale";
    }
    return "greyscale";
  });

  useEffect(() => {
    applyPalette(palette);
    localStorage.setItem(PALETTE_KEY, palette);
  }, [palette]);

  return (
    <PalettePicker value={palette} onChange={setPalette} />
  );
}
