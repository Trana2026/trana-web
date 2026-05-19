import Image from 'next/image';
import Link from 'next/link';

export default async function HeroPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <div className="bg-background relative min-h-dvh overflow-hidden">
      <BackgroundGlow />

      <div className="relative mx-auto h-[812px] w-[375px]">
        {/* 데코 점 */}
        <DecorDots />

        {/* 박스 이미지 */}
        <Image
          src="/logo-box.png"
          alt=""
          width={128}
          height={128}
          priority
          className="absolute"
          style={{ left: 'calc(50% - 64px)', top: 217 }}
        />

        {/* Heading */}
        <h1
          className="text-header-l text-foreground absolute"
          style={{ left: 20, top: 482, width: 254 }}
        >
          가장 안전한 중고 거래,
          <br />
          <span className="text-primary">트라나</span>에서 시작하세요!
        </h1>

        {/* Body */}
        <p
          className="text-body-m text-muted-foreground absolute"
          style={{ left: 20, top: 562, width: 251 }}
        >
          거래 조건을 명확히 기록하고, 본인 인증을 통해 법적 효력이 있는 계약을 체결하세요
        </p>

        {/* CTA */}
        <Link
          href={`/verify/${token}/intro`}
          className="bg-primary text-primary-foreground rounded-button text-body-l-sb absolute inline-flex h-[52px] w-[335px] -translate-x-1/2 items-center justify-center"
          style={{ left: '50%', top: 721 }}
        >
          대리인 인증하기
        </Link>
      </div>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ellipse 2 — 우상단 brand 글로우 */}
      <div
        className="absolute h-[532px] w-[532px] rounded-full blur-[100px]"
        style={{ left: 109, top: -16, background: '#40C572', opacity: 0.15 }}
      />
      {/* Ellipse 1 — 좌하단 네온 글로우 */}
      <div
        className="absolute h-[532px] w-[532px] rounded-full blur-[100px]"
        style={{ left: -246, top: 222, background: '#3AFF90', opacity: 0.15 }}
      />
    </div>
  );
}

function DecorDots() {
  const dotStyle = {
    background: 'linear-gradient(180deg, #9CCFC0 0%, #449787 100%)',
    boxShadow: '0px 0px 8px rgba(206, 236, 234, 0.25), inset 1px 2px 4px rgba(206, 236, 234, 0.6)',
  } as const;

  return (
    <>
      {/* 큰 16px — Ellipse 8 */}
      <div className="absolute h-4 w-4 rounded-full" style={{ ...dotStyle, left: 74, top: 304 }} />
      {/* 중간 8px — Ellipse 10 */}
      <div
        className="absolute h-2 w-2 rounded-full"
        style={{ ...dotStyle, left: 105, top: 238, opacity: 0.8 }}
      />
      {/* 작은 4px — Ellipse 9 */}
      <div className="absolute h-1 w-1 rounded-full" style={{ ...dotStyle, left: 298, top: 256 }} />
    </>
  );
}
