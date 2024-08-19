import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useContinuousRetry(
  callback,
  interval = 100,
  options = {}
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);

  const cb = React.useEffectEvent(callback);

  React.useEffect(() => {
    let retries = 0;

    const id = setInterval(() => {
      if (cb()) {
        setHasResolved(true);
        clearInterval(id);
      } else if (retries >= maxRetries) {
        clearInterval(id);
      } else {
        retries += 1;
      }
    }, interval);

    return () => {
      clearInterval(id);
      retries = 0;
    };
  }, [interval, maxRetries]);

  return hasResolved;
}
