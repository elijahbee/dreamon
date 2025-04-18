"use client";

interface MonthSwitcherProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export default function MonthSwitcher({ month, year, onChange }: MonthSwitcherProps) {
  function handlePrev() {
    if (month === 0) {
      onChange(11, year - 1);
    } else {
      onChange(month - 1, year);
    }
  }
  function handleNext() {
    if (month === 11) {
      onChange(0, year + 1);
    } else {
      onChange(month + 1, year);
    }
  }
  return (
    <div className="flex items-center justify-center gap-4 mb-2">
      <button
        onClick={handlePrev}
        className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-xl"
        aria-label="Previous month"
        type="button"
      >
        &#8592;
      </button>
      <span className="text-xl font-bold">
        {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
      </span>
      <button
        onClick={handleNext}
        className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-xl"
        aria-label="Next month"
        type="button"
      >
        &#8594;
      </button>
    </div>
  );
}
