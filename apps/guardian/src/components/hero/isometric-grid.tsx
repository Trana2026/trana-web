type Tile = { x: number; y: number; accent?: boolean };

// 시안 Frame 2078 (375 폭) 기준 좌표. accent = Rectangle 5010
const TILES: readonly Tile[] = [
  { x: 195.36, y: 118 }, // 5007
  { x: 317.74, y: 167.45 }, // 5012
  { x: 74.77, y: 171.69 }, // 5006
  { x: 440.13, y: 216.9 }, // 5017
  { x: 197.15, y: 221.14 }, // 5011
  { x: -45.82, y: 225.38 }, // 5005
  { x: 76.57, y: 244.83, accent: true }, // 5010
  { x: 319.54, y: 270.59 }, // 5016
  { x: -166.41, y: 279.07 }, // 5004
  { x: 198.95, y: 324.28 }, // 5015
  { x: -44.02, y: 328.52 }, // 5009
  { x: -287, y: 332.76 }, // 5003
  { x: 78.36, y: 377.97 }, // 5014
  { x: -164.61, y: 382.21 }, // 5008
  { x: -42.22, y: 431.65 }, // 5013
];

const ISO_TRANSFORM = 'matrix(0.91, -0.41, 0.93, 0.37, 0, 0)';

const ACCENT_SHADOW =
  'inset 1px -10px 40px rgba(221, 230, 255, 0.6), inset 0 4px 40px rgba(194, 255, 243, 0.8)';

export function IsometricGrid() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {TILES.map((tile, i) => (
        <div
          key={i}
          className="absolute size-[120px] rounded-[30px]"
          style={{
            left: `calc(50% + ${tile.x - FIGMA_CENTER_X}px)`,
            top: tile.y,
            background: tile.accent ? 'var(--iso-accent-bg)' : 'var(--iso-tile-bg)',
            boxShadow: tile.accent ? ACCENT_SHADOW : 'var(--iso-tile-shadow)',
            transform: ISO_TRANSFORM,
            transformOrigin: '0 0',
          }}
        />
      ))}
    </div>
  );
}

export const FIGMA_CENTER_X = 187.5;
export const ACCENT_TILE_POS = { x: 76.57, y: 244.83 }; // Rectangle 5010
export const ACCENT_TILE_CENTER = { x: 186.97, y: 242.43 }; // 5010 의 matrix 적용 후 시각 가운데
export const CONTENT_LIFT = 50;
