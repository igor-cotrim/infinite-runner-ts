interface AudioContextWindow extends Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

declare const window: AudioContextWindow;

class AudioManager {
  ctx: AudioContext;
  analyser: AnalyserNode;
  data: Uint8Array;
  initialized = false;

  constructor() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      throw new Error("AudioContext is not supported in this browser");
    }

    this.ctx = new AudioContextClass();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.8;
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
  }

  async initialize() {
    try {
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });
      const source = this.ctx.createMediaStreamSource(stream);

      source.connect(this.analyser);
      this.initialized = true;
    } catch (error) {
      console.error("Microphone setup failed", error);
    }
  }

  getJumpHeight() {
    if (!this.initialized) return 0;

    this.analyser.getByteFrequencyData(this.data);

    const volume =
      Math.min(
        this.data.reduce((a, b) => a + b, 0) / (this.data.length * 128)
      ) * 5;
    const baseJumpHeight = -15;
    const volumeMultiplier = 10;

    return volume < 0.2 ? 0 : baseJumpHeight - volume * volumeMultiplier;
  }
}

export default AudioManager;
