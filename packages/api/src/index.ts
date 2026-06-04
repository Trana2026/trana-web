import { contract } from '@trana/api/endpoints/contract';

import { guardian } from './endpoints/guardian';
import { terms } from './endpoints/terms';

export const api = {
  terms,
  guardian,
  contract,
} as const;

// 타입 / 에러 re-export
export type {
  ApproveContractGuardianConsentRequest,
  ContractGuardianConsentApprovedResponse,
} from './endpoints/contract';
export type {
  FaceCompareResponse,
  Gender,
  IdType,
  OcrResult,
  VerifyIdCardResponse,
} from './endpoints/guardian';
export type {
  AgeGroup,
  AgreeConsentRequest,
  ConsentBatchResponse,
  ConsentContextType,
  TermsItem,
  TermsType,
} from './endpoints/terms';
export { ApiError, type ErrorHint, type ProblemDetail } from './types';

// Hooks
export { useApproveContractGuardianConsent } from './hooks/contract';
export {
  useGuardianCompare,
  useGuardianIdCardImage,
  useGuardianOcr,
  useGuardianVerify,
} from './hooks/guardian';
export { termsKeys, useAgreeConsent, useTermsList } from './hooks/terms';

// Provider
export { ApiProvider } from './provider';
