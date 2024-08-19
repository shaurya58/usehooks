import * as React from "react";

export default function useWindowScroll() {
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
  });

  const scrollTo = React.useCallback((x, y) => {
    if (typeof x === "object" && typeof y === "undefined") {
      window.scrollTo(x);
    } else if (typeof x === "number" && typeof y === "number") {
      window.scrollTo(x, y);
    } else {
      throw new Error("Invalid arguments to window.scrollTo");
    }
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return [state, scrollTo];
}
