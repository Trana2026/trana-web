'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoadingModal } from '@/components/loading-modal';

const MOCK_OCR = {
  name: '홍길동',
  birthDate: '1985-03-15',
};

export default function PersonalInfoDemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setImageReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleRetake = () => {
    router.push('/demo/id-capture');
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/demo/face-capture');
    }, 2000);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">정보 확인</h2>
        <p className="text-body-m text-muted-foreground">스캔된 신분증 정보를 확인해 주세요.</p>
      </div>

      <div className="bg-brand-soft rounded-button mt-3 flex items-center gap-3 p-4.5">
        <span className="bg-brand-soft grid h-6 w-6 shrink-0 place-items-center rounded-full">
          <span className="bg-primary h-3 w-3 rounded-full" />
        </span>
        <p className="text-caption-m text-primary flex-1">
          신분증 인식이 완료되었습니다. 아래 정보가 정확한지 확인해 주세요.
        </p>
      </div>

      <div className="bg-card rounded-button mt-3 flex aspect-[1.6/1] w-full items-center justify-center overflow-hidden">
        {imageReady ? (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200">
            <span className="text-caption-m text-muted-foreground">신분증 이미지 (데모)</span>
          </div>
        ) : (
          <span className="text-caption-m text-muted-foreground">이미지 불러오는 중…</span>
        )}
      </div>

      <div className="mt-[22px] flex flex-col gap-2">
        <Field id="name" label="이름" value={MOCK_OCR.name} />
        <Field id="birth" label="생년월일" value={MOCK_OCR.birthDate} />
      </div>

      <div className="mt-auto flex flex-col gap-2.5 pt-8">
        <button
          type="button"
          onClick={handleRetake}
          disabled={loading}
          className="bg-card text-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          다시 촬영하기
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading || !imageReady}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
        >
          정보 확인 완료
        </button>
      </div>

      <LoadingModal open={loading} title="본인 확인 중" />
    </div>
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
