interface BalloonParameters {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }

export class Balloon extends Phaser.GameObjects.Sprite {

    body: Phaser.Physics.Arcade.Body;

    constructor(params: BalloonParameters) {
        super(params.scene, params.x, params.y, params.texture)

        this.setScale(0.5);
    }
}