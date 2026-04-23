"use client";

import { useEffect, useState } from "react";

const DEBOUNCE_MS = 300;

type Props = {
  value: string;
  onDebouncedChange: (query: string) => void;
  disabled?: boolean;
};

export function SearchBar({ value, onDebouncedChange, disabled }: Props) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (disabled) return;
    const t = window.setTimeout(() => {
      onDebouncedChange(draft);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [draft, disabled, onDebouncedChange]);

  return (
    <div
      className="relative w-full max-w-xl"
      role="search"
      aria-label="Search doctors by name"
    >
      <label htmlFor="doctor-search" className="sr-only">
        Search doctors
      </label>
      <input
        id="doctor-search"
        type="text"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        disabled={disabled}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type a name…"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-12 text-slate-800 shadow-sm outline-none ring-teal-500/30 transition focus:border-teal-500 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50"
      />
      {draft.length > 0 && !disabled ? (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          onClick={() => setDraft("")}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
