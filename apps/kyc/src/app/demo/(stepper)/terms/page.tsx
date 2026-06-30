'use client';

import { Checkbox } from '@trana/ui/components/checkbox';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingModal } from '@/components/loading-modal';

const TERMS = [
  { id: 1, title: '서비스 이용 약관', contentUrl: '#' },
  { id: 2, title: '개인정보 처리 방침', contentUrl: '#' },
  { id: 3, title: '본인 인증 정보 수집 동의', contentUrl: '#' },
];

export default function TermsDemoPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/demo/id-capture');
    }, 1000);
  };

  const disabled = !checked || loading;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-header-s-b text-foreground">서비스 이용 약관</h2>
            <p className="text-body-m text-muted-foreground">
              원활한 서비스 이용을 위해 약관에 동의해 주세요.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="bg-card rounded-card flex flex-col gap-6 px-4.5 py-6">
              {TERMS.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3">
                  <h3 className="text-body-m-b text-foreground">{t.title}</h3>
                  <a
                    href={t.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption-b text-muted-foreground underline"
                  >
                    전문 보기
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
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
            본인 인증 시작하기
          </button>
        </div>
      </div>

      <LoadingModal open={loading} title="약관 동의 처리 중" description="잠시만 기다려주세요" />
    </>
  );
}
