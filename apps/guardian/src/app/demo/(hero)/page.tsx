import Image from 'next/image';
import Link from 'next/link';

import { DecorDots } from '@/components/hero/decor-dots';
import { ACCENT_TILE_CENTER, CONTENT_LIFT, FIGMA_CENTER_X } from '@/components/hero/isometric-grid';

export default function HeroDemoPage() {
  const BOX_SIZE = 160;
  const BOX_LIFT = 50;
  const BOX_X = ACCENT_TILE_CENTER.x - BOX_SIZE / 2;
  const BOX_Y = ACCENT_TILE_CENTER.y - BOX_SIZE / 2 - BOX_LIFT;

  return (
    <>
      <DecorDots />
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
      <Link
        href="/demo/intro"
        className="bg-primary text-primary-foreground rounded-button text-body-l-sb absolute flex h-[52px] w-[335px] -translate-x-1/2 items-center justify-center"
        style={{
          left: '50%',
          bottom: 45,
        }}
      >
        대리인 인증하기
      </Link>
    </>
  );
}
