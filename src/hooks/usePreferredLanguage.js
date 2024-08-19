import * as React from "react";

const subscribe = (callback) => {
  window.addEventListener("languagechange", callback);

  return () => window.removeEventListener("languagechange", callback);
};

const getSnapshot = () => {
  return navigator.language;
};

export default function usePreferredLanguage() {
  if (typeof window === "undefined") {
    throw new Error("Feature not supported on server-side.");
  }

  return React.useSyncExternalStore(subscribe, getSnapshot);
}
