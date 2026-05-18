import Link from 'next/link';

export default async function ConsentEntryPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 상단: 안내 + 카드 */}
      <div className="flex flex-col items-center gap-3">
        <InfoBadge />

        <div className="text-center">
          <h2 className="text-body-l-b text-foreground">법정대리인 인증 안내</h2>
          <p className="text-caption-m text-muted-foreground mt-1">
            미성년자 계약 효력을 위해 보호자 본인 인증이 필요해요.
          </p>
        </div>

        <div className="mt-3 flex w-full flex-col gap-3">
          <GuideCard title="꼭 확인하세요">
            법정대리인의 본인 인증은 미성년자의 계약이 법적 효력을 갖기 위한 동의 확인을 위해
            진행됩니다.
          </GuideCard>

          <GuideCard title="꼭 확인하세요">
            이번 인증은 <strong>신분증 촬영과 얼굴 인증 단계</strong>가 포함되어 있어요. <br />
            카메라 사용이 필요하므로 모바일 기기에서 진행해 주세요. <br />
            (PC 환경·저조도 환경에서는 인증이 원활하지 않을 수 있어요.)
          </GuideCard>

          <GuideCard title="인증 전에 준비해 주세요">
            법정대리인 본인의 신분증(주민등록증/운전면허증/여권 중 1) <br />
            밝은 곳에서 촬영할 수 있는 환경 <br />
            마스크/모자/선글라스는 얼굴 인증 전에 벗어 주세요.
          </GuideCard>
        </div>
      </div>

      {/* 하단: 버튼 */}
      <div className="mt-auto flex flex-col gap-3 pt-22">
        <Link
          href="/"
          className="bg-secondary text-secondary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 transition-colors"
        >
          취소하기
        </Link>
        <Link
          href={`/consent/${token}/terms`}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5 transition-colors"
        >
          인증하기
        </Link>
      </div>
    </div>
  );
}

function InfoBadge() {
  return (
    <div className="bg-info-soft text-info-500 grid h-10 w-10 place-items-center rounded-full">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="8.5" r="1.25" fill="currentColor" />
        <path d="M12 11.5v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function GuideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-card p-4">
      <h3 className="text-caption-b text-foreground">{title}</h3>
      <p className="text-caption-m text-muted-foreground mt-1">{children}</p>
    </div>
  );
}
