import { Dart } from './dart';

interface SlingshotParameters {
	scene: Phaser.Scene;
	position: Phaser.Math.Vector2;
	frame?: string | number;
}

export class Slingshot extends Phaser.GameObjects.Image {
	private projectiles: Dart[] = [];
	private _spawnPoint: Phaser.Math.Vector2;

	constructor(params: SlingshotParameters) {
		super(params.scene, params.position.x, params.position.y, 'slingshot');

		this._spawnPoint = params.position;

		this.scene.add.existing(this);

		this.setInteractive({ draggable: true })
			.on('drag', this.drag)
			.on('dragend', this.dragEnd);
	}

	drag(pointer: PointerEvent, dragX: number, dragY: number) {
		this.setPosition(dragX, dragY);
	}

	dragEnd(pointer: PointerEvent, dragX: number, dragY: number) {
		const endPosition = new Phaser.Math.Vector2(this.x, this.y);
		this.setPosition(this._spawnPoint.x, this._spawnPoint.y);

		const dart = new Dart({
			scene: this.scene,
			position: endPosition,
			direction: this._spawnPoint
				.clone()
				.subtract(endPosition)
				.normalize(),
			minSpeed: 1,
			maxSpeed: 2.5,
			deAccleration: 0.95
		});

		this.projectiles.push(dart);
		this.scene.add.existing(dart);
	}

	update(deltaTime: number) {
		this.projectiles.forEach((projectile) => projectile.update(deltaTime));
	}
}
