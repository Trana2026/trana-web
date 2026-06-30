declare global {
  interface Window {
    MOBILEOK: {
      process: (
        urlOrJson: string,
        browserDevice: 'WB' | 'MB' | 'MWV' | 'HY' | 'NA',
        callbackName: string,
      ) => void;
    };
    onMokResult?: (payload: string) => void;
  }
}

export {};
