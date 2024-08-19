import * as React from "react";

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = React.useCallback(
    (item) => setQueue((currentQueue) => [...currentQueue, item]),
    []
  );

  const remove = React.useCallback(() => {
    let firstElement = queue[0];
    setQueue((currentQueue) => currentQueue.slice(1));
    return firstElement;
  }, [queue]);

  const clear = React.useCallback(() => setQueue([]), []);

  return React.useMemo(
    () => ({
      add,
      remove,
      clear,
      first: queue[0],
      last: queue[queue.length - 1],
      size: queue.length,
      queue,
    }),
    [add, remove, clear, queue]
  );
}
