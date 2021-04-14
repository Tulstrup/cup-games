import Sprite = Phaser.GameObjects.Sprite;
import INT = Phaser.Renderer.WebGL.INT;
import EventEmitter = Phaser.Events.EventEmitter;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
    this.load.image('background', 'images/beach.png');
    this.load.image('button', 'images/button.png');
    this.load.image('frame', 'images/frame.png');
    this.load.image('gameImage', 'images/sun.png');
    this.load.spritesheet('diamonds', 'images/sun.png', { frameWidth: 166, frameHeight: 166 });
  }

  create(): void {    
    const background = this.add.image(200, 350, 'background');
    background.setScale(0.35);

    const gameImage = this.add.image(220, 300, 'gameImage');
    gameImage.setScale(0.80)
    gameImage.rotation = -0.05;

    const frame = this.add.image(220, 300, 'frame');
    frame.setScale(0.80)
    frame.rotation = -0.05

    const congratulations = this.add.text(20, 60, 'Hooooray! Well done!', { font: '40px PayType-Bd', color: '#504678' });
    
    congratulations.rotation = -0.10;
    
    this.createButton("Done", this.onCompleteClick);    
  }
  
  createButton(label: string, action: Function): void {
    const button = this.add.image(220, 600, 'button');
    button.setInteractive();
    button.on('pointerdown', this.onCompleteClick);    
    button.setScale(0.40)
    this.add.text(160, 570, label, { font: '40px PayType-Rg', color: '#504678' });
  }

  onCompleteClick(): void {
    alert("Call the app Android.onComplete('cancelled/completed')")
  }
}