'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast, Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="bottom-center"
      offset={102}
      mobileOffset={{ bottom: '102px' }}
      icons={{
        success: <CircleCheckIcon className="size-6" />,
        info: <InfoIcon className="size-6" />,
        warning: <TriangleAlertIcon className="size-6" />,
        error: <ErrorIcon />,
        loading: <Loader2Icon className="size-6 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-full max-w-[335px] h-12 items-center gap-2 rounded-[16px] px-4 py-3 backdrop-blur-md',
          error: 'bg-error-soft text-error-500',
          title: 'text-body-m',
          icon: 'shrink-0',
        },
      }}
      {...props}
    />
  );
};

function ErrorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
        fill="#EF4444"
      />
      <path d="M14.5 9.5L9.5 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 14.5L9.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export { toast, Toaster };
