import * as React from "react";

export default function useDebounce(value, delay) {
  const [state, setState] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setState(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return state;
}
