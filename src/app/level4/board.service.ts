import { Injectable } from '@angular/core';

/**
 * Logic for a connect-four-board.
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  // TODO: Add the required code here
  public boardContent: number[][] = [];
  public currentPlayerIndex!: number;
  public currentWinnerIndex = 0;
  public playerNames: string[];
  private NR_COLS = 7;
  private NR_ROWS = 6;

  constructor() {
    this.onRestart();
    this.playerNames = ['0', '1', '2'];
  }

  public onRestart(): void {
    this.boardContent = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }

  public drop(colIx: number) {
    if (this.currentWinnerIndex === 0) {
      for (let i = this.boardContent.length-1; i >= 0; i--) {
        if (this.boardContent[i][colIx] === 0) {
          this.boardContent[i][colIx] = this.currentPlayerIndex;
          break;
        }
      }
      console.log(`Coin dropped in column ${colIx}`);
      this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    }
    this.currentWinnerIndex = this.getWinnerIndex();
  }

  public getWinnerIndex(): number {
    // check cols
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < this.NR_COLS; col++) {
        if (this.boardContent[row][col] !== 0 &&
            this.boardContent[row][col] === this.boardContent[row + 1][col] &&
            this.boardContent[row][col] === this.boardContent[row + 2][col] &&
            this.boardContent[row][col] === this.boardContent[row + 3][col]) {
          return this.boardContent[row][col];
        }
      }
    }
    // check rows
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < this.NR_ROWS; row++) {
        if (this.boardContent[row][col] !== 0 &&
            this.boardContent[row][col] === this.boardContent[row][col + 1] &&
            this.boardContent[row][col] === this.boardContent[row][col + 2] &&
            this.boardContent[row][col] === this.boardContent[row][col + 3]) {
          return this.boardContent[row][col];
        }
      }
    }
    // check diagonals from left top to right bottom
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.boardContent[row][col] !== 0 &&
            this.boardContent[row][col] === this.boardContent[row + 1][col + 1] &&
            this.boardContent[row][col] === this.boardContent[row + 2][col + 2] &&
            this.boardContent[row][col] === this.boardContent[row + 3][col + 3]) {
          return this.boardContent[row][col];
        }
      }
    }
    // check diagonals from right top to left bottom
    for (let row = 0; row < 3; row++) {
      for (let col = this.NR_COLS-1; col >= 3; col--) {
        if (this.boardContent[row][col] !== 0 &&
            this.boardContent[row][col] === this.boardContent[row + 1][col - 1] &&
            this.boardContent[row][col] === this.boardContent[row + 2][col - 2] &&
            this.boardContent[row][col] === this.boardContent[row + 3][col - 3]) {
          return this.boardContent[row][col];
        }
      }
    }
    return 0;
  }

}
