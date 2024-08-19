import * as React from "react";

export function isTouchEvent({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}

export function isMouseEvent(event) {
  return event.nativeEvent instanceof MouseEvent;
}

export default function useLongPress(callback, options = {}) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const timeoutId = React.useRef(null);

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event) => {
      if (!isTouchEvent(event) && !isMouseEvent(event)) {
        return;
      }

      if (onStart) {
        onStart(event);
      }

      timeoutId.current = window.setTimeout(() => {
        if (onFinish) {
          onFinish(event);
        }
        callback();
      }, threshold);
    };

    const cancel = (event) => {
      if (onCancel) {
        onCancel(event);
      }
      window.clearTimeout(timeoutId.current);
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
