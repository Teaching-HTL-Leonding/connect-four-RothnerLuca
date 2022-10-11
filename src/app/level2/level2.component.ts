import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public playerNames: string[];
  public currentPlayerIndex = 1;
  public currentWinnerIndex = 0;
  public boardContent: number[][] = [];

  constructor() {
    this.playerNames = ['0', '1', '2'];
    this.onRestart();
  }

  public onRestart(): void {
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
    this.boardContent = [
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
    ];
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

  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
  public getStyle(row: number, col: number): string {
    if (this.boardContent[row][col] !== 0) {
      return `occupied-${this.getPlayerNames(row, col)}`;
    }
    return '';
  }

  public getPlayerNames(row: number, col: number): string {
    return this.playerNames[this.boardContent[row][col]];
  }

  public getWinnerName(): string {
    return this.playerNames[this.currentWinnerIndex] === '1' ? 'Red' : 'Blue';
  }

  public getWinnerIndex(): number {
    for (let i = 0; i < this.boardContent.length; i++) {
      if (this.boardContent[i][0] !== 0 &&
        this.boardContent[i][0] === this.boardContent[i][1] &&
        this.boardContent[i][1] === this.boardContent[i][2] &&
        this.boardContent[i][2] === this.boardContent[i][3]) {
          return this.boardContent[i][0];
      }
    }

    for (let i = 0; i < this.boardContent.length; i++) {
      if (this.boardContent[0][i] !== 0 &&
        this.boardContent[0][i] === this.boardContent[1][i] &&
        this.boardContent[1][i] === this.boardContent[2][i] &&
        this.boardContent[2][i] === this.boardContent[3][i]) {
          return this.boardContent[0][i];
      }
    }

    if (this.boardContent[0][0] !== 0 &&
      this.boardContent[0][0] === this.boardContent[1][1] &&
      this.boardContent[1][1] === this.boardContent[2][2] &&
      this.boardContent[2][2] === this.boardContent[3][3]) {
        return this.boardContent[0][0];
    }

    if (this.boardContent[0][3] !== 0 &&
      this.boardContent[0][3] === this.boardContent[1][2] &&
      this.boardContent[1][2] === this.boardContent[2][1] &&
      this.boardContent[2][1] === this.boardContent[3][0]) {
        return this.boardContent[0][3];
    }

    return  0;
  }
}
