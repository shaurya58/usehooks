import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const intervalID = React.useRef(null);
  const onInterval = React.useEffectEvent(cb);

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(intervalID.current);
  }, []);

  React.useEffect(() => {
    const initInterval = () => {
      intervalID.current = window.setInterval(() => {
        if (when) {
          onInterval();
        }
      }, ms);
    };

    if (when && startImmediately) {
      onInterval();
    }

    initInterval();
    return handleClearInterval;
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
}
