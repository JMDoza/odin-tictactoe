function gameboard() {
  const row = 3;
  const col = 3;
  let board = [];

  let player1Counter = 0;
  let player2Coutner = 0;

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push([" "]);
    }
  }

  const getRowLen = () => {
    return row;
  };

  const getColLen = () => {
    return col;
  };

  const printGameboard = () => {
    board.forEach((innerArray) => {
      console.log(innerArray.toString());
    });
  };

  const placeSymbol = (row, col, player) => {
    board[row][col] = player.getSymbol();
    winCheck(row, col, player);
  };

  const winCheck = (row, col, player) => {
    const rowLength = getRowLen();

    let symbolRowCounter = 0;
    let symbolColCounter = 0;
    let symbolPriamryDiagonalCounter = 0;
    let symbolSecondaryDiagonalCounter = 0;

    for (let i = 0; i < rowLength; i++) {
      if (board[row][i] === player.getSymbol()) {
        symbolRowCounter++;
        console.log(`${player.getName()} | Rows: [${row}] [${i}]`);
      }

      if (board[i][col] === player.getSymbol()) {
        symbolColCounter++;
        console.log(`${player.getName()} | Cols: [${i}] [${col}]`);
      }

      if (symbolRowCounter >= 3 || symbolColCounter >= 3) {
        return;
      }
    }

    if (row === col || row + col === 2) {
      let j = getColLen() - 1;
      for (let i = 0; i < rowLength; i++) {
        if (row === col && board[i][i] === player.getSymbol()) {
          symbolPriamryDiagonalCounter++;
          console.log(`${player.getName()} | Diagonals 1: [${i}] [${i}]`);
        }

        if (row + col === 2 && board[i][j] === player.getSymbol()) {
          symbolSecondaryDiagonalCounter++;
          console.log(`${player.getName()} | Diagonals 2: [${i}] [${j}]`);
        }
        j--;
      }
    }

    if (
      symbolRowCounter >= 3 ||
      symbolColCounter >= 3 ||
      symbolPriamryDiagonalCounter >= 3 ||
      symbolSecondaryDiagonalCounter >= 3
    ) {
      console.log("WINNER");
    }
  };

  return { printGameboard, placeSymbol };
}

function player(name, symbol) {
  const getName = () => {
    return name;
  };
  const getSymbol = () => {
    return symbol;
  };

  return { getName, getSymbol };
}

const game = (function gameController() {
  const board = gameboard();

  let players = [player("player1", 0), player("player2", 1)];

  let currentPlayer = players[0];

  const print = () => {
    board.printGameboard();
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const nextPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, col) => {
    board.placeSymbol(row, col, getCurrentPlayer());
    nextPlayerTurn();
    print();
  };

  print();

  return { print, getCurrentPlayer, playRound };
})();
