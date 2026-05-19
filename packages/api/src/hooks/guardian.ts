import { useMutation } from '@tanstack/react-query';
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
