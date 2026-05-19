import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-5">
      <Link
        href="/verify/test-token-123"
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb inline-flex w-full max-w-[480px] items-center justify-center px-5 py-3.5"
      >
        시작하기
      </Link>
    </main>
  );
}
