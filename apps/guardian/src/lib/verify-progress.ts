type ConsentRouteInfo = {
  percent: number;
  hideBack: boolean;
};

const PROGRESS_MAP: Array<{ pattern: RegExp } & ConsentRouteInfo> = [
  { pattern: /^\/verify\/[^/]+$/, percent: 0, hideBack: true },
  { pattern: /^\/verify\/[^/]+\/intro$/, percent: 0, hideBack: false }, // ← 추가
  { pattern: /^\/verify\/[^/]+\/terms$/, percent: 20, hideBack: false },
  { pattern: /^\/verify\/[^/]+\/id-capture$/, percent: 40, hideBack: false },
  { pattern: /^\/verify\/[^/]+\/personal-info$/, percent: 60, hideBack: false },
  { pattern: /^\/verify\/[^/]+\/face-capture$/, percent: 80, hideBack: false },
  { pattern: /^\/verify\/[^/]+\/done$/, percent: 100, hideBack: false },
];

const FALLBACK: ConsentRouteInfo = { percent: 0, hideBack: true };

export function getVerifyRouteInfo(pathname: string): ConsentRouteInfo {
  const match = PROGRESS_MAP.find((m) => m.pattern.test(pathname));
  return match ? { percent: match.percent, hideBack: match.hideBack } : FALLBACK;
}
