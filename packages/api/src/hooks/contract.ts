import { useMutation } from '@tanstack/react-query';
import { contract } from '@trana/api/endpoints/contract';

export function useApproveContractGuardianConsent() {
  return useMutation({
    mutationFn: contract.approveGuardianConsent,
  });
}
