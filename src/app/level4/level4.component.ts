import { Component } from '@angular/core';
import { BoardCell } from '../level3/level3.component';
import { BoardService } from './board.service';

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  constructor(public board: BoardService) {}

  // TODO: Enhance solution from level 3 by extracting the logic in a separate Angular service.
  public getStyle(row: number, col: number): string {
    if (this.board.boardContent[row][col] !== 0) {
      return `occupied-${this.getPlayerNames(row, col)}`;
    }
    return '';
  }

  public getPlayerNames(row: number, col: number): string {
    return this.board.playerNames[this.board.boardContent[row][col]];
  }

  public getWinnerName(): string {
    return this.board.playerNames[this.board.currentWinnerIndex] === '1' ? 'Red' : 'Blue';
  }

  public getCells(): BoardCell[][] {
    const cells: BoardCell[][] = [];
    for (let row = 0; row < this.board.boardContent.length; row++) {
      cells.push([]);
      for (let cols = 0; cols < this.board.boardContent[0].length; cols++) {
        cells[row][cols] = {
          playerName: this.getPlayerNames(row, cols),
          class: this.getStyle(row, cols),
        }
      }
    }
    return cells;
  }
}
