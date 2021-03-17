import { useEffect, useState } from "react";

export function useFetch<T>(
  url: Request | string,
  options: RequestInit,
  deps = []
) {
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  async function reload() {
    setLoading(true);
    setData(null);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch(url, options);
      setStatus(res.status);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, deps);

  return { error, loading, data, reload, status };
}
