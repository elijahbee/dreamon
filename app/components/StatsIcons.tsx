// Reusable SVG icons for stats
export function CalendarIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M3 9h18" strokeWidth="2" />
    </svg>
  );
}

export function FireIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 3C12 3 7 8 7 13a5 5 0 0010 0c0-5-5-10-5-10z" strokeWidth="2" />
      <path d="M12 17a3 3 0 01-3-3c0-2 3-6 3-6s3 4 3 6a3 3 0 01-3 3z" strokeWidth="2" />
    </svg>
  );
}

export function ListIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="5" cy="7" r="2" strokeWidth="2" />
      <circle cx="5" cy="12" r="2" strokeWidth="2" />
      <circle cx="5" cy="17" r="2" strokeWidth="2" />
      <rect x="9" y="6" width="10" height="2" rx="1" strokeWidth="2" />
      <rect x="9" y="11" width="10" height="2" rx="1" strokeWidth="2" />
      <rect x="9" y="16" width="10" height="2" rx="1" strokeWidth="2" />
    </svg>
  );
}
