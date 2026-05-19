import type { OcrResult } from '@trana/api';
import { create } from 'zustand';

type KycStore = {
  requestId: string | null;
  ocr: OcrResult | null;

  setOcr: (result: OcrResult) => void;
  reset: () => void;
};

export const useKycStore = create<KycStore>((set) => ({
  requestId: null,
  ocr: null,

  setOcr: (result) => set({ requestId: result.requestId, ocr: result }),
  reset: () => set({ requestId: null, ocr: null }),
}));
