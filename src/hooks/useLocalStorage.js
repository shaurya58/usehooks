import * as React from "react";

const dispatchStorageEvent = (key, newValue) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const getItem = (key) => {
  return window.localStorage.getItem(key);
};

const subscribe = (cb) => {
  window.addEventListener("storage", cb);

  return () => window.removeEventListener("storage", cb);
};

const getServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

export default function useLocalStorage(key, initialValue) {
  const getSnapshot = () => {
    const value = getItem(key);
    if (!!initialValue && !value) {
      setItem(key, initialValue);
    }
  };

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setState = React.useCallback(
    (arg) => {
      if (typeof arg === "function") {
        const updatedValue = arg(store ? JSON.parse(store) : initialValue);
        setItem(key, updatedValue);
      } else {
        setItem(key, arg);
      }
    },
    [key, initialValue, store]
  );

  return [store ? JSON.parse(store) : initialValue, setState];
}
