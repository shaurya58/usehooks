import * as React from "react";

// eslint-disable-next-line no-import-assign
React.useEffectEvent = React.experimental_useEffectEvent;

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url, options) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cache = React.useRef({});

  React.useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const cachedResponse = cache.current[url];

        if (cachedResponse) {
          dispatch({ type: "fetched", payload: cachedResponse });
          return;
        }

        const res = await fetch(url, options);
        const jsonResponse = await res.json();

        if (!res.ok) {
          dispatch({ type: "error", payload: jsonResponse });
        } else {
          cache.current[url] = jsonResponse;
          if (ignore === false) {
            dispatch({ type: "fetched", payload: jsonResponse });
          }
        }
      } catch (error) {
        if (ignore === false) {
          dispatch({ type: "error", payload: error });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, options]);

  return state;
}
