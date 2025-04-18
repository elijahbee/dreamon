"use client";
import { useState, useEffect } from "react";
import EditDreamEntryModal from "../components/EditDreamEntryModal";
import EditIcon from "../components/EditIcon";

interface DreamEntry {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  date?: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DreamEntry | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      try {
        setLoading(true);
        const res = await fetch("https://dreamon-108a99955-elijah-bees-projects.vercel.app/api/journal");
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

  async function handleAddEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://dreamon-108a99955-elijah-bees-projects.vercel.app/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, date, tags }),
      });
      if (!res.ok) throw new Error("Failed to add entry");
      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
      setTitle("");
      setContent("");
      setDate(new Date().toISOString().slice(0, 10));
      setTags([]);
      setTagInput("");
    } catch (err) {
      setError("Could not save your dream entry");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-2 pb-10 px-2">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between py-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dream Journal</h1>
        <button
          className="rounded-full bg-[#ff61f6] text-white px-3 py-1 text-sm font-semibold shadow hover:bg-[#470137] transition"
          onClick={() => {
            const form = document.getElementById('dream-form');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          New Entry
        </button>
      </div>
      <form
        id="dream-form"
        onSubmit={handleAddEntry}
        className="mb-10 flex flex-col gap-4 bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4"
      >
        <input
          className="rounded px-3 py-2 bg-background text-foreground border border-gray-300 dark:border-gray-700 focus:border-[#ff61f6]"
          placeholder="Dream Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={submitting}
        />
        <textarea
          className="rounded px-3 py-2 bg-background text-foreground border border-gray-300 dark:border-gray-700 focus:border-[#ff61f6] min-h-[100px]"
          placeholder="Describe your dream..."
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={submitting}
        />
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-xs mb-1">Date</label>
            <input
              id="date"
              type="date"
              className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-background text-foreground"
              value={date}
              onChange={e => setDate(e.target.value)}
              disabled={submitting}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="tags" className="text-xs mb-1">Tags</label>
            <input
              id="tags"
              type="text"
              className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-background text-foreground"
              placeholder="Add tags, separated by commas"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onBlur={() => {
                if (tagInput.trim()) {
                  setTags([...tags, ...tagInput.split(",").map(t => t.trim()).filter(Boolean).filter(t => !tags.includes(t))]);
                  setTagInput("");
                }
              }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  if (tagInput.trim()) {
                    setTags([...tags, ...tagInput.split(",").map(t => t.trim()).filter(Boolean).filter(t => !tags.includes(t))]);
                    setTagInput("");
                  }
                }
              }}
              disabled={submitting}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {tags.map((tag, i) => (
                <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                  {tag}
                  <button type="button" className="ml-1 text-xs text-red-400 hover:text-red-700" onClick={() => setTags(tags.filter((t, idx) => idx !== i))}>&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#470137] text-white rounded px-4 py-2 hover:bg-[#ff61f6] disabled:opacity-60 font-semibold transition"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Add Entry"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* Avoid hydration mismatch: only render entries after mount */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-500">No dreams recorded yet.</p>
        ) : typeof window === "undefined" ? null : (
          <>
            {[...entries]
  .sort((a, b) => {
    const dateA = new Date(a.date || a.createdAt).getTime();
    const dateB = new Date(b.date || b.createdAt).getTime();
    return dateB - dateA;
  })
  .map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181024] shadow p-4 relative"
              >
                <div className="text-xs text-gray-400 mb-1">
                  {entry.date ? new Date(entry.date).toLocaleDateString() : new Date(entry.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-lg text-[#470137] dark:text-[#ff61f6]">
                    {entry.title}
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 ml-2"
                    onClick={() => {
                      setEditingEntry(entry);
                      setEditModalOpen(true);
                    }}
                    title="Edit entry"
                    type="button"
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{entry.content}</div>
              </div>
            ))}
            {editingEntry && (
              <EditDreamEntryModal
                entry={editingEntry}
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={updated => {
                  setEntries(entries => entries.map(e => e.id === updated.id ? updated : e));
                  setEditModalOpen(false);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
