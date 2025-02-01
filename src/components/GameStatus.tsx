import { useGame } from '../context/GameContext';

export function GameStatus() {
  const { message, gameState, toggleOrientation } = useGame();

  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-lg font-medium text-gray-700">{message}</p>
      {gameState === 'setup' && (
        <button
          onClick={toggleOrientation}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Rotate Ship
        </button>
      )}
    </div>
  );
}