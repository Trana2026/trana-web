'use client';

import { ApiError, useGuardianVerify } from '@trana/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoadingModal } from '@/components/loading-modal';
import { useKycStore } from '@/store/kyc';

export function PersonalInfoForm({ token }: { token: string }) {
  const router = useRouter();
  const ocr = useKycStore((s) => s.ocr);
  const requestId = useKycStore((s) => s.requestId);
  const reset = useKycStore((s) => s.reset);
  const verify = useGuardianVerify();

  // OCR 데이터 없으면 id-capture 로 돌려보냄 (새로고침/직접 진입 대응)
  useEffect(() => {
    if (!ocr || !requestId) {
      router.replace(`/verify/${token}/id-capture`);
    }
  }, [ocr, requestId, router, token]);

  const handleRetake = () => {
    reset();
    router.push(`/verify/${token}/id-capture`);
  };

  const handleConfirm = () => {
    if (!requestId) return;
    verify.mutate(
      { requestId, token },
      {
        onSuccess: () => {
          router.push(`/verify/${token}/face-capture`);
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            alert(`${err.code}: ${err.problem.detail}`);
          } else if (err instanceof Error) {
            alert(`Error: ${err.message}`);
          } else {
            alert('알 수 없는 오류가 발생했어요.');
          }
        },
      },
    );
  };

  if (!ocr) return null;

  return (
    <>
      <div className="mt-[22px] flex flex-col gap-2">
        <Field id="name" label="이름" value={ocr.name} />
        <Field id="birth" label="생년월일" value={ocr.birthDate} />
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleRetake}
          disabled={verify.isPending}
          className="bg-card text-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          다시 촬영하기
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={verify.isPending}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
        >
          정보 확인 완료
        </button>
      </div>

      <LoadingModal open={verify.isPending} title="본인 확인 중" />
    </>
  );
}

function Field({ id, label, value }: { id: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-body-m pl-1.5 text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        readOnly
        className="bg-card rounded-button text-body-m text-foreground h-[53px] w-full px-3.5 outline-none"
      />
    </div>
  );
}
