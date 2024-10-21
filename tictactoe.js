function gameboard() {
  const row = 3;
  const column = 3;
  let board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push([]);
    }
  }

  function printGameboard() {
    board.forEach((innerArray) => {
      console.log(innerArray.toString());
    });
  }

  return { printGameboard };
}

function players(name) {}

function gameController() {}

const gameTTT = gameboard();

// gameTTT.printGameboard()
