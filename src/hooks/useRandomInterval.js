import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useRandomInterval(cb, { minDelay, maxDelay }) {
  const id = React.useRef(null);
  const callback = React.useEffectEvent(cb);

  const onClearTimeout = React.useCallback(
    () => window.clearTimeout(id.current),
    []
  );

  const nextTick = React.useCallback(() => {
    const interval = getRandomNumber(minDelay, maxDelay);
    id.current = window.setTimeout(() => {
      callback();
      nextTick();
    }, interval);
  }, [minDelay, maxDelay]);

  React.useEffect(() => {
    nextTick();

    return onClearTimeout;
  }, [nextTick, onClearTimeout]);

  return onClearTimeout;
}
