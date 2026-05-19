import { useMutation, useQuery } from '@tanstack/react-query';

import { terms } from '../endpoints/terms';

export const termsKeys = {
  all: ['terms'] as const,
  list: () => [...termsKeys.all, 'list'] as const,
};

export function useTermsList() {
  return useQuery({
    queryKey: termsKeys.list(),
    queryFn: terms.list,
    staleTime: 5 * 60 * 1000, // 5분 — 약관은 자주 안 바뀜
  });
}

export function useAgreeConsent() {
  return useMutation({
    mutationFn: terms.agree,
  });
}
