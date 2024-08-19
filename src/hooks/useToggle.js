import * as React from "react";

export default function useToggle(initialValue) {
  const [state, setState] = React.useState(!!initialValue);

  const toggle = React.useCallback((value) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((currentState) => !currentState);
    }
  }, []);

  return [state, toggle];
}
