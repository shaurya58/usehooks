import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useEventListener(target, eventName, handler, options) {
  const eventHandler = React.useEffectEvent(handler);

  React.useEffect(() => {
    const targetElement = target ?? target.current;

    if (
      typeof targetElement === "undefined" ||
      typeof targetElement.addEventListener === "undefined"
    ) {
      return;
    }

    targetElement.addEventListener(eventName, eventHandler, options);

    return () => {
      if (
        typeof targetElement === "undefined" ||
        typeof targetElement.addEventListener === "undefined"
      ) {
        return;
      }

      targetElement.removeEventListener(eventName, eventHandler, options);
    };
  }, [target, eventName, options]);
}
