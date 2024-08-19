import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useCountdown(endTime, options) {
  const { interval, onTick, onComplete } = options;

  const [count, setCount] = React.useState(null);

  const _onTick = React.useEffectEvent(onTick);
  const _onComplete = React.useEffectEvent(onComplete);

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / interval));
  }, [interval, endTime]);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (count === 0) {
        _onComplete();
        window.clearInterval(intervalId);
      } else {
        _onTick();
        setCount((currentCount) => currentCount - 1);
      }
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval, endTime, count]);

  return count;
}
