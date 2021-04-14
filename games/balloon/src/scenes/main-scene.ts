import { Redhat } from '../objects/redhat';

export class MainScene extends Phaser.Scene {
  private myRedhat: Redhat;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('redhat', 'images/redhat.png');
    this.load.image('redParticle', 'images/red.png');
  }

  create(): void {
  }
}
