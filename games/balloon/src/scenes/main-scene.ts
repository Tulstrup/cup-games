import { CONST } from '../const/const';
import { Balloon } from '../objects/balloon';

export class MainScene extends Phaser.Scene {

  private balloons: Balloon[];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('redhat', 'images/redhat.png');
  }

  create(): void {
    this.spawnBalloons();
  }

  spawnBalloons(): void {
    this.balloons = [];
    
    const maximumXPosition = this.sys.canvas.width - CONST.BALLOON_MIN_X_POSITION * 2

    for (let i = 0; i < CONST.BALLOON_COUNT; i++) {
      this.balloons.push(
        new Balloon({
          scene: this,
          x: this.getRandomSpawnPostion(CONST.BALLOON_MIN_X_POSITION, maximumXPosition),
          y: this.getRandomSpawnPostion(CONST.BALLOON_MIN_Y_POSITION, CONST.BALLOON_MAX_Y_POSITION),
          texture: 'redhat'
        })
      );

      this.add.existing(this.balloons[i]);
    }
  }

  private getRandomSpawnPostion(min: number, max: number): number {
    return Phaser.Math.RND.between(min, max);
  }
}
