import { useState, useEffect } from 'react';
import { Board as BoardComponent } from './components/Board';
import { Board, GameState, Ship } from './types/game';
import { createEmptyBoard, generateComputerBoard, isValidPlacement, placeShip } from './utils/gameLogic';
import { Gamepad2, RotateCcw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [playerBoard, setPlayerBoard] = useState<Board>(createEmptyBoard());
  const [computerBoard, setComputerBoard] = useState<Board>(createEmptyBoard());
  const [currentShip, setCurrentShip] = useState<Ship>({ length: 5, positions: [], hits: 0 });
  const [remainingShips, setRemainingShips] = useState([5, 4, 3, 3, 2]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [message, setMessage] = useState('Place your ships');

  useEffect(() => {
    if (gameState === 'playing') {
      setComputerBoard(generateComputerBoard());
    }
  }, [gameState]);``

  const handlePlayerBoardClick = (row: number, col: number) => {
    if (gameState !== 'setup') return;

    const positions = [];
    const pos = row * 10 + col;

    for (let i = 0; i < currentShip.length; i++) {
      if (isHorizontal) {
        positions.push(pos + i);
      } else {
        positions.push(pos + i * 10);
      }
    }

    if (!isValidPlacement(positions, playerBoard)) {
      setMessage('Invalid placement!');
      return;
    }

    const newShip = { ...currentShip, positions };
    const newBoard = placeShip(playerBoard, newShip);
    setPlayerBoard(newBoard);

    const newRemainingShips = [...remainingShips.slice(1)];
    if (newRemainingShips.length === 0) {
      setGameState('playing');
      setMessage('Game started! Take your shot!');
    } else {
      setCurrentShip({ length: newRemainingShips[0], positions: [], hits: 0 });
      setRemainingShips(newRemainingShips);
    }
  };

  const handleComputerBoardClick = (row: number, col: number) => {
    if (gameState !== 'playing') return;
    
    const newBoard = [...computerBoard];
    const cell = newBoard[row][col];
    
    if (cell === 'hit' || cell === 'miss') return;
    
    if (cell === 'ship') {
      newBoard[row][col] = 'hit';
      setMessage('Hit!');
    } else {
      newBoard[row][col] = 'miss';
      setMessage('Miss!');
    }
    
    setComputerBoard(newBoard);
    
    // Computer's turn
    setTimeout(() => {
      const computerMove = makeComputerMove(playerBoard);
      setPlayerBoard(computerMove);
    }, 1000);
  };

  const makeComputerMove = (board: Board): Board => {
    const newBoard = [...board.map(row => [...row])];
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (newBoard[row][col] === 'hit' || newBoard[row][col] === 'miss');

    if (newBoard[row][col] === 'ship') {
      newBoard[row][col] = 'hit';
      setMessage('Computer hit your ship!');
    } else {
      newBoard[row][col] = 'miss';
      setMessage('Computer missed!');
    }
    return newBoard;
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayerBoard(createEmptyBoard());
    setComputerBoard(createEmptyBoard());
    setCurrentShip({ length: 5, positions: [], hits: 0 });
    setRemainingShips([5, 4, 3, 3, 2]);
    setMessage('Place your ships');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
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

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium text-gray-700">{message}</p>
            {gameState === 'setup' && (
              <button
                onClick={() => setIsHorizontal(!isHorizontal)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Rotate Ship
              </button>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default App;