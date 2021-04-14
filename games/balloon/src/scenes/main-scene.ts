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

  spawnBalloons(): void {
    this.balloons = [];
    
    const maximumXPosition = this.sys.canvas.width - CONST.BALLOON.MIN_X_POSITION * 2

    for (let i = 0; i < CONST.BALLOON.TOTAL; i++) {
      this.balloons.push(
        new Balloon({
          scene: this,
          x: this.getRandomSpawnPostion(1, CONST.BALLOON.TOTAL) * 140,
          y: this.getRandomSpawnPostion(CONST.BALLOON.MIN_Y_POSITION, CONST.BALLOON.MAX_Y_POSITION),
          texture: 'balloon'
        })
      );
    }
  }

  // balloons shouldn't overlap
  private getRandomSpawnPostion(min: number, max: number): number {
    return Phaser.Math.RND.between(min, max);
    //return Phaser.Math.RND.between(1, CONST.BALLOON_COUNT) * 140;
    //x, y + 140 x 140
  }

  // private getRandomPosition(): Phaser.Math.Vector2 {
  //   const position = Phaser.Math.RND.between(1, CONST.BALLOON_COUNT);
  //   position+140
  // }
}
