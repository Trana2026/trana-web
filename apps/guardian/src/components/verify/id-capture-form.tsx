'use client';

import { ApiError, useGuardianOcr } from '@trana/api';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { LoadingModal } from '@/components/loading-modal';
import { cropVideoToAspect } from '@/lib/canvas-crop';
import { useKycStore } from '@/store/kyc';

const BOX_ASPECT = 335 / 212;

const VIDEO_CONSTRAINTS = {
  facingMode: { ideal: 'environment' },
  width: { ideal: 1920 },
  height: { ideal: 1080 },
};

export function IdCaptureForm({ token }: { token: string }) {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const ocr = useGuardianOcr();
  const setOcr = useKycStore((s) => s.setOcr);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const handleCapture = useCallback(async () => {
    const webcam = webcamRef.current;
    const video = webcam?.video;
    if (!webcam || !video) {
      setCameraError('촬영에 실패했어요. 다시 시도해 주세요.');
      return;
    }

    let file: File;
    try {
      file = await cropVideoToAspect(video, BOX_ASPECT, 'id-card.jpg');
    } catch {
      setCameraError('촬영에 실패했어요. 다시 시도해 주세요.');
      return;
    }

    // crop 끝난 뒤 stream stop (drawImage 가 video 를 읽어야 하므로 순서 중요)
    webcam.stream?.getTracks().forEach((track) => track.stop());

    ocr.mutate(
      { token, file },
      {
        onSuccess: (result) => {
          setOcr(result);
          router.push(`/verify/${token}/personal-info`);
        },
        onError: (err) => {
          setRetryKey((k) => k + 1);
          if (err instanceof ApiError) {
            alert(`${err.code}: ${err.problem.detail}`);
          } else {
            alert('알 수 없는 오류가 발생했어요.');
          }
        },
      },
    );
  }, [ocr, router, setOcr, token]);

  return (
    <>
      <div className="mt-[75px] flex flex-col items-center gap-5">
        <div className="bg-card border-primary relative aspect-[335/212] w-full overflow-hidden rounded-[20px] border">
          {cameraError ? (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <span className="text-caption-m text-error-500">{cameraError}</span>
            </div>
          ) : (
            <Webcam
              key={retryKey}
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={VIDEO_CONSTRAINTS}
              onUserMediaError={() => {
                setCameraError('카메라 권한이 필요해요. 브라우저 설정에서 허용해 주세요.');
              }}
              className="h-full w-full object-cover"
            />
          )}
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
        disabled={ocr.isPending || !!cameraError}
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb mt-auto inline-flex w-full items-center justify-center px-5 py-3.5 disabled:opacity-50"
      >
        촬영하기
      </button>

      <LoadingModal open={ocr.isPending} title="신분증 확인 중" />
    </>
  );
}
