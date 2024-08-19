import * as React from "react";

function subscribe(cb) {
  document.addEventListener("visibilitychange", cb);

  return () => document.removeEventListener("visibilitychange", cb);
}

function getSnapshot() {
  return document.visibilityState;
}

export default function useVisibilityChange() {
  return React.useSyncExternalStore(subscribe, getSnapshot) === "visible";
}
