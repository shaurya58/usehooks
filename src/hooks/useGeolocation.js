import * as React from "react";

export default function useGeolocation(options = {}) {
  const optionsRef = React.useRef(options);
  const [state, setState] = React.useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const onSuccess = React.useCallback(({ coords, timestamp }) => {
    setState({
      ...coords,
      timestamp,
      loading: false,
      error: null,
    });
  }, []);

  const onError = React.useCallback((error) => {
    setState((currentState) => ({
      ...currentState,
      loading: false,
      error,
    }));
  }, []);

  React.useLayoutEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      onSuccess,
      onError,
      optionsRef.current
    );
  }, [onSuccess, onError]);

  React.useEffect(() => {
    const id = navigator?.geolocation?.watchPosition(
      onSuccess,
      onError,
      optionsRef.current
    );

    return () => {
      if (id) {
        navigator?.geolocation?.clearWatch(id);
      }
    };
  }, [onSuccess, onError]);

  return state;
}
