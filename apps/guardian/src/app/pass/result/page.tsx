'use client';

import { useEffect, useState } from 'react';

import { AppHeader } from '@/components/header';

type PassResult = {
  status: 'success' | string | null;
  minorPublicCode: string | null;
};

export default function PassResultPage() {
  const [result, setResult] = useState<PassResult | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    setResult({
      status: params.get('status'),
      minorPublicCode: params.get('minorPublicCode'),
    });
    // fragment 즉시 제거 — 브라우저 history / referer 노출 차단 (보안 체크리스트)
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  if (!result) return null;

  const isSuccess = result.status === 'success';

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col pt-[60px] pb-10">
        <AppHeader title="본인 인증 완료" percent={100} hideBack />
        <main className="mt-6 flex flex-1 flex-col gap-5 px-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-header-s-b text-foreground">
              {isSuccess ? '인증 완료!' : '인증을 완료하지 못했어요'}
            </h2>
            <p className="text-body-m text-muted-foreground">
              {isSuccess ? (
                <>
                  자녀가 안전하게 가입할 수 있어요. <br />
                  자녀에게 알림이 전송됐어요.
                </>
              ) : (
                <>
                  본인확인이 정상 완료되지 않았어요. <br />
                  자녀가 보낸 알림톡으로 다시 시도해주세요.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center">
            {isSuccess ? <SuccessIcon /> : <FailureIcon />}
          </div>

          {isSuccess && (
            <a
              href="https://trana.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
            >
              Trana 더 알아보기
            </a>
          )}
        </main>
      </div>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className="bg-brand-soft text-primary grid h-20 w-20 place-items-center rounded-full">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M12 24L20 32L36 16"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FailureIcon() {
  return (
    <div className="bg-error-soft text-error-500 grid h-20 w-20 place-items-center rounded-full">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M16 16L32 32M32 16L16 32"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
