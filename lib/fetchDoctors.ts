import type { Doctor } from "@/types/doctor";

function rowToDoctor(raw: unknown): Doctor | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (
    typeof r.id !== "number" ||
    typeof r.name !== "string" ||
    typeof r.specialization !== "string" ||
    typeof r.fee !== "number"
  ) {
    return null;
  }
  return {
    id: r.id,
    name: r.name,
    specialization: r.specialization,
    fee: r.fee,
    experience: typeof r.experience === "number" ? r.experience : undefined,
    rating: typeof r.rating === "number" ? r.rating : undefined,
    available: typeof r.available === "boolean" ? r.available : undefined,
  };
}

export async function fetchDoctors(): Promise<Doctor[]> {
  const res = await fetch("/doctors.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Could not load doctors (HTTP ${res.status})`);
  }
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("Could not read doctors file");
  }
  if (!Array.isArray(data)) {
    throw new Error("Doctors file should be a JSON array");
  }
  const doctors = data
    .map(rowToDoctor)
    .filter((d): d is Doctor => d !== null);
  if (doctors.length === 0) {
    throw new Error("No valid doctor records found");
  }
  return doctors;
}
