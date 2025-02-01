import React, { createContext, useContext, useState, useEffect } from 'react';
import { Board, GameState, Ship, CellState } from '../types/game';
import { createEmptyBoard, generateComputerBoard, isValidPlacement, placeShip } from '../utils/gameLogic';

type GameContextType = {
  gameState: GameState;
  playerBoard: Board;
  computerBoard: Board;
  currentShip: Ship;
  remainingShips: number[];
  isHorizontal: boolean;
  message: string;
  handlePlayerBoardClick: (row: number, col: number) => void;
  handleComputerBoardClick: (row: number, col: number) => void;
  toggleOrientation: () => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
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
  }, [gameState]);

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

  const toggleOrientation = () => setIsHorizontal(!isHorizontal);

  const resetGame = () => {
    setGameState('setup');
    setPlayerBoard(createEmptyBoard());
    setComputerBoard(createEmptyBoard());
    setCurrentShip({ length: 5, positions: [], hits: 0 });
    setRemainingShips([5, 4, 3, 3, 2]);
    setMessage('Place your ships');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        playerBoard,
        computerBoard,
        currentShip,
        remainingShips,
        isHorizontal,
        message,
        handlePlayerBoardClick,
        handleComputerBoardClick,
        toggleOrientation,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}