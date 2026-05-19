import { request } from '../client';

export type IdType = 'ID_CARD' | 'DRIVER_LICENSE' | 'PASSPORT' | 'ALIEN_REGISTRATION';
export type Gender = 'MALE' | 'FEMALE';

export type OcrResult = {
  requestId: string;
  idType: IdType;
  name: string;
  birthDate: string;
  gender: Gender;
};

export type VerifyIdCardResponse = {
  requestId: string;
  verified: boolean;
};

export type FaceCompareResponse = {
  subjectUserId: number;
  guardianId: number;
  verified: boolean;
};

export const guardian = {
  /** Step 1 — 신분증 OCR */
  ocr: (params: { token: string; file: File }): Promise<OcrResult> => {
    const formData = new FormData();
    formData.append('file', params.file);
    return request<OcrResult>('/v1/identity/guardian/id-card', {
      method: 'POST',
      query: { token: params.token },
      body: formData,
    });
  },

  /** Step 2 — 진위확인 */
  verify: (params: { requestId: string; token: string }): Promise<VerifyIdCardResponse> =>
    request<VerifyIdCardResponse>('/v1/identity/guardian/verify-id-card', {
      method: 'POST',
      body: params,
    }),

  /** Step 3 — 셀카 비교 + 가입 확정 */
  compare: (params: {
    token: string;
    requestId: string;
    file: File;
  }): Promise<FaceCompareResponse> => {
    const formData = new FormData();
    formData.append('file', params.file);
    return request<FaceCompareResponse>('/v1/identity/guardian/face-compare', {
      method: 'POST',
      query: { token: params.token, requestId: params.requestId },
      body: formData,
    });
  },
};
