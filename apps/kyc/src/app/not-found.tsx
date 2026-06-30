export default function NotFound() {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <h1 className="text-header-l text-foreground">잘못된 접근입니다</h1>
      <p className="text-body-m text-muted-foreground mt-3">
        본인 인증은 자녀에게 받은 SMS 링크로만 시작할 수 있어요.
        <br />새 링크가 필요하다면 자녀에게 요청해 주세요.
      </p>
    </main>
  );
}
