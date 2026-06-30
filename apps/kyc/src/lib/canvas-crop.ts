/**
 * Video 의 raw frame 을 center crop 하여 지정 비율의 JPEG File 로 반환.
 * CSS object-cover 와 동일한 수학으로 가시 영역만 추출.
 *
 * - 다운스케일 없음: 카메라 원본 해상도 그대로 crop
 * - NCP 권장 1024px 이상 유지 (1920×1080 기준 ≈1707×1080)
 */
export async function cropVideoToAspect(
  video: HTMLVideoElement,
  aspectRatio: number,
  filename: string,
  quality = 0.9,
): Promise<File> {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) throw new Error('video not ready');

  let sx: number;
  let sy: number;
  let sw: number;
  let sh: number;

  if (vw / vh > aspectRatio) {
    // 카메라가 box 보다 가로로 넓음 → 좌우 잘라냄
    sh = vh;
    sw = vh * aspectRatio;
    sx = (vw - sw) / 2;
    sy = 0;
  } else {
    // 카메라가 box 보다 세로로 김 → 위아래 잘라냄
    sw = vw;
    sh = vw / aspectRatio;
    sx = 0;
    sy = (vh - sh) / 2;
  }

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d context unavailable');
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('canvas toBlob failed'));
          return;
        }
        resolve(new File([blob], filename, { type: 'image/jpeg' }));
      },
      'image/jpeg',
      quality,
    );
  });
}
