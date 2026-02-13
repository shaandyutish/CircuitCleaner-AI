
export enum EnhancementMode {
  CLEAN_TRACES = 'CLEAN_TRACES',
  VECTORIZE = 'VECTORIZE',
  NOISE_REDUCTION = 'NOISE_REDUCTION',
  COLOR_CORRECTION = 'COLOR_CORRECTION',
  NEGATIVE = 'NEGATIVE'
}

export interface PCBState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
  mode: EnhancementMode;
}

export interface ProcessingResult {
  imageUrl: string;
  analysis?: string;
}
