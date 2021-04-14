import Sprite = Phaser.GameObjects.Sprite;
import INT = Phaser.Renderer.WebGL.INT;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }
    
  preload(): void {
    this.load.image('background', 'images/beach.png');    
    this.load.image('gameImage', 'images/sun.png');
    this.load.spritesheet('diamonds', 'images/sun.png', { frameWidth: 166, frameHeight: 166 });
  }

  create(): void {    
    const background = this.add.image(200, 350, 'background');
    background.setScale(0.35);

    const gameImage = this.add.image(220, 300, 'gameImage');
    gameImage.setScale(0.80)
    


  }  
  
  onComplete(): void {
    alert("Call the app Android.onComplete('cancelled/completed')")
  }
}


/*

const mySprite = this.add.sprite(100,200,'diamonds')    
    mySprite.setFrame(0)
    const mySprite2 = this.add.sprite(270,200,'diamonds')
    mySprite2.setFrame(1)


*/