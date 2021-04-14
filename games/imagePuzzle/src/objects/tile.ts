import { IImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructor, imageScale: number) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.setScale(imageScale);
    this.scene.add.existing(this);
  }
}
