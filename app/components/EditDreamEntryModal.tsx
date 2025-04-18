"use client";
import { useState } from "react";

interface EditDreamEntryModalProps {
  entry: any;
  open: boolean;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export default function EditDreamEntryModal({ entry, open, onClose, onSave }: EditDreamEntryModalProps) {
  const [title, setTitle] = useState(entry.title || "");
  const [content, setContent] = useState(entry.content || "");
  const [date, setDate] = useState(entry.date ? entry.date.slice(0, 10) : "");
  const [tags, setTags] = useState<string[]>(entry.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTagInputBlur() {
    if (tagInput.trim()) {
      setTags([...tags, ...tagInput.split(",").map(t => t.trim()).filter(Boolean).filter(t => !tags.includes(t))]);
      setTagInput("");
    }
  }

  function handleTagInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleTagInputBlur();
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: entry.id,
          title,
          content,
          date,
          tags
        })
      });
      if (!res.ok) throw new Error("Failed to update entry");
      const updated = await res.json();
      onSave(updated);
      onClose();
    } catch (err) {
      setError("Could not update entry");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#181024] rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Edit Dream Entry</h2>
        <div className="flex flex-col gap-3">
          <input
            className="rounded px-3 py-2 bg-background text-foreground border border-gray-300 dark:border-gray-700 focus:border-[#ff61f6]"
            placeholder="Dream Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={saving}
          />
          <textarea
            className="rounded px-3 py-2 bg-background text-foreground border border-gray-300 dark:border-gray-700 focus:border-[#ff61f6] min-h-[100px]"
            placeholder="Describe your dream..."
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={saving}
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col">
              <label htmlFor="edit-date" className="text-xs mb-1">Date</label>
              <input
                id="edit-date"
                type="date"
                className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-background text-foreground"
                value={date}
                onChange={e => setDate(e.target.value)}
                disabled={saving}
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="edit-tags" className="text-xs mb-1">Tags</label>
              <input
                id="edit-tags"
                type="text"
                className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-background text-foreground"
                placeholder="Add tags, separated by commas"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onBlur={handleTagInputBlur}
                onKeyDown={handleTagInputKeyDown}
                disabled={saving}
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
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="flex gap-2 justify-end mt-4">
            <button
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={onClose}
              disabled={saving}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-[#470137] text-white rounded px-4 py-2 hover:bg-[#ff61f6] disabled:opacity-60 font-semibold transition"
              onClick={handleSave}
              disabled={saving}
              type="button"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
