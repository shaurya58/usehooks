import * as React from "react";

const dispatchStorageEvent = (key, newValue) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const getItem = (key) => {
  return window.sessionStorage.getItem(key);
};

const subscribe = (callback) => {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  throw Error("useSessionStorage is a client-only hook");
};

export default function useSessionStorage(key, initialValue) {
  const getSnapshot = () => getItem(key);

  React.useEffect(() => {
    if (getItem(key) == null && typeof initialValue !== "undefined") {
      setItem(key, initialValue);
    }
  }, [key, initialValue]);

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setState = React.useCallback(
    (v) => {
      if (typeof v === "function") {
        setItem(key, v(JSON.parse(store)));
      } else {
        setItem(key, v);
      }
    },
    [key, store]
  );

  return [store ? JSON.parse(store) : initialValue, setState];
}
