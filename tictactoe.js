function gameboard() {
  const row = 3;
  const column = 3;
  let board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push([" "]);
    }
  }

  const printGameboard = () => {
    board.forEach((innerArray) => {
      console.log(innerArray.toString());
    });
  };

  const placeSymbol = (row, column, player) => {
    board[row][column] = player.getSymbol();
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

function gameController() {
  const board = gameboard();

  let players = [player("player1", 0), player("player2", 1)];

  let currentPlayer = players[0];

  const print = () => {
    board.printGameboard();
  };

  print();

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const nextPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, column) => {
    board.placeSymbol(row, column, getCurrentPlayer());
    nextPlayerTurn();
    print();
  };

  return { print, getCurrentPlayer, playRound };
}

const game = gameController();
