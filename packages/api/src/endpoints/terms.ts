import { request } from '../client';

export type TermsType = 'SERVICE' | 'PRIVACY' | 'MARKETING' | 'KYC' | (string & {});

export type TermsItem = {
  id: number;
  type: TermsType;
  version: string;
  title: string;
  contentUrl: string;
  effectiveAt: string;
};

export type ConsentContextType = 'SIGNUP' | 'GUARDIAN_CONSENT' | 'CONTRACT' | 'MARKETING' | 'KYC';

export type AgeGroup = 'ADULT' | 'MINOR';

export type AgreeConsentRequest = {
  termsVersionIds: number[];
  contextType: ConsentContextType;
  ageGroup: AgeGroup;
  guardianLinkToken?: string;
  signupSessionId?: string;
  contextId?: number;
};

export type ConsentBatchResponse = {
  signupSessionId: string | null;
  consents: Array<{
    id: number;
    termsVersionId: number;
    agreedAt: string;
  }>;
};

// 함수들을 객체로 묶어 export
export const terms = {
  /** Step 0a — 활성 약관 목록 조회 */
  list: (): Promise<TermsItem[]> => request<TermsItem[]>('/v1/terms'),

  /** Step 0b — 약관 동의 */
  agree: (body: AgreeConsentRequest): Promise<ConsentBatchResponse> =>
    request<ConsentBatchResponse>('/v1/consents', {
      method: 'POST',
      body,
    }),
};
