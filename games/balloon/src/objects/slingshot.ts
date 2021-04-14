interface SlingshotParams {
    scene: Phaser.Scene
    x: number
    y: number
    texture: string | Phaser.Textures.Texture
    frame?: string | number
}

class Slingshot extends Phaser.GameObjects.Image {
    constructor(params: SlingshotParams) {
        super(params.scene,params.x, params.y, params.texture)
    }
}