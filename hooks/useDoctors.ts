import { useCallback, useEffect, useMemo, useState } from "react";
import { getUniqueSpecializations } from "@/lib/utils";
import type { Doctor } from "@/types/doctor";

export const PAGE_SIZE = 6;

const ALL = "All";

export function useDoctors(allDoctors: Doctor[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const specializationOptions = useMemo(
    () => [ALL, ...getUniqueSpecializations(allDoctors)],
    [allDoctors]
  );

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allDoctors.filter((doc) => {
      const byName = q === "" || doc.name.toLowerCase().includes(q);
      const bySpec =
        selectedSpec === ALL || doc.specialization === selectedSpec;
      return byName && bySpec;
    });
  }, [allDoctors, searchQuery, selectedSpec]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, selectedSpec]);

  const visibleDoctors = useMemo(
    () => filteredDoctors.slice(0, visibleCount),
    [filteredDoctors, visibleCount]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback((spec: string) => {
    setSelectedSpec(spec);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((c) => c + PAGE_SIZE);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedSpec(ALL);
  }, []);

  return {
    searchQuery,
    selectedSpec,
    visibleCount,
    filteredDoctors,
    visibleDoctors,
    specializationOptions,
    handleSearch,
    handleFilter,
    handleLoadMore,
    resetFilters,
  };
}
