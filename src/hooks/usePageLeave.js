import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function usePageLeave(cb) {
  const onMouseOut = React.useEffectEvent((event) => {
    const to = event.relatedTarget || event.toElement;

    if (!to || to.nodeName === "HTML") {
      cb();
    }
  });

  React.useEffect(() => {
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
}
