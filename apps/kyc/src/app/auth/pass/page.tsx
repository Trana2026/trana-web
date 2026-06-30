'use client';

import { toast } from '@trana/ui/components/sonner';
import Script from 'next/script';
import { useEffect, useState } from 'react';

type SignupPayload = {
  resultCode?: string;
  statusCode?: string;
  resultMsg?: string;
  purpose?: string;
  accessToken?: string;
  refreshToken?: string;
  publicCode?: string;
  requiresGuardian?: boolean;
  code?: string;
};

export default function AuthPassPage() {
  const [signupSessionId, setSignupSessionId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSignupSessionId(params.get('signupSessionId'));
    setReady(true);

    window.onMokResult = (payload: string) => {
      let res: SignupPayload;
      try {
        res = JSON.parse(payload);
      } catch {
        toast.error('본인확인 결과를 읽지 못했어요.');
        return;
      }

      const sdkCode = res.resultCode ?? res.statusCode;
      if (sdkCode && sdkCode !== '2000') {
        toast.error(res.resultMsg ?? '본인확인이 취소되었어요.');
        return;
      }

      if (res.purpose === 'SIGNUP' || res.purpose === 'ERROR') {
        if (window.flutter_inappwebview) {
          window.flutter_inappwebview.callHandler('onPassResult', res);
        } else {
          toast.info('[테스트] 본인확인 응답을 정상 수신했어요. 실제 처리는 앱에서 진행됩니다.');
        }
        return;
      }

      console.warn('MOK 예상치 못한 payload', res);
      toast.error('본인확인 결과를 처리하지 못했어요.');
    };

    return () => {
      delete window.onMokResult;
    };
  }, []);

  const handleStart = () => {
    if (!signupSessionId) {
      toast.error('signupSessionId 가 없어요.');
      return;
    }
    if (typeof window === 'undefined' || !window.MOBILEOK) {
      toast.error('본인확인 모듈이 로드되지 않았어요. 새로고침해주세요.');
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${apiBase}/v1/identity/pass/req-client-info?signupSessionId=${encodeURIComponent(signupSessionId)}`;
    const device = window.flutter_inappwebview ? 'MWV' : 'MB';
    window.MOBILEOK.process(url, device, 'onMokResult');
  };

  if (!ready) return null;

  return (
    <>
      <Script src={process.env.NEXT_PUBLIC_MOBILE_OK_SCRIPT} strategy="afterInteractive" />
      <div className="bg-background min-h-dvh">
        <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col items-center justify-center gap-6 px-5">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-header-s-b text-foreground">본인 인증</h1>
            <p className="text-body-m text-muted-foreground">
              안전한 가입을 위해 본인 인증이 필요해요.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={!signupSessionId}
            className="rounded-button text-body-l-sb w-full px-5 py-3.5 transition-colors disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300 dark:disabled:bg-neutral-600 dark:disabled:text-neutral-500"
            style={
              !signupSessionId
                ? undefined
                : { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }
            }
          >
            본인 인증 시작하기
          </button>
        </div>
      </div>
    </>
  );
}
