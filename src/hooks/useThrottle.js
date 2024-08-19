import * as React from "react";

export default function useThrottle(value, interval = 500) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdatedAt = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdatedAt.current && now >= lastUpdatedAt.current + interval) {
      lastUpdatedAt.current = now;
      setThrottledValue(value);
    } else {
      const timeoutId = window.setTimeout(() => {
        lastUpdatedAt.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(timeoutId);
    }
  }, [value, interval]);

  return throttledValue;
}
