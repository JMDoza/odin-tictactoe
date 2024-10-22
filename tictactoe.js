function gameboard() {
  const row = 3;
  const col = 3;
  const winCondition = 3;
  const maxSymbols = 9;
  let board = [];

  let totalSymbols = 0;

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push([0]);
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
    if (board[row][col] == 0) {
      board[row][col] = player.getSymbol();
      winCheck(row, col, player);
      tieCheck();
      return true;
    } else {
      return false;
    }
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

      //   if (
      //     symbolRowCounter >= winCondition ||
      //     symbolColCounter >= winCondition
      //   ) {
      //     return;
      //   }
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
        // if (
        //   symbolPriamryDiagonalCounter >= winCondition ||
        //   symbolSecondaryDiagonalCounter >= winCondition
        // ) {
        //   return;
        // }
      }
    }

    if (
      symbolRowCounter >= winCondition ||
      symbolColCounter >= winCondition ||
      symbolPriamryDiagonalCounter >= winCondition ||
      symbolSecondaryDiagonalCounter >= winCondition
    ) {
      console.log("WINNER");
    }
  };

  const tieCheck = () => {
    totalSymbols++;
    if (totalSymbols >= maxSymbols) {
      console.log("TIE");
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

  let players = [player("player1", 1), player("player2", 2)];

  let currentPlayer = players[0];

  const print = () => {
    console.log(getCurrentPlayer().getName() + " Turn");
    board.printGameboard();
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const nextPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, col) => {
    if (board.placeSymbol(row, col, getCurrentPlayer())) {
      nextPlayerTurn();
    }
    print();
  };

  print();

  return { print, getCurrentPlayer, playRound };
})();
