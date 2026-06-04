'use client';

import { ApiError, useApproveContractGuardianConsent } from '@trana/api';
import { Checkbox } from '@trana/ui/components/checkbox';
import { toast } from '@trana/ui/components/sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  token: string;
};

export function ContractConsentForm({ token }: Props) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const approve = useApproveContractGuardianConsent();

  const handleSubmit = () => {
    approve.mutate(
      { token },
      {
        onSuccess: () => {
          router.push('/contract/done');
        },
        onError: (err) => {
          // 410 GUARDIAN_CONSENT_LINK_INVALID — 토큰 사용/만료
          // 409 GUARDIAN_CONSENT_ALREADY — 이미 동의됨
          if (err instanceof ApiError) {
            toast.error(err.message ?? '동의 처리 중 오류가 발생했어요.');
          } else {
            toast.error('알 수 없는 오류가 발생했어요.');
          }
        },
      },
    );
  };

  const disabled = !checked || approve.isPending;

  return (
    <div className="flex flex-col gap-2.5">
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
        {approve.isPending ? '전송 중...' : '본인 인증 시작하기'}
      </button>
    </div>
  );
}
