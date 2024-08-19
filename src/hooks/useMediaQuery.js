import * as React from "react";

const getServerSnapshot = () => {
  throw new Error("useMediaQuery is supported on the client only.");
};

export default function useMediaQuery(condition) {
  const subscribe = (cb) => {
    const mediaQueryList = window.matchMedia(condition);

    mediaQueryList.addEventListener("change", cb);

    return () => mediaQueryList.removeEventListener("change", cb);
  };

  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(condition).matches;
  }, [condition]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
