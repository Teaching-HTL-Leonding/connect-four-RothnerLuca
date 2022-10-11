import { Expression } from "@angular/compiler";
import { BoardService } from "./board.service";

describe('Board service', () => {
  it('can drop pieces on the board', () => {
    const board = new BoardService();

    board.drop(0);
    expect(board.boardContent[board.boardContent.length-1][0]).toBe(1);
  });

  it('can detect winner in a row', () => {
    const board = new BoardService();

    for(let i = 0; i < 4; i++) {
      if(i !== 3) {
        for (let j = 0; j < 2; j++) {
          board.drop(i);
        }
      }
      else {
        board.drop(i);
      }
    }
    expect(board.getWinnerIndex()).toBe(1);
  });

  it('can detect winner in a column', () => {
    const board = new BoardService();

    for(let i = 0; i < 4; i++) {
      board.drop(0);
      if(i !== 3) {
        board.drop(1);
      }
    }

    expect(board.getWinnerIndex()).toBe(1);
  });

  it('can detect winner in a diagonal', () => {
    const board = new BoardService();

    board.drop(0);
    board.drop(1);
    board.drop(1);
    board.drop(2);
    board.drop(2);
    board.drop(3);
    board.drop(2);
    board.drop(3);
    board.drop(4);
    board.drop(3);
    board.drop(3);

    expect(board.getWinnerIndex()).toBe(1);
  });

  it('clears the board on restart correctly', () => {
    const board = new BoardService();
    board.drop(0);

    board.onRestart();

    expect(
      board.boardContent.filter(
        (row) => row.some((cell) => cell != 0)
      ).length
    ).toBe(0);
  });

  it('cannot drop a piece if there is already a winner', () => {
    const board = new BoardService();
    board.currentWinnerIndex = 2;

    board.drop(0);
    expect(board.boardContent.filter(
      (row) => row.some((cell) => cell !== 0)).length)
    .toBe(0);
  })
});
