"use client";

type Props = {
  options: string[];
  selected: string;
  onChange: (specialization: string) => void;
  disabled?: boolean;
};

export function SpecializationFilter({
  options,
  selected,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Specialization">
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
