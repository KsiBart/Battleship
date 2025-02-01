import { Board as BoardComponent } from './Board';
import { useGame } from '../context/GameContext';

export function GameBoards() {
  const { playerBoard, computerBoard, handlePlayerBoardClick, handleComputerBoardClick } = useGame();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Board</h2>
        <BoardComponent
          board={playerBoard}
          isPlayer={true}
          onCellClick={handlePlayerBoardClick}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Computer's Board</h2>
        <BoardComponent
          board={computerBoard}
          isPlayer={false}
          onCellClick={handleComputerBoardClick}
        />
      </div>
    </div>
  );
}