import { request } from '../client';

export type ApproveContractGuardianConsentRequest = {
  token: string;
};

export type ContractGuardianConsentApprovedResponse = {
  publicCode: string;
  guardianConsentAt: string; // ISO instant
};

export const contract = {
  /** 보호자 계약 동의 확정 (web 단순 동의, JWT 불필요) */
  approveGuardianConsent: (
    body: ApproveContractGuardianConsentRequest,
  ): Promise<ContractGuardianConsentApprovedResponse> =>
    request<ContractGuardianConsentApprovedResponse>('/v1/contracts/guardian-consent/approve', {
      method: 'POST',
      body,
    }),
};
