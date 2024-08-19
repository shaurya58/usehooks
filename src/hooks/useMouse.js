import * as React from "react";

export default function useMouse() {
  const ref = React.useRef(null);
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  React.useLayoutEffect(() => {
    const onMouseMove = (event) => {
      const x = event.pageX;
      const y = event.pageY;
      let { elementX, elementY, elementPositionX, elementPositionY } = state;

      if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();
        elementX = x - left;
        elementY = y - top;
        elementPositionX = left + window.scrollX;
        elementPositionY = top + window.scrollY;
      }

      setState({
        x,
        y,
        elementX,
        elementY,
        elementPositionX,
        elementPositionY,
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [state]);

  return [state, ref];
}
