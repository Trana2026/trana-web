import { api } from '@trana/api';

import { TermsForm } from '@/components/verify/terms-form';

export default async function TermsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const terms = await api.terms.list();
  const termsVersionIds = terms.map((t) => t.id);

  return (
    <div className="flex flex-1 flex-col">
      {/* 상단: 제목 + 약관 목록 */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-header-s-b text-foreground">서비스 이용 약관</h2>
          <p className="text-body-m text-muted-foreground">
            원활한 서비스 이용을 위해 약관에 동의해 주세요.
          </p>
        </div>

        <div className="flex flex-col">
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
        </div>
      </div>

      {/* 하단: 체크박스 + CTA */}
      <div className="mt-auto">
        <TermsForm token={token} termsVersionIds={termsVersionIds} />
      </div>
    </div>
  );
}
