import { useState, useEffect, useRef } from "react";

interface UseDebouceHookProps {
  value: string;
  delay: number;
}

const useDebounce = ({ value, delay = 500 }: UseDebouceHookProps) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
