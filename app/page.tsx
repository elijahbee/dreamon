"use client";
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddEntryModal from "./components/AddEntryModal";
import SearchIcon from "./components/SearchIcon";

interface DreamEntry {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  date?: string;
  tags?: string[];
}

// Hydration-safe: all client
export default function Home() {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchEntries() {
      try {
        setLoading(true);
        const res = await fetch("/api/journal");
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        setError("Could not load dream entries");
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  const [addModalOpen, setAddModalOpen] = useState(false);
const [searchBoxOpen, setSearchBoxOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const filteredEntries = searchQuery.trim()
  ? entries.filter(entry =>
      (entry.title + " " + entry.content + " " + (entry.tags ? entry.tags.join(" ") : ""))
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
    )
  : entries;

return (
  <div className="relative max-w-2xl mx-auto pt-2 pb-10 px-2 min-h-[60vh]">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold tracking-tight">Recent Dreams</h1>
      <div className="flex items-center gap-2">
        <button
          className="rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Search dreams"
          onClick={() => setSearchBoxOpen(v => !v)}
        >
          <SearchIcon />
        </button>
        <button
          className="rounded-full w-8 h-8 bg-[#ff61f6] text-white flex items-center justify-center hover:bg-[#470137] transition"
          title="Add new entry"
          onClick={() => setAddModalOpen(true)}
        >
          <span className="text-2xl pb-0.5">+</span>
        </button>
      </div>
    </div>
    {searchBoxOpen && (
      <input
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search dreams"
        className="w-full p-2 mb-4 border border-gray-200 dark:border-gray-800 rounded-lg"
        autoFocus
      />
    )}
    <AddEntryModal
      open={addModalOpen}
      onClose={() => setAddModalOpen(false)}
      onAdd={entry => setEntries([entry, ...entries])}
    />
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <div className="space-y-4">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500">No dreams recorded yet. <Link href="/journal" className="text-[#470137] dark:text-[#ff61f6] underline">Add your first dream</Link>.</p>
      ) : mounted ? (
        (filteredEntries as DreamEntry[]).map((entry: DreamEntry) => (
          <div key={entry.id} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181024] shadow p-4 flex flex-col gap-1 mb-4">
            <div className="text-xs text-gray-400 mb-1">
              {entry.date ? new Date(entry.date).toLocaleDateString() : new Date(entry.createdAt).toLocaleDateString()}
            </div>
            <div className="font-semibold text-lg text-[#470137] dark:text-[#ff61f6]">
              {entry.title}
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line line-clamp-2">
              {entry.content}
            </div>
          </div>
        ))
      ) : null}
    </div>
  </div>
);
}
