import * as React from "react";

function subscribe(cb) {
  const targetElement = window.screen?.orientation ?? window;
  const eventName = window.screen?.orientation ? "change" : "orientationchange";
  targetElement.addEventListener(eventName, cb);

  return () => targetElement.removeEventListener(eventName, cb);
}

function getServerSnapshot() {
  throw new Error("useOrientation is a client-only hook.");
}

export default function useOrientation() {
  const cache = React.useRef({
    angle: 0,
    type: "UNKNOWN",
  });

  const getSnapshot = () => {
    const prevState = cache.current;

    const newState = {
      angle: window.screen?.orientation?.angle ?? window.orientation,
      type: window.screen?.orientation
        ? window.screen?.orientation?.type
        : "UNKNOWN",
    };

    if (
      prevState.angle === newState.angle &&
      prevState.type === newState.type
    ) {
      return prevState;
    }

    cache.current = newState;
    return newState;
  };

  const orientation = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return orientation;
}
