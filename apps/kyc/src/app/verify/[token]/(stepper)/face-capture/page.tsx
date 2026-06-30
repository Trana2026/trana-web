import { FaceCaptureForm } from '@/components/verify/face-capture-form';

export default async function FaceCapturePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-header-s-b text-foreground">실물 인증</h2>
        <p className="text-body-m text-muted-foreground">
          본인 여부를 확인합니다. 화면을 응시해 주세요.
        </p>
      </div>

      <FaceCaptureForm token={token} />
    </div>
  );
}
