"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ExportPDFButton() {
  const [downloading, setDownloading] = useState(false);
  async function handleExport() {
    setDownloading(true);
    try {
      const res = await fetch(API_URL);
      const entries = await res.json();
      // Dynamically import jsPDF
      const jsPDF = (await import("jspdf")).jsPDF;
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Dream Journal Entries", 10, 15);
      let y = 30;
      doc.setFontSize(12);
      entries.forEach((entry: any, i: number) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${i + 1}. ${entry.title || "Untitled"}` , 10, y);
        y += 7;
        doc.setFont("times", "italic");
        doc.text(`${entry.date ? new Date(entry.date).toLocaleDateString() : new Date(entry.createdAt).toLocaleDateString()}` , 10, y);
        doc.setFont("times", "normal");
        y += 6;
        doc.text(doc.splitTextToSize(entry.content || "", 180), 10, y);
        y += 12 + Math.ceil((entry.content?.length || 0) / 90) * 6;
        if (entry.tags && entry.tags.length) {
          doc.setFontSize(10);
          doc.text(`Tags: ${entry.tags.join(", ")}`, 10, y);
          doc.setFontSize(12);
          y += 6;
        }
        y += 2;
      });
      doc.save("dream-journal-entries.pdf");
    } catch (err) {
      alert("Could not export PDF. Please try again after installing jsPDF.");
    } finally {
      setDownloading(false);
    }
  }
  return (
    <button
      className="w-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
      onClick={handleExport}
      disabled={downloading}
    >
      {downloading ? "Exporting..." : "Export Dreams as PDF"}
    </button>
  );
}
