import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useKeyPress(key, cb, options = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;

  const callback = React.useEffectEvent(cb);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        callback(e);
      }
    };

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [key, target, event, eventOptions]);
}
