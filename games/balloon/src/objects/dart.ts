export interface DartParameters {
	scene: Phaser.Scene;
	position: Phaser.Math.Vector2;
	direction: Phaser.Math.Vector2;
	minSpeed: number;
	maxSpeed: number;
	deAccleration: number;
}

export class Dart extends Phaser.GameObjects.Sprite {
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
		this._currentSpeed = parameters.maxSpeed;

		this.setAngle(
			parameters.direction.angle() * Phaser.Math.RAD_TO_DEG + 220
		);

		this.parameters = parameters;

		this.setPosition(
			this.parameters.position.x,
			this.parameters.position.y
		);
	}

	update(deltaTime: number) {
		this._currentSpeed *= this.parameters.deAccleration;
		this._currentSpeed = Phaser.Math.Clamp(
			this._currentSpeed,
			this.parameters.minSpeed,
			this.parameters.maxSpeed
		);

		const direction = this.parameters.direction;

		const newPositionX =
			this.x + direction.x * this._currentSpeed * deltaTime;
		const newPositionY =
			this.y + direction.y * this._currentSpeed * deltaTime;

		this.setPosition(newPositionX, newPositionY);
	}
}
