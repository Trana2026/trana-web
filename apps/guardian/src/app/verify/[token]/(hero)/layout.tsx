import { BackgroundGlow } from '@/components/hero/background-glow';
import { GridMask } from '@/components/hero/grid-mask';
import { IsometricGrid } from '@/components/hero/isometric-grid';

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background relative overflow-hidden">
      <BackgroundGlow />
      <IsometricGrid />
      <GridMask />
      <div
        className="relative mx-auto flex max-w-[480px] flex-col"
        style={{
          minHeight: 'max(100dvh, 762px)',
          paddingTop: 'var(--safe-area-inset-top)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
