import * as React from "react";

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue) {
  const [state, setState] = React.useState(initialValue);

  const updater = React.useCallback((update) => {
    if (typeof update === "function") {
      setState((currentState) => {
        const updatedState = update(currentState);

        if (isPlainObject(updatedState)) {
          return { ...currentState, ...updatedState };
        }
      });
    }

    if (isPlainObject(update)) {
      setState((currentState) => ({ ...currentState, ...update }));
    }
  }, []);

  return [state, updater];
}
