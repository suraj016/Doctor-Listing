import type { Doctor } from "@/types/doctor";
import { DoctorCard } from "@/components/DoctorCard";
import { PAGE_SIZE } from "@/hooks/useDoctors";

type Props = {
  doctors: Doctor[];
  isLoading: boolean;
  isEmpty: boolean;
  onResetFilters: () => void;
};

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="h-5 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
      <div className="mt-6 h-6 w-24 rounded-full bg-slate-100" />
      <div className="mt-4 h-4 w-32 rounded bg-slate-100" />
      <div className="mt-6 h-8 w-40 rounded bg-slate-100" />
      <div className="mt-8 h-11 w-full rounded-xl bg-slate-100" />
    </div>
  );
}

export function DoctorGrid({
  doctors,
  isLoading,
  isEmpty,
  onResetFilters,
}: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: PAGE_SIZE }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
        <p className="text-lg font-medium text-slate-800">No matches</p>
        <p className="mt-2 text-sm text-slate-500">
          Change the search or pick another specialization.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-6 rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
