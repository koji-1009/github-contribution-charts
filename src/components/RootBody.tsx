import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export function RootBody(props: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>();
  const setRef = useCallback((node: HTMLDivElement) => {
    ref.current = node;
  }, []);

  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={setRef}>
      {width < 600 ? (
        <Box marginX={2} marginY={2}>
          {props.children}
        </Box>
      ) : width < 906 ? (
        <Box marginX={4} marginY={2}>
          {props.children}
        </Box>
      ) : width < 1240 ? (
        <Box alignItems={"center"} width={840} marginX={"auto"} marginY={2}>
          {props.children}
        </Box>
      ) : (
        <Box marginX={25} marginY={2}>
          {props.children}
        </Box>
      )}
    </div>
  );
}
