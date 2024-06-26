import React, { useEffect, RefObject } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
};

export default useOutsideClick;
