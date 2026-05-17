import { Button } from '@trana/ui/components/button';

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-foreground text-3xl font-bold">Trana Guardian</h1>
      <p className="text-muted-foreground">보호자 인증 페이지</p>
      <Button>시작하기</Button>
      <Button variant="outline">취소</Button>
    </main>
  );
}
