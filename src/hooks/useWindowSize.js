import * as React from "react";

const subscribe = (cb) => {
  window.addEventListener("resize", cb);

  return () => window.removeEventListener("resize", cb);
};

export default function useWindowSize() {
  const cache = React.useRef({ height: 0, width: 0 });

  const getSnapshot = React.useCallback(() => {
    const previousState = cache.current;

    const currentState = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    if (
      previousState.height === currentState.height &&
      previousState.width === currentState.width
    ) {
      return previousState;
    }

    cache.current = currentState;
    return currentState;
  }, []);

  return React.useSyncExternalStore(subscribe, getSnapshot);
}
