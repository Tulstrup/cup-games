import { Tile } from "../objects/tile";
import { PuzzleModel } from "../puzzle.model";
import Sprite = Phaser.GameObjects.Sprite;
import INT = Phaser.Renderer.WebGL.INT;
import EventEmitter = Phaser.Events.EventEmitter;

export class MainScene extends Phaser.Scene {
  private puzzle: PuzzleModel;
  private rows: number = 3;
  private cols: number = 3;
  private tileSize: number = 166;

  private tiles: Tile[];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('background', 'images/beach.png');
    this.load.image('button', 'images/button.png');
    this.load.image('frame', 'images/frame.png');
    this.load.image('gameImage', 'images/sun.png');
    this.load.spritesheet('diamonds', 'images/sun.png', { frameWidth: 166, frameHeight: 166 });
    this.load.spritesheet('puzzleImage', 'images/sun.png', { frameWidth: this.tileSize, frameHeight: this.tileSize});
  }

  create(): void {
    const background = this.add.image(200, 350, 'background');
    //background.setScale(0.35);

    this.puzzle = new PuzzleModel(this.rows, this.cols);

    this.tiles = [];
    for(let i = 0; i < this.puzzle.tiles.length - 1; i++) {
      const tile = new Tile({
        scene: this,
        x: 0,
        y: 0,
        texture: 'puzzleImage',
        frame: i
      });

      this.tiles.push(tile);
      tile.setInteractive();
    }

    this.puzzle.shuffleTiles();

    this.updateTiles();
  }

  updateTiles() {
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        const tileIndex = this.puzzle.tileAt(row, col);

        if (tileIndex === -1)
          continue;

        const tile = this.tiles[tileIndex];

        tile.setX(50 + col * this.tileSize);
        tile.setY(50 + row * this.tileSize);

        tile.removeAllListeners();
        tile.on('pointerdown', () => {
          this.puzzle.interact(row, col);
          this.updateTiles();

          if(this.puzzle.isPuzzleCompleted())
            this.puzzleWasCompleted();
        });
      }
    }
  }

  private puzzleWasCompleted() {
    for(let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].setAlpha(0);
    }

    const gameImage = this.add.image(220, 300, 'gameImage');
    gameImage.setScale(0.80)
    gameImage.rotation = -0.05;

    const frame = this.add.image(220, 300, 'frame');
    frame.setScale(0.80)
    frame.rotation = -0.05

    const congratulations = this.add.text(20, 60, 'Hooooray! Well done!', { font: '40px PayType', color: '#504678' });
    congratulations.rotation = -0.10;

    this.createButton("Done", this.onCompleteClick);
  }

  private createButton(label: string, action: Function): void {
    const button = this.add.image(220, 600, 'button');
    button.setInteractive();
    button.on('pointerdown', this.onCompleteClick);
    button.setScale(0.40)
    this.add.text(160, 570, label, { font: '40px PayType', color: '#504678' });
  }

  private onCompleteClick(): void {
    alert("Call the app Android.onComplete('cancelled/completed')")
  }
}