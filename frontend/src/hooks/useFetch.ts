import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<T>, fallback?: T): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: fallback ?? null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: "Nu s-au putut incarca datele." }));
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
