import { CONST } from '../const/const';
import { Balloon } from '../objects/balloon';
import { Slingshot } from '../objects/slingshot';

export class MainScene extends Phaser.Scene {

  private balloons: Balloon[];
  private slingshot: Slingshot;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('dart', 'images/dart.png');
    this.load.image('balloon', 'images/balloon.png');
  }

  create(): void {
    this.slingshot = new Slingshot({
      scene: this,
      position: new Phaser.Math.Vector2(
        this.scale.width / 2,
        this.scale.height * 0.9
      )
    });

    this.spawnBalloons();
  }

  update(total: number, deltaTime: number): void {
    this.slingshot.update(deltaTime);

    for (let i = 0; i < CONST.BALLOON.TOTAL; i++) {
      this.balloons[i].update();
    }
  }

  private spawnBalloons(): void {
    this.balloons = [];
    
    for (let i = 0; i < CONST.BALLOON.TOTAL; i++) {
      this.balloons.push(
        new Balloon({
          scene: this,
          x: this.getRandomSpawnPostion(1, CONST.BALLOON.TOTAL) * CONST.BALLOON.SIZE,
          y: this.getRandomSpawnPostion(CONST.BALLOON.MIN_Y_POSITION, CONST.BALLOON.MAX_Y_POSITION),
          texture: 'balloon'
        })
      );
    }
  }

  private getRandomSpawnPostion(min: number, max: number): number {
    return Phaser.Math.RND.between(min, max);
  }
}
