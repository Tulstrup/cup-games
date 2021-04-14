import { DART_SETTINGS } from '../const/const';
export interface DartParameters {
	scene: Phaser.Scene;
	position: Phaser.Math.Vector2;
	direction: Phaser.Math.Vector2;
}

export interface DartSettings {
	minSpeed: number;
	maxSpeed: number;
	deAccleration: number;
}

export class Dart extends Phaser.Physics.Arcade.Sprite {
	private _currentSpeed: number;
	parameters: DartParameters;

	constructor(parameters: DartParameters) {
		super(
			parameters.scene,
			parameters.position.x,
			parameters.position.y,
			'dart'
		);

		this.displayWidth = 140;
		this.displayHeight = 140;
		this._currentSpeed = DART_SETTINGS.maxSpeed;

		this.setAngle(
			parameters.direction.angle() * Phaser.Math.RAD_TO_DEG + 220
		);

		this.parameters = parameters;

		this.setPosition(
			this.parameters.position.x,
			this.parameters.position.y
		);

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
	}

	update(elapsed: number, deltaTime: number) {
		this._currentSpeed *= DART_SETTINGS.deAccleration;
		this._currentSpeed = Phaser.Math.Clamp(
			this._currentSpeed,
			DART_SETTINGS.minSpeed,
			DART_SETTINGS.maxSpeed
		);

		const direction = this.parameters.direction;

		this.setVelocity(
			direction.x * this._currentSpeed * deltaTime,
			direction.y * this._currentSpeed * deltaTime
		);
	}
}
