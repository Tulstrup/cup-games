export class PuzzleModel {
  rows: number;
  cols: number;
  tiles: number[];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;

    this.tiles = [];
    for(let i = 0; i < rows*cols-1; i++) {
      this.tiles.push(i);
    }
  
    this.tiles.push(-1);
  }

  shuffleTiles(): void {
    for(let i = 0; i < 5; i++) {
      const emptyTilePoint = this.indexToPoint(this.tiles.findIndex(x => x === -1));
      const direction = this.random(4);

      if (direction === 0)
        this.interact(emptyTilePoint.row+1, emptyTilePoint.col);
      if (direction === 1)
        this.interact(emptyTilePoint.row-1, emptyTilePoint.col);
      if (direction === 2)
        this.interact(emptyTilePoint.row, emptyTilePoint.col+1);
      if (direction === 3)
        this.interact(emptyTilePoint.row, emptyTilePoint.col-1);
    }
  }

  isPuzzleCompleted(): boolean {
    let expected = 0;
    for(let i = 0; i < this.tiles.length - 1; i++) {
      if(this.tiles[i] != expected)
        return false;

      expected++;
    }

    if (this.tiles[this.tiles.length - 1] != -1)
      return false;

    return true;
  }

  interact(row: number, col: number): void {
    if (!this.isInteractionAllowed(row, col))
      return;

    const emptyTileIndex = this.tiles.findIndex(x => x == -1);
    const interactedTileIndex = this.pointToTileIndex(row, col);

    this.tiles[emptyTileIndex] = this.tiles[interactedTileIndex];
    this.tiles[interactedTileIndex] = -1;
  }

  print(): void {
    for(let row = 0; row < this.rows; row++) {
      let rowString = "";
      for(let c = 0; c < this.cols; c++) {
        rowString += " " + this.tiles[this.pointToTileIndex(row, c)];
      }

      console.log(rowString);
    }
  }

  tileAt(row: number, col: number): number {
    return this.tiles[this.pointToTileIndex(row, col)];
  }

  private indexToPoint(index: number): { row: number, col: number} {
    return { row: Math.floor(index / this.cols), col: index % this.cols}
  }

  private random(max: number) {
    return Math.floor(Math.random() * max);
  }

  private pointToTileIndex(row: number, col: number): number {
    return row * this.cols + col;
  }

  private isInteractionAllowed(row: number, col: number): boolean {
    const emptyTileIndex = this.tiles.findIndex(x => x == -1);

    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols)
      return false;

    if (row+1 < this.rows
        && this.pointToTileIndex(row+1, col) == emptyTileIndex)
      return true;

    if (row-1 >= 0
      && this.pointToTileIndex(row-1, col) == emptyTileIndex)
      return true;
    
    if (col+1 < this.cols
      && this.pointToTileIndex(row, col+1) == emptyTileIndex)
      return true;

    if (col-1 >= 0
      && this.pointToTileIndex(row, col-1) == emptyTileIndex)
      return true;

    return false;
  }
}