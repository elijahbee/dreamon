"use client";
import { useEffect, useState } from "react";
import MonthSwitcher from "../components/MonthSwitcher";

interface DreamEntry {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  date?: string;
}

function getDateKey(date: string) {
  // Returns YYYY-MM-DD
  return new Date(date).toISOString().slice(0, 10);
}

export default function InsightsPage() {
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

  // Calendar logic: map date => count
  const dateCounts: Record<string, number> = {};
  entries.forEach((entry) => {
    const key = getDateKey(entry.date ? entry.date : entry.createdAt);
    dateCounts[key] = (dateCounts[key] || 0) + 1;
  });

  // Get all months for the year
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const months = Array.from({ length: 12 }, (_, i) => i);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // For color scale (1 entry = light blue, 2+ = darker)
  function getCircleColor(count: number) {
    if (!count) return "#e5e7eb"; // gray
    if (count === 1) return "#60a5fa"; // blue-400
    if (count === 2) return "#2563eb"; // blue-600
    return "#1e40af"; // blue-900
  }

  // Tag usage bar chart
  const tagCounts: Record<string, number> = {};
  entries.forEach((entry: any) => {
    if (entry.tags) {
      entry.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  // --- Stats Calculation ---
  // Entries this year
  const thisYear = new Date().getFullYear();
  const entriesThisYear = entries.filter(e => {
    const d = new Date(e.date || e.createdAt);
    return d.getFullYear() === thisYear;
  });
  // Total entries
  const totalEntries = entries.length;
  // Best streak calculation
  const dateSet = new Set(entries.map(e => getDateKey(e.date || e.createdAt)));
  const allDates = Array.from(dateSet).sort();
  let bestStreak = 0, currentStreak = 0;
  let prevDate: Date | null = null;
  for (const dateStr of allDates) {
    const date = new Date(dateStr);
    if (prevDate) {
      const diff = (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      currentStreak = diff === 1 ? currentStreak + 1 : 1;
    } else {
      currentStreak = 1;
    }
    bestStreak = Math.max(bestStreak, currentStreak);
    prevDate = date;
  }
  // --- End Stats Calculation ---
  // Icons
  // @ts-ignore
  const { CalendarIcon, FireIcon, ListIcon } = require("../components/StatsIcons");

  return (
    <div className="max-w-xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-6 tracking-tight">Dream Insights</h1>
      {/* Stats Card */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 flex items-center gap-3 bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4">
          <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2"><CalendarIcon className="w-7 h-7 text-[#0077b6]" /></span>
          <div>
            <div className="text-2xl font-bold">{entriesThisYear.length}</div>
            <div className="text-xs text-gray-500">Entries this year</div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4">
          <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2"><FireIcon className="w-7 h-7 text-orange-500" /></span>
          <div>
            <div className="text-2xl font-bold">{bestStreak}</div>
            <div className="text-xs text-gray-500">Best streak</div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3 bg-white dark:bg-[#181024] border border-gray-200 dark:border-gray-800 rounded-lg shadow p-4">
          <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-2"><ListIcon className="w-7 h-7 text-[#470137] dark:text-[#ff61f6]" /></span>
          <div>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <div className="text-xs text-gray-500">Total entries</div>
          </div>
        </div>
      </div>
      <div className="mb-6 text-gray-500 text-sm">Each blue circle marks a day you journaled. Darker = more entries.</div>
      {mounted && (
        <>
          <MonthSwitcher
            month={selectedMonth}
            year={selectedYear}
            onChange={(m, y) => {
              setSelectedMonth(m);
              setSelectedYear(y);
            }}
          />
          <div className="overflow-x-auto flex gap-8 pb-4">
            {(() => {
              const month = selectedMonth;
              const year = selectedYear;
              const firstDay = new Date(year, month, 1);
              const lastDay = new Date(year, month + 1, 0);
              const daysInMonth = lastDay.getDate();
              const startWeekday = firstDay.getDay();
              return (
                <div key={month} className="min-w-[560px]">
                  <table className="border-collapse w-full select-none">
                    <thead>
                      <tr>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                          <th key={d} className="py-1 px-2 text-xs text-gray-400 font-normal">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Build the calendar grid */}
                      {(() => {
                        const rows = [];
                        let day = 1 - startWeekday;
                        for (let w = 0; w < 6; w++) {
                          const cells = [];
                          for (let d = 0; d < 7; d++, day++) {
                            if (day < 1 || day > daysInMonth) {
                              cells.push(<td key={d} className="py-2 px-2"></td>);
                            } else {
                              const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                              const count = dateCounts[dateKey] || 0;
                              cells.push(
                                <td key={d} className="py-2 px-2">
                                  <div className="flex flex-col items-center">
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background: getCircleColor(count),
                                        border: count ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
                                        marginBottom: 2,
                                        marginTop: 2,
                                        transition: "background 0.2s",
                                      }}
                                      title={count ? `${count} entr${count > 1 ? "ies" : "y"}` : "No entry"}
                                    ></span>
                                    <div className="text-base text-center text-gray-700 dark:text-gray-200 font-bold" style={{marginTop: 2}}>
                                      {day}
                                    </div>
                                  </div>
                                </td>
                              );
                            }
                          }
                          rows.push(<tr key={w}>{cells}</tr>);
                        }
                        return rows;
                      })()}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
      {/* Tag usage bar chart */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-2">Tag Usage</h2>
            {sortedTags.length === 0 ? (
              <div className="text-gray-500">No tags yet.</div>
            ) : (
              <div className="space-y-2">
                {sortedTags.map(([tag, count]) => (
                  <div key={tag} className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#470137] dark:text-[#ff61f6]">{tag}</span>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded">
                      <div
                        className="h-3 rounded bg-blue-500"
                        style={{ width: `${Math.min(100, (Number(count) / sortedTags[0][1]) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {loading && <div className="text-gray-500 mt-4">Loading...</div>}
    </div>
  );
}
