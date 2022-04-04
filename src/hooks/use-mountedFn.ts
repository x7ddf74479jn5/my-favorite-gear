import { useEffect, useRef } from "react";

export const useMountedFn = (cb: () => void) => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      cb();
      isFirstRender.current = false;
    }
    return () => {
      isFirstRender.current = false;
    };
  }, [cb]);
};
