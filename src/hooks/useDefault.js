import * as React from "react";

export default function useDefault(initialValue, defaultValue) {
  const [state, setState] = React.useState(initialValue);

  return [
    typeof state === "undefined" || state === null ? defaultValue : state,
    setState,
  ];
}
