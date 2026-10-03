export type SoundType = 'mechanical' | 'soft' | 'modern' | 'off';

export class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private soundType: SoundType = 'mechanical';
  private volume: number = 0.5;

  constructor(soundType: SoundType = 'mechanical', volume: number = 0.5) {
    this.soundType = soundType;
    this.volume = volume;
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundType(type: SoundType): void {
    this.soundType = type;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public playKeyClick(): void {
    if (this.soundType === 'off') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.3, now);
    masterGain.connect(ctx.destination);

    if (this.soundType === 'mechanical') {
      // Tactile click with noise and short tone
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      clickGain.gain.setValueAtTime(1, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(clickGain);
      clickGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.04);

      // Add slight snap
      const snap = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snap.type = 'square';
      snap.frequency.setValueAtTime(1800, now);
      snapGain.gain.setValueAtTime(0.3, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      snap.connect(snapGain);
      snapGain.connect(masterGain);
      snap.start(now);
      snap.stop(now + 0.02);

    } else if (this.soundType === 'soft') {
      // Gentle soft droplet / bubble
      const osc = ctx.createOscillator();
      const softGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.04);

      softGain.gain.setValueAtTime(0.6, now);
      softGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(softGain);
      softGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.045);

    } else if (this.soundType === 'modern') {
      // Crisp subtle modern digital tap
      const osc = ctx.createOscillator();
      const tapGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.025);

      tapGain.gain.setValueAtTime(0.4, now);
      tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(tapGain);
      tapGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  }

  public playErrorSound(): void {
    if (this.soundType === 'off') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

    gain.gain.setValueAtTime(this.volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  public playSuccessChime(): void {
    if (this.soundType === 'off') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.volume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  public playVictoryFanfare(): void {
    if (this.soundType === 'off') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    let delay = 0;
    notes.forEach((note) => {
      const now = ctx.currentTime + delay;
      delay += note.d;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);

      gain.gain.setValueAtTime(this.volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + note.d * 1.6);
    });
  }
}

export const soundManager = new SoundSynthesizer('mechanical', 0.5);
