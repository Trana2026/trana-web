import Link from 'next/link';

export default async function PersonalInfoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">정보 확인</h2>
        <p className="text-body-m text-muted-foreground">스캔된 신분증 정보를 확인해 주세요.</p>
      </div>

      {/* 성공 배너 */}
      <div className="bg-brand-soft rounded-button mt-3 flex items-center gap-3 p-4.5">
        <span className="bg-brand-soft grid h-6 w-6 shrink-0 place-items-center rounded-full">
          <span className="bg-primary h-3 w-3 rounded-full" />
        </span>
        <p className="text-caption-m text-primary flex-1">
          신분증 인식이 완료되었습니다. 아래 정보가 정확한지 확인해 주세요.
        </p>
      </div>

      {/* 입력 필드 */}
      <div className="mt-[22px] flex flex-col gap-2">
        <Field id="name" label="이름" defaultValue="홍길동" />
        <Field id="birth" label="생년월일" defaultValue="1990-01-01" />
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto flex flex-col gap-2.5">
        <Link
          href={`/verify/${token}/id-capture`}
          className="bg-card text-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          다시 촬영하기
        </Link>
        <Link
          href={`/verify/${token}/face-capture`}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full items-center justify-center px-5 py-3.5"
        >
          정보 확인 완료
        </Link>
      </div>
    </div>
  );
}

function Field({ id, label, defaultValue }: { id: string; label: string; defaultValue: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-body-m pl-1.5 text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        type="text"
        defaultValue={defaultValue}
        className="bg-card rounded-button text-body-m text-foreground h-[53px] w-full px-3.5 outline-none"
      />
    </div>
  );
}
