'use client';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
};

export function LoadingModal({
  open,
  title = '로딩 중이에요',
  description = '잠시만 기다려주세요',
}: Props) {
  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(34,34,34,0.8)] backdrop-blur-[4px]"
    >
      <div className="bg-card rounded-3xl p-5">
        <div className="flex w-[300px] flex-col items-center gap-3">
          <div className="flex w-full flex-col items-center gap-1 text-center">
            <h2 className="text-body-l-b text-foreground">{title}</h2>
            <p className="text-body-m text-muted-foreground">{description}</p>
          </div>
          <div className="grid size-[60px] place-items-center">
            <div className="border-primary size-10 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
