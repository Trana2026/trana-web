'use client';

import { ApiError, useGuardianCompare } from '@trana/api';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { LoadingModal } from '@/components/loading-modal';
import { useKycStore } from '@/store/kyc';

const VIDEO_CONSTRAINTS = {
  facingMode: 'user', // 전면 카메라
  width: { ideal: 1280 },
  height: { ideal: 720 },
};

export function FaceCaptureForm({ token }: { token: string }) {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const requestId = useKycStore((s) => s.requestId);
  const compare = useGuardianCompare();
  const [cameraError, setCameraError] = useState<string | null>(null);

  // requestId 없으면 처음부터
  useEffect(() => {
    if (!requestId) {
      router.replace(`/verify/${token}/id-capture`);
    }
  }, [requestId, router, token]);

  const handleCapture = useCallback(() => {
    if (!requestId) return;
    const webcam = webcamRef.current;
    if (!webcam) return;

    const screenshot = webcam.getScreenshot();
    if (!screenshot) {
      setCameraError('촬영에 실패했어요. 다시 시도해 주세요.');
      return;
    }

    webcam.stream?.getTracks().forEach((track) => track.stop());

    const file = dataUrlToFile(screenshot, 'selfie.jpg');

    compare.mutate(
      { token, requestId, file },
      {
        onSuccess: () => {
          router.push(`/verify/${token}/done`);
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            alert(err.problem.detail);
            if (err.problem.hint === 'RETRY_PHOTO') {
              // compare 실패는 신분증보다는 셀카 문제 가능성 높음 → 현재 페이지에서 재촬영
              setCameraError(null);
              // Webcam 컴포넌트 재마운트 위해 페이지 자체 refresh 가 가장 단순
              router.refresh();
            }
            return;
          }
          alert('알 수 없는 오류가 발생했어요.');
        },
      },
    );
  }, [compare, requestId, router, token]);

  if (!requestId) return null;

  return (
    <>
      {/* 원형 얼굴 viewport */}
      <div className="border-primary bg-card relative mx-auto mt-[73px] size-[260px] overflow-hidden rounded-full border-[7px] drop-shadow-xl">
        {cameraError ? (
          <div className="flex h-full items-center justify-center px-4 text-center">
            <span className="text-caption-m text-error-500">{cameraError}</span>
          </div>
        ) : compare.isPending || compare.isSuccess ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-caption-m text-muted-foreground">처리 중…</span>
          </div>
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={VIDEO_CONSTRAINTS}
            mirrored
            onUserMediaError={() => {
              setCameraError('카메라 권한이 필요해요. 브라우저 설정에서 허용해 주세요.');
            }}
            className="h-full w-full object-cover"
          />
        )}
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
          disabled={compare.isPending || !!cameraError}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
        >
          인증 완료
        </button>
      </div>

      <LoadingModal open={compare.isPending} title="얼굴 확인 중" />
    </>
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

function dataUrlToFile(dataUrl: string, filename: string): File {
  const [header, base64 = ''] = dataUrl.split(',');
  const mime = /:(.*?);/.exec(header ?? '')?.[1] ?? 'image/jpeg';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}
