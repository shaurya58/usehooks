import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useClickAway(callback) {
  const ref = React.useRef(null);
  const onClickAway = React.useEffectEvent((event) => {
    if (
      ref.current &&
      ref.current.nodeType === Node.ELEMENT_NODE &&
      !ref.current.contains(event.target)
    ) {
      callback(event);
    }
  });

  React.useEffect(() => {
    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("touchstart", onClickAway);

    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("touchstart", onClickAway);
    };
  }, []);

  return ref;
}
