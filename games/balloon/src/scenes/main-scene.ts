import { Redhat } from '../objects/redhat';
import { Slingshot } from '../objects/slingshot';

export class MainScene extends Phaser.Scene {
	private slingshot: Slingshot;

	constructor() {
		super({ key: 'MainScene' });
	}

	preload(): void {
		this.load.image('dart', 'images/dart.png');
	}

	create(): void {
		this.slingshot = new Slingshot({
			scene: this,
			position: new Phaser.Math.Vector2(
				this.scale.width / 2,
				this.scale.height * 0.9
			)
		});
	}

	update(total: number, deltaTime: number): void {
		this.slingshot.update(deltaTime);
	}
}
