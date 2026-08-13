"use client";

import { Box, type BoxProps } from "@mui/material";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

const COLOR_SET = ["ffae03", "e67f0d", "fe4e00", "e9190f", "ff0f80"].map(
  (color) => `#${color}`,
);

interface Size {
  width: number;
  height: number;
}

interface DrawnBorderProps {
  children: ReactNode;
  colors?: readonly string[];
  durationMs?: number;
  strokeWidth?: number;
  borderRadius?: number;
  sx?: BoxProps["sx"];
}

export default function DrawnBorder({
  children,
  colors = COLOR_SET,
  durationMs = 500,
  strokeWidth = 2,
  borderRadius = 5,
  sx,
}: DrawnBorderProps) {
  const gradientId = `drawn-border-${useId().replace(/:/g, "")}`;
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = boxRef.current;
    if (!element) {
      return;
    }

    const syncSize = () => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    syncSize();

    const observer = new ResizeObserver(syncSize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const strokeInset = strokeWidth / 2;
  const rectWidth = Math.max(size.width - strokeInset * 2, 0);
  const rectHeight = Math.max(size.height - strokeInset * 2, 0);
  const gradientStops = colors.length > 0 ? [...colors, colors[0]] : COLOR_SET;

  return (
    <Box
      ref={boxRef}
      sx={[
        {
          position: "relative",
          borderRadius,
          "& .drawn-border-stroke": {
            strokeDasharray: 1,
            strokeDashoffset: 1,
            transition: `stroke-dashoffset ${durationMs}ms ease`,
          },
          "&:hover .drawn-border-stroke": {
            strokeDashoffset: 0,
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {size.width > 0 && size.height > 0 ? (
        <svg
          aria-hidden
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {gradientStops.map((color, index) => (
                <stop
                  key={`${color}-${index}`}
                  offset={`${(index / (gradientStops.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <rect
            className="drawn-border-stroke"
            x={strokeInset}
            y={strokeInset}
            width={rectWidth}
            height={rectHeight}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            pathLength={1}
          />
        </svg>
      ) : null}
      {children}
    </Box>
  );
}
