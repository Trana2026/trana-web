'use client';

import { ApiError, useGuardianIdCardImage, useGuardianVerify } from '@trana/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoadingModal } from '@/components/loading-modal';
import { useKycStore } from '@/store/kyc';

export function PersonalInfoForm({ token }: { token: string }) {
  const router = useRouter();
  const ocr = useKycStore((s) => s.ocr);
  const requestId = useKycStore((s) => s.requestId);
  const reset = useKycStore((s) => s.reset);
  const verify = useGuardianVerify();
  const imageQuery = useGuardianIdCardImage({ requestId, token });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageQuery.error) return;
    if (imageQuery.error instanceof ApiError) {
      const code = imageQuery.error.code;
      if (code === 'IDENTITY_410_SESSION' || code === 'IDENTITY_404_SESSION') {
        alert('세션이 만료되었어요. 신분증을 다시 촬영해 주세요.');
        reset();
        router.replace(`/verify/${token}/id-capture`);
        return;
      }
      if (code === 'GUARDIAN_410_LINK') {
        alert('인증 링크가 만료되었어요. 새 링크를 받아주세요.');
        return;
      }
      alert(`${code}: ${imageQuery.error.problem.detail}`);
    }
  }, [imageQuery.error, reset, router, token]);

  useEffect(() => {
    if (!imageQuery.data) return;
    const url = URL.createObjectURL(imageQuery.data);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageQuery.data]);

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
            alert(err.problem.detail); // 사용자 친화 메시지만
            if (err.problem.hint === 'RETRY_PHOTO') {
              reset();
              router.push(`/verify/${token}/id-capture`);
            }
            return;
          }
          alert('알 수 없는 오류가 발생했어요.');
        },
      },
    );
  };

  if (!ocr) return null;

  return (
    <>
      <div className="bg-card rounded-button mt-3 flex aspect-[1.6/1] w-full items-center justify-center overflow-hidden">
        {imageQuery.isLoading ? (
          <span className="text-caption-m text-muted-foreground">이미지 불러오는 중…</span>
        ) : imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="신분증 미리보기" className="h-full w-full object-contain" />
        ) : (
          <span className="text-caption-m text-muted-foreground">이미지를 불러올 수 없어요</span>
        )}
      </div>
      <div className="mt-[22px] flex flex-col gap-2">
        <Field id="name" label="이름" value={ocr.name} />
        <Field id="birth" label="생년월일" value={ocr.birthDate} />
      </div>

      <div className="mt-auto flex flex-col gap-2.5 pt-8">
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
          disabled={verify.isPending || imageQuery.isLoading || !imageUrl}
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
