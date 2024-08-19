import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb, ms) {
  const intervalRef = React.useRef(null);
  const callback = React.useEffectEvent(cb);

  React.useEffect(() => {
    intervalRef.current = setInterval(callback, ms);

    return () => clearInterval(intervalRef.current);
  }, [ms]);

  const handleClearInterval = React.useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  return handleClearInterval;
}
