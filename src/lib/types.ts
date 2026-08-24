export type WaveConfig = {
  width: number;
  height: number;
  amplitude: number;
  cycles: number;
  phase: number;
  segments: number;
};

export type LiveWaveHandle = {
  destroy: () => void;
  setAudioLevel: (level: number) => void;
};
