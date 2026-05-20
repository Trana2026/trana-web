import { CONTENT_LIFT, FIGMA_CENTER_X } from './isometric-grid';

type Dot = { x: number; y: number; size: number };

// 시안 Frame 2078 (375 폭) 기준 좌표
const DOTS: readonly Dot[] = [
  { x: 74, y: 220, size: 16 }, // Ellipse 8
  { x: 128, y: 136, size: 4 }, // Ellipse 11
  { x: 301, y: 225, size: 8 }, // Ellipse 12
  { x: 212, y: 356, size: 8 }, // Ellipse 13
];

const DOT_BG = '#40C572';

// 시안 box-shadow 가 크기에 비례 (16 기준값을 size/16 배)
function shadowFor(size: number) {
  const k = size / 16;
  return [
    `inset ${1 * k}px ${-1 * k}px ${4 * k}px rgba(221, 230, 255, 0.6)`,
    `inset 0 ${1 * k}px ${12 * k}px rgba(194, 255, 243, 0.8)`,
  ].join(', ');
}

export function DecorDots() {
  return (
    <>
      {DOTS.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `calc(50% + ${dot.x - FIGMA_CENTER_X}px)`,
            top: dot.y - CONTENT_LIFT,
            width: dot.size,
            height: dot.size,
            background: DOT_BG,
            boxShadow: shadowFor(dot.size),
          }}
        />
      ))}
    </>
  );
}
