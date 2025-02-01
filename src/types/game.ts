export type CellState = 'empty' | 'ship' | 'hit' | 'miss';

export type Ship = {
  length: number;
  positions: number[];
  hits: number;
};

export type Board = CellState[][];

export type GameState = 'setup' | 'playing' | 'gameOver';