'use client';

import { useEffect, useState } from 'react';

const IN_APP_PATTERNS = [
  /KAKAOTALK/i,
  /Instagram/i,
  /FBAN|FBAV/i, // Facebook
  /Twitter/i,
  /; wv\)/i, // Android WebView (일반)
];

export function ExternalBrowserGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsInApp(IN_APP_PATTERNS.some((p) => p.test(navigator.userAgent)));
  }, []);

  // SSR / 초기 hydration 동안은 children 그대로 (CLS 방지)
  if (!mounted) return <>{children}</>;
  if (isInApp) return <InAppGuide />;
  return <>{children}</>;
}

function InAppGuide() {
  const [copied, setCopied] = useState(false);

  const handleOpenExternal = () => {
    const ua = navigator.userAgent;
    const url = window.location.href;

    if (/KAKAOTALK/i.test(ua)) {
      // 카톡: 네이티브 스킴으로 외부 브라우저 강제
      location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
      return;
    }
    // 그 외: 복사 액션으로 대체 (인스타/페북은 스킴 없음)
    void handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 폴백 — 권한 거부 시 무시
    }
  };

  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <h1 className="text-header-s-b text-foreground">외부 브라우저에서 열어주세요</h1>
      <p className="text-body-m text-muted-foreground mt-3">
        카메라 권한 문제로 인앱 브라우저에서는 본인 인증이 불가능해요.
        <br />
        Safari 또는 Chrome 에서 열어주세요.
      </p>

      <div className="mt-8 flex w-full max-w-[320px] flex-col gap-3">
        <button
          type="button"
          onClick={handleOpenExternal}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb px-5 py-3.5"
        >
          외부 브라우저로 열기
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-card text-foreground rounded-button text-body-l-sb border px-5 py-3.5"
        >
          {copied ? '복사 완료!' : '주소 복사'}
        </button>
      </div>
    </main>
  );
}
