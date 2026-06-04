'use client';

import { usePathname, useRouter } from 'next/navigation';

import { getVerifyRouteInfo } from '@/lib/verify-progress';

function BackIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <path
        d="M14.5 5.25L7.75 12L14.5 18.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  /** 헤더 가운데 라벨. 미지정 시 기본값. */
  title?: string;
  /** 진행도(0~100). 미지정 시 pathname 기반 verify 진행도 사용. */
  percent?: number;
  /** 뒤로가기 숨김. 미지정 시 pathname 기반. */
  hideBack?: boolean;
};

export function AppHeader({ title, percent, hideBack }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const fallback = getVerifyRouteInfo(pathname);

  const resolvedPercent = percent ?? fallback.percent;
  const resolvedHideBack = hideBack ?? fallback.hideBack;
  const resolvedTitle = title ?? '본인 인증';

  return (
    <header className="bg-background">
      <div className="relative flex h-6 items-center px-4">
        {!resolvedHideBack && (
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="text-foreground -ml-2.5 grid h-11 w-11 cursor-pointer touch-manipulation place-items-center"
          >
            <BackIcon />
          </button>
        )}
        <h1 className="text-body-l-b text-foreground absolute left-1/2 -translate-x-1/2">
          {resolvedTitle}
        </h1>
      </div>
      <div className="mt-4 h-1 w-full">
        <div
          className="bg-primary h-full transition-[width] duration-300 ease-out"
          style={{ width: `${resolvedPercent}%` }}
        />
      </div>
    </header>
  );
}
