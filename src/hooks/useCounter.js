import * as React from "react";

export default function useCounter(startingValue = 0, options = {}) {
  const { min, max } = options;

  if (typeof min === "number" && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (typeof max === "number" && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = React.useState(startingValue);

  const increment = React.useCallback(
    () =>
      setCount((currentCount) => {
        if (typeof max === "number") {
          return currentCount + 1 <= max ? currentCount + 1 : currentCount;
        } else {
          return currentCount + 1;
        }
      }),
    [max]
  );

  const decrement = React.useCallback(
    () =>
      setCount((currentCount) => {
        if (typeof min === "number") {
          return currentCount - 1 >= min ? currentCount - 1 : currentCount;
        } else {
          return currentCount - 1;
        }
      }),
    [min]
  );

  const set = React.useCallback(
    (nextState) =>
      setCount((currentCount) => {
        if (typeof max === "number" && typeof min === "number") {
          if (nextState >= min && nextState <= max) {
            return nextState;
          } else {
            return currentCount;
          }
        } else if (typeof max === "number") {
          if (nextState <= max) {
            return nextState;
          } else {
            return currentCount;
          }
        } else if (typeof min === "number") {
          if (nextState >= min) {
            return nextState;
          } else {
            return currentCount;
          }
        } else {
          return nextState;
        }
      }),
    [max, min]
  );

  const reset = React.useCallback(
    () => setCount(startingValue),
    [startingValue]
  );

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
