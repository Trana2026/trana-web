import Image from 'next/image';
import Link from 'next/link';

import { DecorDots } from '@/components/hero/decor-dots';
import { ACCENT_TILE_CENTER, CONTENT_LIFT, FIGMA_CENTER_X } from '@/components/hero/isometric-grid';

export default async function HeroPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const BOX_SIZE = 160;
  const BOX_LIFT = 50;
  // 시안 의도: 박스 가운데가 5010 변환 후 가운데에서 (-14.1, -16.43) 위쪽 왼쪽
  const BOX_X = ACCENT_TILE_CENTER.x - BOX_SIZE / 2;
  const BOX_Y = ACCENT_TILE_CENTER.y - BOX_SIZE / 2 - BOX_LIFT;

  return (
    <>
      {/*/!* 데코 점 — layout inner wrapper 기준 absolute *!/*/}
      <DecorDots />
      {/*/!* 박스 영역 *!/*/}
      <Image
        src="/logo-box.svg"
        alt=""
        width={BOX_SIZE}
        height={BOX_SIZE}
        priority
        className="absolute"
        style={{
          left: `calc(50% + ${BOX_X - FIGMA_CENTER_X}px)`,
          top: BOX_Y,
        }}
      />
      {/* 텍스트 영역 */}
      {/* Heading */}
      <h1
        className="text-header-l text-foreground absolute"
        style={{
          left: `calc(50% + ${20 - FIGMA_CENTER_X}px)`,
          top: 482 - CONTENT_LIFT,
          width: 254,
        }}
      >
        가장 안전한 중고 거래,
        <br />
        <span className="text-primary">트라나</span>에서 시작하세요!
      </h1>

      {/* Body */}
      <p
        className="text-body-m text-muted-foreground absolute"
        style={{
          left: `calc(50% + ${20 - FIGMA_CENTER_X}px)`,
          top: 562 - CONTENT_LIFT,
          width: 251,
        }}
      >
        거래 조건을 명확히 기록하고, 본인 인증을 통해 <br />
        법적 효력이 있는 계약을 체결하세요
      </p>
      {/* CTA */}
      <Link
        href={`/verify/${token}/intro`}
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb absolute flex h-[52px] w-[335px] -translate-x-1/2 items-center justify-center"
        style={{
          left: '50%',
          bottom: 58,
        }}
      >
        본인 인증하여 시작하기
      </Link>

      {/* 보조 링크 */}
      <div
        className="text-caption-b text-muted-foreground absolute -translate-x-1/2"
        style={{
          left: '50%',
          bottom: 28,
        }}
      >
        이미 계정이 있으신가요?
      </div>
    </>
  );
}
