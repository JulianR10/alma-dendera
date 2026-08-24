export class AudioController {
  private audio: HTMLAudioElement;
  private button: HTMLButtonElement;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private raf = 0;
  private onLevel: ((level: number) => void) | null = null;
  private audioContext: AudioContext | null = null;

  constructor(audioId: string, buttonId: string) {
    const audioEl = document.getElementById(audioId);
    const btnEl = document.getElementById(buttonId);

    if (!(audioEl instanceof HTMLAudioElement)) {
      throw new Error(`Audio element #${audioId} not found`);
    }
    if (!(btnEl instanceof HTMLButtonElement)) {
      throw new Error(`Button #${buttonId} not found`);
    }

    this.audio = audioEl;
    this.button = btnEl;

    this.audio.loop = true;
    this.audio.volume = 0.55;
    this.audio.preload = 'auto';

    this.button.addEventListener('click', () => {
      void this.toggle();
    });

    this.audio.addEventListener('play', () => this.syncButton());
    this.audio.addEventListener('pause', () => this.syncButton());
    this.audio.addEventListener('ended', () => this.syncButton());

    this.syncButton();
  }

  onAudioLevel(callback: (level: number) => void): void {
    this.onLevel = callback;
  }

  private syncButton(): void {
    const isPlaying = !this.audio.paused && !this.audio.muted && this.audio.currentTime > 0;
    this.button.classList.toggle('is-playing', isPlaying);
    this.button.classList.toggle('is-muted', this.audio.paused || this.audio.muted);
    this.button.setAttribute('aria-pressed', String(isPlaying));
    this.button.setAttribute('aria-label', isPlaying ? 'Pausar sonido' : 'Reproducir sonido');
  }

  private ensureAnalyser(): void {
    if (this.analyser || this.onLevel === null) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      this.audioContext = new Ctx();
      const source = this.audioContext.createMediaElementSource(this.audio);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch {
      // analyser optional, ignore
    }
  }

  private loopAnalyser = (): void => {
    if (!this.analyser || !this.dataArray || !this.onLevel) return;
    if (this.audio.paused) {
      this.onLevel(0);
      return;
    }

    this.analyser.getByteFrequencyData(this.dataArray);
    // average low-mid frequencies (more musical)
    let sum = 0;
    const len = Math.min(48, this.dataArray.length);
    for (let i = 0; i < len; i += 1) {
      const v = this.dataArray[i];
      if (v !== undefined) sum += v;
    }
    const avg = sum / len / 255; // 0..1
    this.onLevel(avg);
    this.raf = window.requestAnimationFrame(this.loopAnalyser);
  };

  async toggle(): Promise<void> {
    try {
      if (this.audio.paused) {
        // resume context if suspended
        if (this.audioContext?.state === 'suspended') {
          await this.audioContext.resume();
        }
        this.ensureAnalyser();
        await this.audio.play();
        if (this.analyser) {
          window.cancelAnimationFrame(this.raf);
          this.raf = window.requestAnimationFrame(this.loopAnalyser);
        }
      } else {
        this.audio.pause();
        window.cancelAnimationFrame(this.raf);
        this.onLevel?.(0);
      }
    } catch {
      // autoplay blocked or not ready
      this.syncButton();
    }
    this.syncButton();
  }

  destroy(): void {
    window.cancelAnimationFrame(this.raf);
    this.button.replaceWith(this.button.cloneNode(true));
    if (this.audioContext?.state !== 'closed') {
      void this.audioContext?.close();
    }
  }
}
