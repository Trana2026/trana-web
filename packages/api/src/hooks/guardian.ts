import { useMutation, useQuery } from '@tanstack/react-query';
import { guardian } from '@trana/api/endpoints/guardian';

export function useGuardianOcr() {
  return useMutation({
    mutationFn: guardian.ocr,
  });
}

export function useGuardianVerify() {
  return useMutation({
    mutationFn: guardian.verify,
  });
}

export function useGuardianCompare() {
  return useMutation({
    mutationFn: guardian.compare,
  });
}

export function useGuardianIdCardImage(params: { requestId: string | null; token: string }) {
  return useQuery({
    queryKey: ['guardian', 'id-card-image', params.requestId, params.token],
    queryFn: () => {
      if (!params.requestId) throw new Error('requestId is required');
      return guardian.getIdCardImage({ requestId: params.requestId, token: params.token });
    },
    enabled: !!params.requestId && !!params.token,
    staleTime: Infinity, // 마스킹된 결과물이라 재요청 불필요
    gcTime: 5 * 60 * 1000, // 세션 TTL 10분 이내, 캐시 5분
    retry: false, // 410/404 에러 시 자동 재시도 막기 (사용자 액션 유도)
  });
}
