import { useEffect, useState } from "react";

export function useAnimatedCounter(target, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= target) {
        start = target;
        clearInterval(counter);
      }

      setValue(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [target, duration]);

  return value;
}