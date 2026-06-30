'use client';

import { ApiError, useAgreeConsent } from '@trana/api';
import { Checkbox } from '@trana/ui/components/checkbox';
import { toast } from '@trana/ui/components/sonner';
import { useEffect, useState } from 'react';

type Props = {
  token: string;
  termsVersionIds: number[];
};

export function TermsForm({ token, termsVersionIds }: Props) {
  const [checked, setChecked] = useState(false);
  const agree = useAgreeConsent();

  useEffect(() => {
    // 표준창 close/error/팝업차단 callback. 인증 성공은 returnUrl POST 로 처리되어 여기 호출 안 됨.
    window.onMokResult = (payload: string) => {
      try {
        const res = JSON.parse(payload);
        toast.error(res.resultMsg ?? '본인확인이 취소되었어요.');
      } catch {
        toast.error('본인확인 결과를 읽지 못했어요.');
      }
    };
    return () => {
      delete window.onMokResult;
    };
  }, []);

  const handleSubmit = () => {
    agree.mutate(
      {
        termsVersionIds,
        contextType: 'GUARDIAN_CONSENT',
        ageGroup: 'ADULT',
        guardianLinkToken: token,
      },
      {
        onSuccess: () => {
          if (typeof window === 'undefined' || !window.MOBILEOK) {
            toast.error('본인확인 모듈이 로드되지 않았어요. 새로고침해주세요.');
            return;
          }
          const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
          const url = `${apiBase}/v1/identity/guardian/pass/req-client-info?token=${encodeURIComponent(token)}`;
          const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
          window.MOBILEOK.process(url, isMobile ? 'MB' : 'WB', 'onMokResult');
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            toast.error(`${err.code}: ${err.message}`);
          } else {
            toast.error('약관 동의 중 오류가 발생했어요.');
          }
        },
      },
    );
  };

  const disabled = !checked || agree.isPending;

  return (
    <div className="flex flex-col gap-3">
      <label className="rounded-button bg-card flex cursor-pointer items-center gap-2.5 px-3.5 py-4">
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
          className="size-5 rounded-full"
        />
        <span className="text-body-m-b text-foreground flex-1">모든 약관에 동의합니다.</span>
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={handleSubmit}
        className={`rounded-button text-body-l-sb w-full px-5 py-3.5 transition-colors ${
          disabled
            ? 'cursor-not-allowed bg-neutral-50 text-neutral-300 dark:bg-neutral-600 dark:text-neutral-500'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {agree.isPending ? '잠시만요...' : '본인 인증 시작하기'}
      </button>
    </div>
  );
}
