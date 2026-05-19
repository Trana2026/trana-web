import '@trana/ui/globals.css';

import { ApiProvider } from '@trana/api';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'TRANA 보호자 인증',
  description: '미성년자 자녀의 트라나 서비스 이용을 위한 보호자 인증',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ApiProvider>{children}</ApiProvider>
      </body>
    </html>
  );
}
