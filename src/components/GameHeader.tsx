import { Gamepad2, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';

export function GameHeader() {
  const { resetGame } = useGame();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <Gamepad2 className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Battleship</h1>
      </div>
      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Game
      </button>
    </div>
  );
}