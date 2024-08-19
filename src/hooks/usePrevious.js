import * as React from "react";

export default function usePrevious(value) {
  const [previousValue, setPreviousValue] = React.useState(null);
  const [currentValue, setCurrentValue] = React.useState(value);

  if (value !== currentValue) {
    setPreviousValue(currentValue);
    setCurrentValue(value);
  }

  return previousValue;
}
