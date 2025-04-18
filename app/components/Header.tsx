"use client";
import Link from "next/link";
import SearchIcon from "./SearchIcon";
import { DreamweaverIcon } from "../icons/DreamweaverIcon";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181024] shadow-sm z-20">
      <div className="flex items-center gap-2">
        <DreamweaverIcon />
        <Link href="/" className="text-xl font-bold tracking-tight ml-2 text-[#470137] dark:text-[#ff61f6]">DreamOn</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/journal" title="Search dreams">
          <button className="rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            <SearchIcon />
          </button>
        </Link>
      </div>
    </header>
  );
}

function UserMenu() {
  // Placeholder for user menu
  return (
    <button className="rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="currentColor"/><path fill="currentColor" d="M4 20a8 8 0 0 1 16 0H4Z"/></svg>
    </button>
  );
}
