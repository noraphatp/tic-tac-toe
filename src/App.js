import React, { useState } from "react";
import "./App.css";

function App() {

  const [playerTurn, setPlayerTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [result, setResult] = useState();

  const checkresult = (squares) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && (squares[a] === squares[b] && squares[a] === squares[c])) {
        setResult('Result: ' + squares[a] + ' wins');
      }
    }
  };

  const checkDraw = (squares) => {
    if (squares.every((cell) => cell !== null)) {
      setResult("Result: draw");
    }
  };


  const handleClick = (num) => {
    if (cells[num] !== null || result) {
      return;
    }
  
    let squares = [...cells];
  
    if (playerTurn === 'X') {
      squares[num] = 'X';
      setPlayerTurn('O');
    } else {
      squares[num] = 'O';
      setPlayerTurn('X');
    }
  
    setCells(squares); // we don't pass cells directly because we want to use the latest state, when this function is called, cells will remain the same until the next render 
    checkresult(squares);
    checkDraw(squares);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>; 
  };

  const handleRestart = () => {
    setResult(null);
    setCells(Array(9).fill(null));
  };

  return (
    <div className="container">
      {/* Create table 3x3 grid */}
      <p className="current-player">Player : { playerTurn }</p>
      <table>
        <tr>
          <Cell num={0}/>
          <Cell num={1}/>
          <Cell num={2}/>
        </tr>
        <tr>
          <Cell num={3}/>
          <Cell num={4}/>
          <Cell num={5}/>
        </tr>
        <tr>
          <Cell num={6}/>
          <Cell num={7}/>
          <Cell num={8}/>
        </tr>
      </table>

      {result && (
        <>
          <p>{result}</p>
        </>
      )}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;