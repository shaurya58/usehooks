import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, args) {
  const isMounted = React.useRef(false);

  const onMountOrUpdate = React.useEffectEvent(() => {
    if (!isMounted.current) {
      console.log(`${name} mounted:`, [args]);
      isMounted.current = true;
    } else {
      console.log(`${name} updated:`, [args]);
    }
  });

  const onUnmount = React.useEffectEvent(() => {
    console.log(`${name} unmounted:`, [args]);
  });

  React.useEffect(() => {
    onMountOrUpdate();
  }, [args]);

  React.useEffect(() => {
    return onUnmount;
  }, []);
}
