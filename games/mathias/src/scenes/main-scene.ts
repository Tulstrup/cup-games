export class MainScene extends Phaser.Scene {
  private darts: Dart[];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {

  }

  create(): void {
    const particles = this.add.particles('redParticle');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD'
    });

  }
}
