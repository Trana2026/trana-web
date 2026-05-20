'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingModal } from '@/components/loading-modal';

export default function FaceCaptureDemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/demo/done');
    }, 2000);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">실물 인증</h2>
        <p className="text-body-m text-muted-foreground">
          본인 여부를 확인합니다. 화면을 응시해 주세요.
        </p>
      </div>

      {/* 원형 얼굴 viewport */}
      <div className="border-primary bg-card relative mx-auto mt-[73px] size-[260px] overflow-hidden rounded-full border-[7px] drop-shadow-xl">
        <div className="text-caption-m text-muted-foreground flex h-full items-center justify-center">
          데모 — 카메라 영역
        </div>
      </div>

      {/* 지시 버블 */}
      <div className="bg-card rounded-button mx-auto mt-[22px] inline-flex w-fit items-center gap-2.5 px-6 py-3.5">
        <FaceDirectionIcon />
        <span className="text-body-l-sb text-foreground">정면을 응시해 주세요</span>
      </div>

      <div className="mt-auto pt-[128px]">
        <button
          type="button"
          onClick={handleCapture}
          disabled={loading}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
        >
          인증 완료
        </button>
      </div>

      <LoadingModal open={loading} title="얼굴 확인 중" />
    </div>
  );
}

function FaceDirectionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 8V3H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 16V21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 21H21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />
      <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
