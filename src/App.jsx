import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

import "./App.css"

function App() {
  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [ turn, setTurn ] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  });
  const [ winner, setWinner ] = useState(null)
  const [ winnerPos, setWinnerPos ] = useState(Array(3).fill(null));
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  }
  const updateBoard = (index) => {
    if(board[index] || winner) return;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    let newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner[0]) {
      resetStorage();
      setWinnerPos(newWinner[1]);
      confetti();
      setWinner(newWinner[0]);
    } else if(checkEndGame(newBoard)){
      resetStorage();
      setWinner(false);
    }
  }
  const resetStorage = () => {
    window.localStorage.setItem("board", "");
    window.localStorage.setItem("turn", "");
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setWinnerPos(Array(3).fill(null))
  }
  return (
    <main className="board">
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              isWinner={
                index === winnerPos[0] ||
                index === winnerPos[1] ||
                index === winnerPos[2]
              }
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
          </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
          </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
