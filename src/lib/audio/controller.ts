export class AudioController {
  private audio: HTMLAudioElement;
  private button: HTMLButtonElement;

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

  private syncButton(): void {
    const isPlaying = !this.audio.paused && !this.audio.ended;
    this.button.classList.toggle('is-playing', isPlaying);
    this.button.classList.toggle('is-muted', !isPlaying);
    this.button.setAttribute('aria-pressed', String(isPlaying));
    this.button.setAttribute('aria-label', isPlaying ? 'Pausar sonido' : 'Reproducir sonido');
  }

  async toggle(): Promise<void> {
    try {
      if (this.audio.paused) {
        await this.audio.play();
      } else {
        this.audio.pause();
      }
    } catch {
      // autoplay bloqueado o recurso no listo
    } finally {
      this.syncButton();
    }
  }
}
