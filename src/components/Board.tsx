import React from 'react';
import { CellState } from '../types/game';

type BoardProps = {
  board: CellState[][];
  isPlayer: boolean;
  onCellClick: (row: number, col: number) => void;
};

export function Board({ board, isPlayer, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-10 gap-1 bg-blue-100 p-4 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className={`
              w-8 h-8 rounded cursor-pointer transition-colors
              ${getCellColor(cell, isPlayer)}
              hover:bg-blue-300
            `}
          />
        ))
      )}
    </div>
  );
}

function getCellColor(state: CellState, isPlayer: boolean): string {
  switch (state) {
    case 'empty':
      return 'bg-blue-200';
    case 'ship':
      return isPlayer ? 'bg-gray-600' : 'bg-blue-200';
    case 'hit':
      return 'bg-red-500';
    case 'miss':
      return 'bg-white';
    default:
      return 'bg-blue-200';
  }
}