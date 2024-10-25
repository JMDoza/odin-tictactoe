function gameboard() {
  const row = 3;
  const col = 3;
  const winCondition = 3;
  const maxSymbols = 9;

  let board = [];
  let totalSymbols = 0;
  let isGameOver = false;

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

  const getIsGameOver = () => {
    return isGameOver;
  };

  const setIsGameOver = (boolean) => {
    isGameOver = boolean;
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
    let symbolDiagCounter_1 = 0; // (0,0) to (2,2)
    let symbolDiagCounter_2 = 0; // (2,0) to (0,2)

    let playerSymbol = player.getSymbol();

    // Single loop to check the row and column
    for (let i = 0; i < rowLength; i++) {
      if (board[row][i] === playerSymbol) {
        symbolRowCounter++;
      }

      if (board[i][col] === playerSymbol) {
        symbolColCounter++;
      }
    }

    // Single loop to check the two diagonals
    if (row === col || row + col === 2) {
      let j = getColLen() - 1;
      for (let i = 0; i < rowLength; i++) {
        if (row === col && board[i][i] === playerSymbol) {
          symbolDiagCounter_1++;
        }

        if (row + col === 2 && board[i][j] === playerSymbol) {
          symbolDiagCounter_2++;
        }
        j--;
      }
    }

    if (
      symbolRowCounter >= winCondition ||
      symbolColCounter >= winCondition ||
      symbolDiagCounter_1 >= winCondition ||
      symbolDiagCounter_2 >= winCondition
    ) {
      console.log(player.getName() + " WINNER");
      setIsGameOver(true);
    } else {
      tieCheck();
    }
  };

  const tieCheck = () => {
    totalSymbols++;
    if (totalSymbols >= maxSymbols) {
      console.log("TIE");
      setIsGameOver(true);
    }
  };

  return { printGameboard, getIsGameOver, placeSymbol };
}

function player(id, name, symbol) {
  const getID = () => {
    return id;
  };
  const getName = () => {
    return name;
  };
  const setName = (newName) => {
    name = newName;
  };
  const getSymbol = () => {
    return symbol;
  };

  return { getID, getName, setName, getSymbol };
}

function renderer() {
  const renderSymbol = (row, col, player) => {
    const X = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-x</title><path d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z" /></svg>`;

    const O = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-o</title><path d="M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z" /></svg>`;

    const cell = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    cell.innerHTML = player.getSymbol() === "X" ? X : O;
  };

  const currentPlayer = (playerCurrent, playerPrevious) => {
    document.querySelector(
      `.player-${playerCurrent} > .name`
    ).dataset.current = true;
    document.querySelector(
      `.player-${playerPrevious} > .name`
    ).dataset.current = false;
  };

  const setWinner = (player) => {
    const winner = player.getID();
    document.querySelector(`.player-${winner} > .name`).dataset.current =
      "winner";
  };

  const clearBoard = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  };
  return { renderSymbol, currentPlayer, setWinner, clearBoard };
}

const game = (function gameController() {
  const gameRenderer = renderer();

  let board = gameboard();
  let players = [player(1, "player1", "X"), player(2, "player2", "O")];

  let currentPlayer = players[0];

  const print = () => {
    board.printGameboard();
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  console.log(getCurrentPlayer().getName() + " Turn");
  const nextPlayerTurn = () => {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
      gameRenderer.currentPlayer(2, 1);
    } else {
      currentPlayer = players[0];
      gameRenderer.currentPlayer(1, 2);
    }

    // currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    console.log(getCurrentPlayer().getName() + " Turn");
  };

  /*
    placeSymbol function returns a boolean, if true then the player
    was able to take their turn
  */
  const playRound = (row, col) => {
    const player = getCurrentPlayer();
    if (!board.getIsGameOver() && board.placeSymbol(row, col, player)) {
      gameRenderer.renderSymbol(row, col, player);
      if (!board.getIsGameOver()) {
        nextPlayerTurn();
      } else {
        gameRenderer.setWinner(player);
      }
    }
  };

  const resetGame = () => {
    board = gameboard();
    gameRenderer.clearBoard();
    currentPlayer = players[0];
    gameRenderer.currentPlayer(1, 2);
    console.log(getCurrentPlayer().getName() + " Turn");
  };

  (function initClickListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        // converts to numerical value
        const row = +cell.dataset.row;
        const col = +cell.dataset.col;
        playRound(row, col);
      });
    });

    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
      resetGame();
    });

    const overlay = document.getElementById("overlay");
    const dialog = document.getElementById("customDialog");
    const editNameButtons = document.querySelectorAll(".edit-name-button");
    const saveButton = document.querySelector("#customDialog > button");
    editNameButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const nameContainer = event.currentTarget.closest(".name");
        const h2Element = nameContainer.querySelector("h2");
        overlay.style.display = "block";
        dialog.style.display = "block";
        saveButton.dataset.player = h2Element.dataset.player;
      });
    });

    const newName = document.querySelector("#customDialog > input");

    saveButton.addEventListener("click", (event) => {
      const player = event.currentTarget.dataset.player;
      const playerName = document.querySelector(`h2[data-player="${player}"]`);

      playerName.textContent = newName.value;
      playerName.dataset.player === "1"
        ? players[0].setName(newName.value)
        : players[1].setName(newName.value);

      overlay.style.display = "none";
      dialog.style.display = "none";
    });
  })();

  print();

  return { print, getCurrentPlayer, playRound, resetGame };
})();
