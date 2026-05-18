type ConsentRouteInfo = {
  percent: number;
  hideBack: boolean;
};

const PROGRESS_MAP: Array<{ pattern: RegExp } & ConsentRouteInfo> = [
  { pattern: /^\/consent\/[^/]+$/, percent: 0, hideBack: true },
  { pattern: /^\/consent\/[^/]+\/terms$/, percent: 20, hideBack: false },
  { pattern: /^\/consent\/[^/]+\/id-capture$/, percent: 40, hideBack: false },
  { pattern: /^\/consent\/[^/]+\/personal-info$/, percent: 60, hideBack: false },
  { pattern: /^\/consent\/[^/]+\/face-capture$/, percent: 80, hideBack: false },
  { pattern: /^\/consent\/[^/]+\/done$/, percent: 100, hideBack: false },
];

const FALLBACK: ConsentRouteInfo = { percent: 0, hideBack: true };

export function getConsentRouteInfo(pathname: string): ConsentRouteInfo {
  const match = PROGRESS_MAP.find((m) => m.pattern.test(pathname));
  return match ? { percent: match.percent, hideBack: match.hideBack } : FALLBACK;
}
