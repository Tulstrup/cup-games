interface BalloonParameters {
	scene: Phaser.Scene;
	x: number;
	y: number;
	texture: string | Phaser.Textures.Texture;
	frame?: string | number;
}

export class Balloon extends Phaser.Physics.Arcade.Sprite {
	body: Phaser.Physics.Arcade.Body;

	constructor(params: BalloonParameters) {
		super(params.scene, params.x, params.y, params.texture);

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.setScale(0.5);
		this.body.setSize(this.width * 0.5, this.height * 0.5);
	}
}
