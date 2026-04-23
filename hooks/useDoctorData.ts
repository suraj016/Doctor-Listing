import { useCallback, useEffect, useState } from "react";
import { fetchDoctors } from "@/lib/fetchDoctors";
import type { Doctor } from "@/types/doctor";

type Status = "loading" | "ready" | "error";

export function useDoctorData() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const list = await fetchDoctors();
      setDoctors(list);
      setStatus("ready");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setDoctors([]);
      setError(message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { doctors, status, error, retry: load };
}
