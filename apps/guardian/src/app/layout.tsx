import '@trana/ui/globals.css';

import { ApiProvider } from '@trana/api';
import type { Metadata, Viewport } from 'next';

import { ExternalBrowserGate } from '@/components/external-browser-gate';

export const metadata: Metadata = {
  title: 'TRANA 보호자 인증',
  description: '미성년자 자녀의 트라나 서비스 이용을 위한 보호자 인증',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffffff', // PWA chrome 색
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ApiProvider>
          <ExternalBrowserGate>{children}</ExternalBrowserGate>
        </ApiProvider>
      </body>
    </html>
  );
}
