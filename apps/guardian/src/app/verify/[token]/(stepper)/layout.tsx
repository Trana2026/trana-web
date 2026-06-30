import Script from 'next/script';

import { AppHeader } from '@/components/header';

export default function ConsentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col pt-[60px] pb-10">
        <AppHeader />
        <main className="mt-6 flex flex-1 flex-col px-5">{children}</main>
      </div>
      <Script src={process.env.NEXT_PUBLIC_MOBILE_OK_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}
