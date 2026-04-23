import type { Doctor } from "@/types/doctor";

export function getUniqueSpecializations(doctorList: Doctor[]): string[] {
  const set = new Set<string>();
  for (const d of doctorList) {
    set.add(d.specialization);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
