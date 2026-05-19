import Link from 'next/link';

export default async function IdCapturePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">신분증 촬영</h2>
        <p className="text-body-m text-muted-foreground">
          신원 확인을 위해 신분증 촬영이 필요해요.
        </p>
      </div>

      {/* 가운데 영역 — 카메라 자리 + 팁 */}
      <div className="mt-[75px] flex flex-col items-center gap-5">
        <div className="bg-card border-primary flex aspect-[335/212] w-full items-center justify-center rounded-[20px] border">
          <span className="text-caption-b text-muted-foreground rounded-button bg-neutral-100 px-3 py-1">
            영역에 맞춰주세요
          </span>
        </div>

        <div className="bg-card rounded-card px-3 py-2.5">
          <span className="text-caption-m text-muted-foreground">
            빛 반사가 없는 밝은 곳에서 촬영해 주세요
          </span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <Link
        href={`/verify/${token}/personal-info`}
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb mt-auto inline-flex w-full items-center justify-center px-5 py-3.5"
      >
        촬영하기
      </Link>
    </div>
  );
}
