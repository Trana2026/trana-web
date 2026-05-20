type ConsentRouteInfo = {
  percent: number;
  hideBack: boolean;
};

const PROGRESS_MAP: Array<{ pattern: RegExp } & ConsentRouteInfo> = [
  { pattern: /^\/(verify\/[^/]+|demo)$/, percent: 0, hideBack: true },
  { pattern: /^\/(verify\/[^/]+|demo)\/intro$/, percent: 0, hideBack: true },
  { pattern: /^\/(verify\/[^/]+|demo)\/terms$/, percent: 20, hideBack: false },
  { pattern: /^\/(verify\/[^/]+|demo)\/id-capture$/, percent: 40, hideBack: false },
  { pattern: /^\/(verify\/[^/]+|demo)\/personal-info$/, percent: 60, hideBack: false },
  { pattern: /^\/(verify\/[^/]+|demo)\/face-capture$/, percent: 80, hideBack: false },
  { pattern: /^\/(verify\/[^/]+|demo)\/done$/, percent: 100, hideBack: false },
];

const FALLBACK: ConsentRouteInfo = { percent: 0, hideBack: true };

export function getVerifyRouteInfo(pathname: string): ConsentRouteInfo {
  const match = PROGRESS_MAP.find((m) => m.pattern.test(pathname));
  return match ? { percent: match.percent, hideBack: match.hideBack } : FALLBACK;
}
