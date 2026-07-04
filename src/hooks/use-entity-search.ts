import { PAGINATION } from "@/lib/constant";
import { useEffect, useState } from "react";

type UseEntitySearchProps<T extends { search: string; page: number }> = {
  params: T;
  setParams: (params: T) => void;
  debounce?: number;
};

export function useEntitySearch<
  T extends {
    search: string;
    page: number;
  }
>({ params, setParams, debounce = 300 }: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) setParams({ ...params, search: localSearch, page: PAGINATION.DEFAULT_PAGE });
    }, debounce);

    return () => clearTimeout(timer);
  }, [localSearch, params, setParams, debounce]);

  useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);

  return { searchValue: localSearch, onSearchChange: setLocalSearch };
}
