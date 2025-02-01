import { Board, Ship } from '../types/game';

export function createEmptyBoard(size: number = 10): Board {
  return Array(size).fill(null).map(() => 
    Array(size).fill('empty')
  );
}

export function placeShip(board: Board, ship: Ship): Board {
  const newBoard = [...board.map(row => [...row])];
  ship.positions.forEach(pos => {
    const row = Math.floor(pos / 10);
    const col = pos % 10;
    newBoard[row][col] = 'ship';
  });
  return newBoard;
}

export function isValidPlacement(positions: number[], board: Board): boolean {
  return positions.every(pos => {
    const row = Math.floor(pos / 10);
    const col = pos % 10;
    return row >= 0 && row < 10 && col >= 0 && col < 10 && board[row][col] === 'empty';
  });
}

export function generateComputerBoard(): Board {
  const board = createEmptyBoard();
  const ships = [
    { length: 5, positions: [], hits: 0 },
    { length: 4, positions: [], hits: 0 },
    { length: 3, positions: [], hits: 0 },
    { length: 3, positions: [], hits: 0 },
    { length: 2, positions: [], hits: 0 },
  ];

  ships.forEach(ship => {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() > 0.5;
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * (10 - ship.length));
      
      const positions = [];
      for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
          positions.push(row * 10 + (col + i));
        } else {
          positions.push((row + i) * 10 + col);
        }
      }
      if (isValidPlacement(positions, board)) {
        ship.positions = positions as never[];
        placed = true;
      }
    }
  });

  return ships.reduce((acc, ship) => placeShip(acc, ship), board);
}