import { PersonalInfoForm } from '@/components/verify/personal-info-form';

export default async function PersonalInfoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">정보 확인</h2>
        <p className="text-body-m text-muted-foreground">스캔된 신분증 정보를 확인해 주세요.</p>
      </div>

      <div className="bg-brand-soft rounded-button mt-3 flex items-center gap-3 p-4.5">
        <span className="bg-brand-soft grid h-6 w-6 shrink-0 place-items-center rounded-full">
          <span className="bg-primary h-3 w-3 rounded-full" />
        </span>
        <p className="text-caption-m text-primary flex-1">
          신분증 인식이 완료되었습니다. 아래 정보가 정확한지 확인해 주세요.
        </p>
      </div>

      <PersonalInfoForm token={token} />
    </div>
  );
}
