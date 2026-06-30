import { IdCaptureForm } from '@/components/verify/id-capture-form';

export default async function IdCapturePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">신분증 촬영</h2>
        <p className="text-body-m text-muted-foreground">
          신원 확인을 위해 신분증 촬영이 필요해요.
        </p>
      </div>

      <IdCaptureForm token={token} />
    </div>
  );
}
