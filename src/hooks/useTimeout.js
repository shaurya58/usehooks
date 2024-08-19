import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  const id = React.useRef(null);
  const callback = React.useEffectEvent(cb);

  const handleClearTimeout = React.useCallback(() => {
    clearTimeout(id.current);
  }, []);

  React.useEffect(() => {
    id.current = setTimeout(callback, ms);

    return handleClearTimeout;
  }, [ms, handleClearTimeout]);

  return handleClearTimeout;
}
