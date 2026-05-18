import { TermsForm } from '@/components/consent/terms-form';

const TERMS_SECTIONS = [
  {
    title: '1. 목적',
    body: 'Trana는 개인 간의 안전한 물품 거래를 돕기 위해 전자 계약 서비스를 제공합니다. 본 약관은 미성년자가 서비스를 이용하는 경우 및 그 이용에 대해 법정대리인이 동의하는 경우에 적용됩니다.',
  },
  {
    title: '2. 본인 인증',
    body: '신원 확인을 위해 신분증 OCR 스캔 및 안면 인식 정보 수집에 동의합니다.',
  },
  {
    title: '3. 개인정보 보호',
    body: '귀하의 개인정보는 암호화되어 저장되며, 제3자에게 판매되지 않습니다.',
  },
  {
    title: '4. 책임의 한계',
    body: 'Trana는 거래 당사자 간의 계약 내용에 대해 직접적인 책임을 지지 않습니다...',
  },
];

export default async function TermsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 상단: 제목 + 약관 본문 */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-header-s-b text-foreground">서비스 이용 약관</h2>
          <p className="text-body-m text-muted-foreground">
            원활한 서비스 이용을 위해 약관에 동의해 주세요.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="bg-card rounded-card flex flex-col gap-6 px-4.5 py-6">
            {TERMS_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="text-body-m-b text-foreground">{section.title}</h3>
                <p className="text-caption-m text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>

          <button type="button" className="text-caption-b text-muted-foreground mt-3 mb-2">
            전문 보기
          </button>
        </div>
      </div>

      {/* 하단: 체크박스 + CTA (mt-auto로 바닥 정렬) */}
      <div className="mt-auto">
        <TermsForm token={token} />
      </div>
    </div>
  );
}
