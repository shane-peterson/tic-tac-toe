import React from 'react';
interface squareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
}
interface gameState {
  history: { squares: (null | 'X' | 'O')[] }[];
  stepNumber: number;
  xIsNext: boolean;
}
interface boardProps {
  squares: gameState['history'][0]['squares'];
  onClick: (i: number) => void;
}

function Square(props: squareProps) {
  return (
    <button
      className="float-left -mt-px -mr-px h-[34px] w-[34px] border border-[#999] bg-white p-0 text-center text-2xl font-bold leading-[34px] focus:outline-none"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component<boardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="after:clear-both after:table">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="after:clear-both after:table">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="after:clear-both after:table">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  state: gameState = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status: string;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="flex flex-row">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i): void => this.handleClick(i)}
          />
        </div>
        <div className="ml-5">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: (null | 'X' | 'O')[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default Game;
