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
    this.load.image('redhat', 'images/redhat.png');
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
