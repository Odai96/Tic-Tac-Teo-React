import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

function Square({ value, onClick }) {

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      New Game
    </button>
  );
}
function Game() {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  var [ isXNext, setIsXNext ] = useState(true);
  var winner = checkWinner(squares);
  var turn;
  if(isXNext){
    turn = "X";
  }
  else{
    turn = "O";
  }

  function getStatus() {
    if (winner) {
      return  winner + "=>Win The Game";
    } else if (isFull(squares)) {
      return "Draw";
    } else {
      return "Turn Of: " + turn;
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = turn;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-table">
          <div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="info">{getStatus()}</div>
        <div className="button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
function isFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

function checkWinner(squares) {
  const isWinner= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < isWinner.length; i++) {
    const [a, b, c] = isWinner[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

