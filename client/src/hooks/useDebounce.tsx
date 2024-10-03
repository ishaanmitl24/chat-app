import { useEffect, useState } from "react";

const useDebounce = (
  delay: number,
  search: string,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setDebounceSearch(search);
      setPage(1);
    }, delay);
    return () => clearInterval(searchTimer);
  }, [search]);
  return debounceSearch;
};

export default useDebounce;
