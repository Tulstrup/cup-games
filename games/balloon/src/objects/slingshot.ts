import { Dart } from './dart';
import { Gameworld } from '../interfaces/gameworld.interface';
import { CONST } from '../const/const';

interface SlingshotParameters {
	scene: Phaser.Scene;
	gameworld: Gameworld;
	position: Phaser.Math.Vector2;
	frame?: string | number;
}

export class Slingshot extends Phaser.GameObjects.Image {
	private _gameworld: Gameworld;
	private _params: SlingshotParameters;
	private _projectiles: Dart[] = [];
	private _spawnPoint: Phaser.Math.Vector2;

	constructor(params: SlingshotParameters) {
		super(params.scene, params.position.x, params.position.y, 'hand');

		this._gameworld = params.gameworld;
		this._params = params;
		this._spawnPoint = params.position;

		this.scene.add.existing(this);

		this.setScale(CONST.SLINGSHOT.SCALE, CONST.SLINGSHOT.SCALE);

		this.setInteractive({ draggable: true })
			.on('drag', this.drag)
			.on('dragend', this.dragEnd);
	}

	drag(pointer: PointerEvent, dragX: number, dragY: number) {
		this.setPosition(dragX, dragY);

		const endPosition = new Phaser.Math.Vector2(dragX, dragY);
		let dir = this._spawnPoint.clone().subtract(endPosition).normalize();
		this.setAngle(dir.angle() * Phaser.Math.RAD_TO_DEG + 90);
	}

	dragEnd(pointer: PointerEvent, dragX: number, dragY: number) {
		const endPosition = new Phaser.Math.Vector2(this.x, this.y);
		this.setPosition(this._spawnPoint.x, this._spawnPoint.y);

		this._gameworld.spawnDart(
			endPosition,
			this._spawnPoint.clone().subtract(endPosition).normalize()
		);
	}
}
