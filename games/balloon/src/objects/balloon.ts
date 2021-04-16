import { CONST } from '../const/const';

interface BalloonParameters {
	scene: Phaser.Scene;
	x: number;
	y: number;
	texture: string | Phaser.Textures.Texture;
	hasGift: boolean;
	direction: Phaser.Math.Vector2;
	frame?: string | number;
}

export class Balloon extends Phaser.GameObjects.Sprite {
	private velocity: Phaser.Math.Vector2;
	private radius: number;
	private hasGift: boolean;
	private params: BalloonParameters;
	private direction: Phaser.Math.Vector2;

	body: Phaser.Physics.Arcade.Body;

	constructor(params: BalloonParameters) {
		super(params.scene, params.x, params.y, params.texture);

		this.params = params;
		this.direction = params.direction;

		this.setScale(CONST.BALLOON.SCALE, CONST.BALLOON.SCALE);
		this.radius = 0;
		this.hasGift = params.hasGift;

		this.applyPhysics();

		this.scene.add.existing(this);
	}

	update(elapsed: number, deltaTime: number) {
		this.applyVelocity(elapsed);
		this.checkIfOffScreen();
	}

	popBalloon(): void {
		if (this.hasGift) {
			// play reward sound
			// pop (remove) the balloon
			// play reward animation
		} else {
			// play balloon pop sound
			// pop the balloon
		}
	}

	private applyPhysics(): void {
		this.scene.physics.world.enable(this);
		this.body.allowGravity = false;
		this.body.setSize(300, 300, true);
		this.body.setOffset(150, 20);

		let num =
			Math.floor(Math.random() * CONST.BALLOON.MAX_SPEED) +
			CONST.BALLOON.MIN_SPEED;

		num += (Math.floor(Math.random() * 10000) + 0) * 0.00005;

		console.log(num);

		this.velocity = new Phaser.Math.Vector2(num, 0);
	}

	private applyVelocity(elapsed: number): void {
		this.x += this.direction.x * this.velocity.x;
	}

	private checkIfOffScreen(): void {
		const width = this.displayWidth;
		const height = this.displayHeight;
		const maxX = this.scene.sys.canvas.width - width * 2;
		const maxY = this.scene.sys.canvas.height / 2;

		// horizontal check
		if (this.x < 0) {
			this.direction = Phaser.Math.Vector2.RIGHT;
		} else if (this.x > this.scene.scale.width) {
			this.direction = Phaser.Math.Vector2.LEFT;
		}
	}

	private getRandomVelocity(aMin: number, aMax: number): Phaser.Math.Vector2 {
		return new Phaser.Math.Vector2(
			Phaser.Math.RND.between(
				this.getRndNumber(aMin, aMax),
				this.getRndNumber(aMin, aMax)
			),
			Phaser.Math.RND.between(
				this.getRndNumber(aMin, aMax),
				this.getRndNumber(aMin, aMax)
			)
		);
	}

	private getRndNumber(aMin: number, aMax: number): number {
		let num = Math.floor(Math.random() * aMax) + aMin;
		num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
		return num;
	}
}
