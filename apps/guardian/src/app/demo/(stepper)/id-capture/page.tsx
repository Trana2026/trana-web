'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingModal } from '@/components/loading-modal';

export default function IdCaptureDemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/demo/personal-info');
    }, 2000);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">신분증 촬영</h2>
        <p className="text-body-m text-muted-foreground">
          신원 확인을 위해 신분증 촬영이 필요해요.
        </p>
      </div>

      <div className="mt-[75px] flex flex-col items-center gap-5">
        <div className="bg-card border-primary relative aspect-[335/212] w-full overflow-hidden rounded-[20px] border">
          <div className="text-caption-m text-muted-foreground flex h-full items-center justify-center">
            데모 — 카메라 미리보기 영역
          </div>
          <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2">
            <span className="text-caption-b text-muted-foreground rounded-button bg-neutral-100/90 px-3 py-1">
              영역에 맞춰주세요
            </span>
          </div>
        </div>

        <div className="bg-card rounded-card px-3 py-2.5">
          <span className="text-caption-m text-muted-foreground">
            빛 반사가 없는 밝은 곳에서 촬영해 주세요
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCapture}
        disabled={loading}
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb mt-auto inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
      >
        촬영하기
      </button>

      <LoadingModal open={loading} title="신분증 확인 중" />
    </div>
  );
}
