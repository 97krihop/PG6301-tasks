import { useEffect, useState } from "react";

export function useLoading<T>(
  func: () => Promise<T>,
  deps: ReadonlyArray<any> = []
) {
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  async function reload() {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      setData(await func());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, deps);

  return { error, loading, data, reload };
}
