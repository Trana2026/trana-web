'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TermsForm({ token }: { token: string }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {/* 동의 체크 row */}
      <button
        type="button"
        onClick={() => setChecked((c) => !c)}
        className="rounded-button bg-card flex items-center gap-2.5 px-3.5 py-4 text-left"
      >
        <span
          className={`grid h-5 w-5 place-items-center rounded-full transition-colors ${
            checked ? 'bg-primary' : 'bg-card border border-neutral-200'
          }`}
          aria-hidden="true"
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6.5L5 9L9.5 3.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="text-body-m-b text-foreground flex-1">모든 약관에 동의합니다.</span>
      </button>

      {/* CTA 버튼 (체크 상태 따라 활성/비활성) */}
      <button
        type="button"
        disabled={!checked}
        onClick={() => router.push(`/consent/${token}/id-capture`)}
        className={`rounded-button text-body-l-sb w-full px-5 py-3.5 transition-colors ${
          checked
            ? 'bg-primary text-primary-foreground'
            : 'cursor-not-allowed bg-neutral-50 text-neutral-300'
        }`}
      >
        본인 인증 시작하기
      </button>
    </div>
  );
}
