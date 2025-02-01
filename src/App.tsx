import { GameProvider } from './context/GameContext';
import { GameHeader } from './components/GameHeader';
import { GameStatus } from './components/GameStatus';
import { GameBoards } from './components/GameBoards';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <GameHeader />
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <GameStatus />
            <GameBoards />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;