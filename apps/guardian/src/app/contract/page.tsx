import { api } from '@trana/api';
import { notFound } from 'next/navigation';

import { ContractConsentForm } from '@/components/contract/contract-consent-form';
import { AppHeader } from '@/components/header';

type SearchParams = Promise<{ token?: string; openExternalBrowser?: string }>;

export default async function ContractConsentPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;
  if (!token) notFound();

  const terms = await api.terms.list();

  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col pt-[60px] pb-10">
        <AppHeader title="법정대리인 계약 동의" percent={50} hideBack={false} />
        <main className="mt-6 flex flex-1 flex-col gap-5 px-5">
          {/* 타이틀 블록 (Frame 124) */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-header-s-b text-foreground">서비스 이용 약관</h2>
            <p className="text-body-m text-muted-foreground">
              원활한 서비스 이용을 위해 약관에 동의해 주세요.
            </p>
          </div>

          {/* 약관 카드 (Frame 114) */}
          <div className="bg-card rounded-card flex flex-col gap-6 px-4.5 py-6">
            {terms.map((t) => (
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

          {/* footer form (Frame 128) — mt-auto 로 하단 고정 */}
          <div className="mt-auto">
            <ContractConsentForm token={token} />
          </div>
        </main>
      </div>
    </div>
  );
}
