import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

export interface BoardCell {
  playerName: string;
  class: string;
}

@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  // TODO: Complete this class by adding the appropriate code.
  // Try to avoid copying the code from level 2. Find a different solution
  // for reusing the existing logic.
  private NR_ROWS = 6;
  private NR_COLS = 7;

  constructor() {
    super();
    this.onRestart();
  }

  public override onRestart(): void {
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
    this.boardContent = [
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0 ],
    ];
    console.log("Restarted");
  }

  public override getWinnerIndex(): number {
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

  public getCells(): BoardCell[][] {
    const cells: BoardCell[][] = [];
    for (let row = 0; row < this.NR_ROWS; row++) {
      cells.push([]);
      for (let cols = 0; cols < this.NR_COLS; cols++) {
        cells[row][cols] = {
          playerName: this.getPlayerNames(row, cols),
          class: this.getStyle(row, cols),
        }
      }
    }
    return cells;
  }
}
