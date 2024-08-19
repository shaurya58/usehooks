import * as React from "react";

function oldSchoolCopy(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

export default function useCopyToClipboard() {
  const [state, setState] = React.useState(null);

  const copyToClipboard = React.useCallback((text) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setState(text);
        } else {
          throw new Error("writeText is not supported");
        }
      } catch {
        oldSchoolCopy(text);
        setState(text);
      }
    };

    handleCopy();
  }, []);

  return [state, copyToClipboard];
}
