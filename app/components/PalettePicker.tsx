"use client";
import { useState, useEffect } from "react";

export type Palette = "greyscale" | "orangePurple" | "blueGrey" | "pastel";

const palettes: Record<Palette, { name: string; colors: string[] }> = {
  greyscale: {
    name: "Greyscale",
    colors: ["#111111", "#666", "#bbb", "#fff"],
  },
  orangePurple: {
    name: "Orange & Purple",
    colors: ["#ff61f6", "#ff9800", "#470137", "#d1b3ff"],
  },
  blueGrey: {
    name: "Blue & Grey",
    colors: ["#0077b6", "#90e0ef", "#adb5bd", "#f8f9fa"],
  },
  pastel: {
    name: "Pastel",
    colors: ["#a7c7e7", "#f7cac9", "#92a8d1", "#f6eac2"],
  },
};

export default function PalettePicker({ value, onChange }: { value: Palette; onChange: (p: Palette) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        {Object.entries(palettes).map(([key, palette]) => (
          <button
            key={key}
            className={`flex flex-col items-center focus:outline-none ${value === key ? 'ring-2 ring-[#ff61f6]' : ''}`}
            onClick={() => onChange(key as Palette)}
            type="button"
            aria-label={`Select ${palette.name} palette`}
          >
            <div className="flex gap-1 mb-1">
              {palette.colors.map((c, i) => (
                <span key={i} className="w-5 h-5 rounded-full border border-gray-200" style={{ background: c }} />
              ))}
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-200">{palette.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
