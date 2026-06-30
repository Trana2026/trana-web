import { AppHeader } from '@/components/header';

export default function ContractDonePage() {
  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col pt-[60px] pb-10">
        <AppHeader title="법정대리인 계약 동의" percent={100} hideBack={false} />
        <main className="mt-6 flex flex-1 flex-col gap-5 px-5">
          {/* Frame 124 — title block */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-header-s-b text-foreground">인증 완료!</h2>
            <p className="text-body-m text-muted-foreground">
              본인 인증이 완료되었어요!
              <br />
              이제 안전한 계약을 생성하러 갈까요?
            </p>
          </div>

          {/* Frame 942 — checkmark 중앙 */}
          <div className="flex flex-1 items-center justify-center">
            <SuccessIcon />
          </div>

          {/* CTA — Trana 홍보 사이트 */}
          <a
            href="https://trana.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
          >
            Trana 더 알아보기
          </a>
        </main>
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
