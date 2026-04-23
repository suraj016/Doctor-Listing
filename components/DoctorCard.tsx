import type { Doctor } from "@/types/doctor";

type Props = { doctor: Doctor };

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1 text-base leading-none"
      aria-label={`Rating ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < full ? "text-amber-400" : "text-slate-200"}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className="ml-1.5 text-sm font-medium text-slate-500">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function DoctorCard({ doctor }: Props) {
  const available = doctor.available ?? false;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-md ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 pr-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {doctor.name}
          </h3>
          <p className="mt-2 text-sm text-slate-500">{doctor.specialization}</p>
        </div>
        <span
          className={`mt-1.5 inline-flex h-3 w-3 shrink-0 rounded-full ${
            available ? "bg-emerald-500" : "bg-slate-400"
          }`}
          title={available ? "Available" : "Unavailable"}
          aria-label={available ? "Available" : "Unavailable"}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {typeof doctor.experience === "number" ? (
          <span className="w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900">
            {doctor.experience} yrs
          </span>
        ) : null}
        {typeof doctor.rating === "number" ? (
          <Stars rating={doctor.rating} />
        ) : (
          <span className="text-xs text-slate-400">No rating</span>
        )}
      </div>

      <div className="mt-auto flex w-full flex-col gap-5 pt-6">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-2xl font-semibold tabular-nums text-slate-900">
            ₹{doctor.fee.toLocaleString("en-IN")}
          </span>
          <span className="text-sm font-medium text-slate-500">fee</span>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-teal-800 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Book
        </button>
      </div>
    </article>
  );
}
