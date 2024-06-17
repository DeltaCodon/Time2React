import { useState } from "react";

import Player from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning_combos";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, namedPlayer) {
  let winner;

  for (const combos of WINNING_COMBINATIONS) {
    const firstSqaureSymbol = gameBoard[combos[0].row][combos[0].column];
    const secondSqaureSymbol = gameBoard[combos[1].row][combos[1].column];
    const thirdSqaureSymbol = gameBoard[combos[2].row][combos[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSqaureSymbol &&
      secondSqaureSymbol === thirdSqaureSymbol
    ) {
      winner = namedPlayer[firstSqaureSymbol];
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";

  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [namedPlayer, setNamedPlayer] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, namedPlayer);
  const hasDraw = gameTurn.length === 9 && !winner;

  // everthing is explained in video 85 towards the mid-end
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setNamedPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActivePlayer={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActivePlayer={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
