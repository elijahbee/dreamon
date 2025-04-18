"use client";
import React, { useEffect, useState } from "react";
import PaletteAppearancePicker from "./PaletteAppearancePicker";

export default function ProfilePage() {
  // Placeholder user data
  const user = {
    name: "Dreamer",
    email: "dreamer@example.com",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Dreamer",
    bio: "Exploring the world of dreams."
  };

  // Dummy stats (replace with real data)
  const stats = {
    entries: 42,
    mostUsedTag: "lucid",
    firstEntry: "2023-01-10",
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="max-w-xl mx-auto py-8 px-2">
      <div className="flex flex-col items-center mb-8">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full shadow mb-3" />
        <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
        <div className="text-gray-500 mb-2">{user.email}</div>
        <div className="text-xs text-gray-400">
          First entry: {mounted ? stats.firstEntry : ''}
        </div>
        <p className="text-gray-700 dark:text-gray-200 text-center mb-2">{user.bio}</p>
        <button className="mt-2 px-4 py-2 rounded bg-[#ff61f6] text-white font-semibold hover:bg-[#470137] transition">Edit Profile</button>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Appearance</h2>
        <div className="flex flex-col gap-4">
          <div>
            <span className="block text-sm font-medium mb-1">Theme</span>
            {/* ThemeSwitcher moved here */}
            <div className="flex items-center gap-2">
              {typeof window !== "undefined" && require("../components/ThemeSwitcher").ThemeSwitcher ? require("../components/ThemeSwitcher").ThemeSwitcher() : null}
            </div>
          </div>
          <div>
            <span className="block text-sm font-medium mb-1">Color Palette</span>
            <PaletteAppearancePicker />
          </div>
        </div>
      </div>
      {/* Languages Section */}
      <div className="bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Languages</h2>
        <div>
          <label htmlFor="language-select" className="block text-sm font-medium mb-1">App Language</label>
          <select id="language-select" className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-[#181024] text-gray-700 dark:text-gray-200">
            <option value="en">English</option>
          </select>
        </div>
      </div>
      {/* Entry Protection Section */}
      <div className="bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Entry Protection</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span>Enable Biometrics</span>
            <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span>Set Passcode</span>
            <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold opacity-60 cursor-not-allowed" disabled>Set</button>
          </div>
          <div className="text-xs text-gray-400 mt-1">(Coming soon: Secure your dreams with biometrics or a passcode.)</div>
        </div>
      </div>
      {/* Export Section */}
      <div className="bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Export</h2>
        <div>
          {typeof window !== "undefined" && require("./ExportPDFButton").default ? require("./ExportPDFButton").default() : null}
        </div>
      </div>
      <div className="bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Account</h2>
        <button className="w-full px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-red-500 hover:text-white transition">Log out</button>
      </div>
    </div>
  );
}
