"use client";

import { SearchBar } from "@/components/SearchBar";
import { SpecializationFilter } from "@/components/SpecializationFilter";
import { DoctorGrid } from "@/components/DoctorGrid";
import { LoadMore } from "@/components/LoadMore";
import { useDoctors } from "@/hooks/useDoctors";
import { useDoctorData } from "@/hooks/useDoctorData";

export default function HomePage() {
  const { doctors, status, error, retry } = useDoctorData();
  const {
    searchQuery,
    selectedSpec,
    visibleDoctors,
    filteredDoctors,
    specializationOptions,
    handleSearch,
    handleFilter,
    handleLoadMore,
    resetFilters,
  } = useDoctors(doctors);

  const loading = status === "loading";
  const failed = status === "error";

  const resultLabel = loading
    ? "Loading…"
    : failed
      ? "Could not load directory"
      : `${filteredDoctors.length} doctor${
          filteredDoctors.length === 1 ? "" : "s"
        }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Doctor listing
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Find a doctor
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Search by name and filter by specialization. Fees are shown in INR.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500" aria-live="polite">
            {resultLabel}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {failed ? (
          <div
            className="rounded-2xl border border-red-200 bg-red-50/80 px-6 py-10 text-center"
            role="alert"
          >
            <p className="font-medium text-red-900">{error}</p>
            <button
              type="button"
              onClick={() => void retry()}
              className="mt-4 rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full lg:max-w-xl">
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Search by name
                  </p>
                  <SearchBar
                    value={searchQuery}
                    onDebouncedChange={handleSearch}
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Specialization
                </p>
                <SpecializationFilter
                  options={specializationOptions}
                  selected={selectedSpec}
                  onChange={handleFilter}
                  disabled={loading}
                />
              </div>
            </section>

            <DoctorGrid
              doctors={visibleDoctors}
              isLoading={loading}
              isEmpty={!loading && filteredDoctors.length === 0}
              onResetFilters={resetFilters}
            />

            {!loading ? (
              <LoadMore
                visibleCount={visibleDoctors.length}
                totalFiltered={filteredDoctors.length}
                onLoadMore={handleLoadMore}
              />
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
