function gameboard() {
  const row = 3;
  const col = 3;
  const winCondition = 3;
  const maxSymbols = 9;

  let board = [];
  let totalSymbols = 0;

  // Initialize the board with empty arrays
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

  /* 
    Uses the player's symbol to place on the board and checks if there is a
    winner every time 
  */
  const placeSymbol = (row, col, player) => {
    if (board[row][col] == 0) {
      board[row][col] = player.getSymbol();
      winCheck(row, col, player);
      return true;
    } else {
      return false;
    }
  };

  /* 
    Currently when there is a winner the game still triggers the next
    players turn
  */
  const winCheck = (row, col, player) => {
    const rowLength = getRowLen();

    // Counters to keep track of how many of the players symbols there are
    let symbolRowCounter = 0;
    let symbolColCounter = 0;
    let symbolDiagonalCounter_1 = 0; // (0,0) to (2,2)
    let symbolDiagonalCounter_2 = 0; // (2,0) to (0,2)

    let playerSymbol = player.getSymbol();
    let playerName = player.getName();

    // Single loop to check the row and column
    for (let i = 0; i < rowLength; i++) {
      if (board[row][i] === playerSymbol) {
        symbolRowCounter++;
        console.log(`${playerName} | Rows: [${row}] [${i}]`);
      }

      if (board[i][col] === playerSymbol) {
        symbolColCounter++;
        console.log(`${playerName} | Cols: [${i}] [${col}]`);
      }
    }

    // Single loop to check the two diagonals
    if (row === col || row + col === 2) {
      let j = getColLen() - 1;
      for (let i = 0; i < rowLength; i++) {
        if (row === col && board[i][i] === playerSymbol) {
          symbolDiagonalCounter_1++;
          console.log(`${playerName} | Diagonals 1: [${i}] [${i}]`);
        }

        if (row + col === 2 && board[i][j] === playerSymbol) {
          symbolDiagonalCounter_2++;
          console.log(`${playerName} | Diagonals 2: [${i}] [${j}]`);
        }
        j--;
      }
    }

    if (
      symbolRowCounter >= winCondition ||
      symbolColCounter >= winCondition ||
      symbolDiagonalCounter_1 >= winCondition ||
      symbolDiagonalCounter_2 >= winCondition
    ) {
      console.log(player.getName() + "WINNER");
    } else {
      tieCheck();
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

function renderer() {
  const renderSymbol = (row, col, player) => {
    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    cell.textContent = player.getSymbol();
  };
  return { renderSymbol };
}

const game = (function gameController() {
  const board = gameboard();
  const gameRenderer = renderer();

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

  /*
    placeSymbol function returns a boolean, if true then the player
    was able to take their turn
  */
  const playRound = (row, col) => {
    const player = getCurrentPlayer();
    if (board.placeSymbol(row, col, player)) {
      gameRenderer.renderSymbol(row, col, player);
      nextPlayerTurn();
    }
    print();
  };

  print();

  return { print, getCurrentPlayer, playRound };
})();
