import '@trana/ui/globals.css';

import { ApiProvider } from '@trana/api';
import { Toaster } from '@trana/ui/components/sonner';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';

import { ExternalBrowserGate } from '@/components/external-browser-gate';
import { ThemeToggle } from '@/components/theme-toggle';

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ExternalBrowserGate>{children}</ExternalBrowserGate>
            <ThemeToggle />
            <Toaster />
          </ThemeProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
