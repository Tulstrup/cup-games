import { Tile } from "../objects/tile";
import { PuzzleModel } from "../puzzle.model";
import Sprite = Phaser.GameObjects.Sprite;
import INT = Phaser.Renderer.WebGL.INT;
import EventEmitter = Phaser.Events.EventEmitter;
import Text = Phaser.GameObjects.Text;
import Image = Phaser.GameObjects.Image;

export class MainScene extends Phaser.Scene {
  private puzzle: PuzzleModel;
  private rows: number = 3;
  private cols: number = 3;
  private imageSize = 500;
  private tileSize: number = this.imageSize / this.rows;
  private imageScale: number;
  private header: Text;
  private frame: Image

  private tiles: Tile[];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('background', 'images/beach.png');
    this.load.image('button', 'images/button.png');
    this.load.image('frame', 'images/frame.png');
    this.load.image('gameImage', 'images/sun.png');
    this.load.spritesheet('puzzleImage', 'images/sun.png', { frameWidth: this.tileSize, frameHeight: this.tileSize});
    this.load.audio('tile_move', 'audio/tile_move.wav');
    this.load.audio('win', 'audio/win.wav');
    this.load.audio('background_music', 'audio/background_music.wav');
  }

  create(): void {
    this.imageScale = this.scale.width / this.imageSize * 0.75;

    const background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
    background.width = this.scale.width;
    background.height = this.scale.height;

    this.puzzle = new PuzzleModel(this.rows, this.cols);

    this.tiles = [];
    for(let i = 0; i < this.puzzle.tiles.length - 1; i++) {
      const tile = new Tile({
        scene: this,
        x: 0,
        y: 0,
        texture: 'puzzleImage',
        frame: i
      },
      this.imageScale);

      this.tiles.push(tile);
      tile.setInteractive();
    }

    this.header = this.add.text(this.scale.width / 2 * 1.1, this.scale.height / 7, "Move the tiles!", { font: '10em PayType-Bd', color: '#504678' });
    this.header.setOrigin(0.55, 0.65);
    this.header.rotation = -0.1

    this.puzzle.shuffleTiles();

    this.updateTiles();
    this.sound.play('background_music', { loop: true });

    this.frame = this.add.image(this.scale.width / 2, this.scale.height / 2, 'frame');
    this.frame.setScale(this.imageScale)

  }

  updateTiles() {
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        const tileIndex = this.puzzle.tileAt(row, col);

        if (tileIndex === -1)
          continue;

        const tile = this.tiles[tileIndex];

        tile.setX(this.scale.width / 2 - (this.imageSize * this.imageScale) / 2 + (col+0.5) * this.tileSize * this.imageScale);
        tile.setY(this.scale.height / 2 - (this.imageSize * this.imageScale) / 2 + (row+0.5) * this.tileSize * this.imageScale);

        tile.removeAllListeners();
        tile.on('pointerdown', () => {
          const interacted = this.puzzle.interact(row, col);

          if (!interacted)
            return;

          this.sound.play('tile_move');
          this.updateTiles();

          if(this.puzzle.isPuzzleCompleted())
            this.puzzleWasCompleted();
        });
      }
    }
  }

  private puzzleWasCompleted() {
    this.sound.play('win');

    for(let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].setAlpha(0);
    }

    const gameImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'gameImage');
    gameImage.setScale(this.imageScale)
    gameImage.rotation = -0.05;
    gameImage.setDepth(5); 

    this.frame.setScale(this.imageScale)
    this.frame.rotation = -0.05
    this.frame.setDepth(10);

    this.header.text = 'Hooooray!\nWell done!';
    this.createButton("Done", this.onCompleteClick);
  }

  private createButton(label: string, action: Function): void {
    const button = this.add.image(this.scale.width / 2, this.scale.height / 2 * 1.7, 'button');
    button.setInteractive();
    button.on('pointerdown', this.onCompleteClick);
    button.setScale(0.60);
    button.setOrigin(0.5, 0.5);

    const text = this.add.text(this.scale.width / 2, this.scale.height / 2 * 1.7, label, { font: '7em PayType-Rg', color: '#504678' });
    text.setOrigin(0.55, 0.65);
  } 

  private onCompleteClick(): void {
    Android.onGameCompleted();
  }
}