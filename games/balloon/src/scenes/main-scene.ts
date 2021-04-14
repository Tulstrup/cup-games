import { CONST } from '../const/const';
import { Balloon } from '../objects/balloon';
import { Slingshot } from '../objects/slingshot';
import { Gameworld } from '../interfaces/gameworld.interface';
import { Dart } from '../objects/dart';

export class MainScene extends Phaser.Scene implements Gameworld {
	slingshot: Slingshot;

	dartGroup: Phaser.GameObjects.Group;
	balloonGroup: Phaser.GameObjects.Group;

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
			gameworld: this,
			position: new Phaser.Math.Vector2(
				this.scale.width * CONST.SLINGSHOT_POSITION_PERCENTAGE.x,
				this.scale.height * CONST.SLINGSHOT_POSITION_PERCENTAGE.y
			)
		});

		this.dartGroup = this.add.group({
			runChildUpdate: true
		});

		this.balloonGroup = this.add.group({
			runChildUpdate: true
		});

		this.spawnBalloons();
	}

	update(total: number, deltaTime: number): void {
		this.slingshot.update(deltaTime);

		this.physics.overlap(
			this.dartGroup,
			this.balloonGroup,
			(dart, balloon) => {
				this.dartGroup.remove(dart, true, true);
				this.balloonGroup.remove(balloon, true, true);
			}
		);
	}

	spawnDart(position: Phaser.Math.Vector2, direction: Phaser.Math.Vector2) {
		const newDart = new Dart({
			scene: this,
			position: position,
			direction: direction
		});

		this.dartGroup.add(newDart);
	}

	spawnBalloons(): void {
		for (let i = 0; i < CONST.BALLOON.TOTAL; i++) {
			const balloon = new Balloon({
				scene: this,
				x:
					this.getRandomSpawnPostion(1, CONST.BALLOON.TOTAL) *
					CONST.BALLOON.SIZE,
				y: this.getRandomSpawnPostion(
					CONST.BALLOON.MIN_Y_POSITION,
					CONST.BALLOON.MAX_Y_POSITION
				),
				texture: 'balloon'
			});

			this.balloonGroup.add(balloon);
		}
	}

	private getRandomSpawnPostion(min: number, max: number): number {
		return Phaser.Math.RND.between(min, max);
	}
}
