import Link from 'next/link';

export default async function DonePage({ params }: { params: Promise<{ token: string }> }) {
  await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">인증 완료!</h2>
        <p className="text-body-m text-muted-foreground">
          본인 인증이 완료되었어요! <br />
          이제 안전한 계약을 생성하러 갈까요?
        </p>
      </div>

      {/* 가운데 성공 아이콘 */}
      <div className="mt-[80px] flex w-full justify-center py-20">
        <SuccessIcon />
      </div>

      <div className="mt-auto pt-[194px]">
        <Link
          href="/"
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          홈으로 이동하기
        </Link>
      </div>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className="bg-brand-soft text-primary grid h-20 w-20 place-items-center rounded-full">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M12 24L20 32L36 16"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
