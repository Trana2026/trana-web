'use client';

import { ApiError, useAgreeConsent } from '@trana/api';
import { Checkbox } from '@trana/ui/components/checkbox';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  token: string;
  termsVersionIds: number[];
};

export function TermsForm({ token, termsVersionIds }: Props) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const agree = useAgreeConsent();

  const handleSubmit = () => {
    agree.mutate(
      {
        termsVersionIds,
        contextType: 'SIGNUP',
        ageGroup: 'ADULT',
        guardianLinkToken: token,
      },
      {
        onSuccess: () => {
          router.push(`/verify/${token}/id-capture`);
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            alert(`${err.code}: ${err.message}`);
          } else {
            alert('알 수 없는 오류가 발생했어요.');
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
            ? 'cursor-not-allowed bg-neutral-50 text-neutral-300'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {agree.isPending ? '전송 중...' : '본인 인증 시작하기'}
      </button>
    </div>
  );
}
