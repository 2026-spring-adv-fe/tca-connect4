import './App.css'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router';
import { APP_TITLE, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { getGeneralFacts, getLeaderboard, type GameResult } from './GameResults';
import { useState } from 'react';

const dummyGameResults: GameResult[] = [
  {
    winner: "Harry",
    players: [
      "Harry",
      "Hermione",
      "Ron",
    ],
    start: "2026-02-01T18:53:59.078Z",
    end: "2026-02-01T19:27:59.078Z",
  },
  {
    winner: "Hermione",
    players: [
      "Harry",
      "Hermione",
      "Ron",
    ],
    start: "2026-01-15T22:07:59.078Z",
    end: "2026-01-15T23:01:59.078Z",
  },
];

const App = () => {

  //
  // React hooks...
  //
  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(APP_TITLE);

  //
  // Calculate state and other funcs...
  //
  const addNewGameResult = (gameResult: GameResult) => setGameResults(
    [
      ...gameResults,
      gameResult,
    ]
  );

  //
  // Return JSX...
  //
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content"
      >
        <p
          className="text-xl font-bold"
        >
          {title}
        </p>
      </div>
      <div 
        className="p-3"
      >
      <HashRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                generalFacts={
                  getGeneralFacts(gameResults)
                }
                leaderboard={
                  getLeaderboard(gameResults)
                }
              />
            }
          />
          <Route
            path='/setup'
            element={
              <Setup />
            }
          />
          <Route
            path='/play'
            element={
              <Play
                addNewGameResult={
                  addNewGameResult
                }
              />
            }
          />
        </Routes>
      </HashRouter>
      </div>
    </div>
  )
}

export default App
