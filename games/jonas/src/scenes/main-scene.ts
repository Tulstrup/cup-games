import { Tile } from '../objects/tile';
import { PuzzleModel } from '../puzzle.model';

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
    this.load.spritesheet('puzzleImage', 'images/sun.png', { frameWidth: this.tileSize, frameHeight: this.tileSize});
  }

  create(): void {
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
        });
      }
    }
  }
}
