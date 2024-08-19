import * as React from "react";

const isShallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

const getConnection = () => {
  return (
    navigator?.connection ||
    navigator?.mozConnection ||
    navigator?.webkitConnection
  );
};

function subscribe(callback) {
  const connection = getConnection();

  connection?.addEventListener("change", callback);
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    connection?.removeEventListener("change", callback);
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getServerSnapshot() {
  throw new Error("useNetworkState is a client-only hook.");
}

export default function useNetworkState() {
  const cache = React.useRef(null);

  const online = navigator.onLine;
  const connection = getConnection();

  const getSnapshot = () => {
    const prevState = cache.current;

    const newState = {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    };

    if (prevState && isShallowEqual(prevState, newState)) {
      return prevState;
    }

    cache.current = newState;
    return newState;
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
