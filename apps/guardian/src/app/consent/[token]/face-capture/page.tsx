import Link from 'next/link';

export default async function FaceCapturePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">실물 인증</h2>
        <p className="text-body-m text-muted-foreground">
          본인 여부를 확인합니다. 화면을 응시해 주세요.
        </p>
      </div>

      {/* 원형 얼굴 viewport */}
      <div className="border-primary bg-card mx-auto mt-[73px] h-65 w-65 overflow-hidden rounded-full border-[7px] drop-shadow-xl" />

      {/* 지시 버블 */}
      <div className="bg-card rounded-button mx-auto mt-[22px] inline-flex w-fit items-center gap-2.5 px-6 py-3.5">
        <FaceDirectionIcon />
        <span className="text-body-l-sb text-foreground">고개를 왼쪽으로 돌려주세요</span>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto pt-[128px]">
        <Link
          href={`/consent/${token}/done`}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb mt-auto inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          인증 완료
        </Link>
      </div>
    </div>
  );
}

function FaceDirectionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* 코너 브래킷 (face detection frame) */}
      <path d="M3 8V3H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 16V21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 21H21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* 눈 */}
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />
      {/* 입 */}
      <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
