import * as React from "react";

export default function useFavicon(href) {
  React.useEffect(() => {
    const link =
      window.document.querySelector("link[rel*='icon']") ||
      window.document.createElement("link");
    link.type = "image/svg+xml";
    link.rel = "shortcut icon";
    link.href = href;

    window.document.getElementsByTagName("head")[0].appendChild(link);
  }, [href]);
}
