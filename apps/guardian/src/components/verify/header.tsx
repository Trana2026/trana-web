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

export function VerifyHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { percent, hideBack } = getVerifyRouteInfo(pathname);

  return (
    <header className="bg-background">
      <div className="relative flex h-6 items-center px-4">
        {!hideBack && (
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
          본인 인증
        </h1>
      </div>
      <div className="mt-4 h-1 w-full">
        <div
          className="bg-primary h-full transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}
