import { useLayoutEffect, useRef } from "react";

export const useMountedFn = (cb: () => void) => {
  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      cb();
      isFirstRender.current = false;
    }
  }, [cb]);
};
