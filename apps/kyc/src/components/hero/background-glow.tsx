import { FIGMA_CENTER_X } from './isometric-grid';

export function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ellipse 2 — 우상단 brand 글로우 */}
      <div
        className="absolute h-[532px] w-[532px] rounded-full blur-[200px]"
        style={{
          left: `calc(50% + ${109 - FIGMA_CENTER_X}px)`, // = -78.5
          top: -100,
          background: '#40C572',
          opacity: 0.5,
        }}
      />
      {/* Ellipse 1 — 좌하단 네온 글로우 */}
      <div
        className="absolute h-[532px] w-[532px] rounded-full blur-[200px]"
        style={{
          left: `calc(50% + ${-246 - FIGMA_CENTER_X}px)`, // = -433.5
          top: 138,
          background: '#3AFF90',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
