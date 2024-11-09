let currentPlayer = "X";
const BOARD_SIZE = 3;

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;

  setTimeout(() => {
    if (checkWinDynamic()) {
      alert(`${currentPlayer} Wins!`);
      resetBoard();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }, 50);
}

function checkWinDynamic(e) {
  const board = Array.from(cells).map((cell) => cell.textContent);
  const grid = [];

  // create a grid of the board
  for (let i = 0; i < BOARD_SIZE; i++) {
    grid.push(board.slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE));
  }

  // check rows for wins
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (grid[row].every((cell) => cell === currentPlayer)) {
      return true;
    }
  }

  // check columns for wins
  for (let col = 0; col < BOARD_SIZE; col++) {
    const column = grid.map((row) => row[col]);
    if (column.every((cell) => cell === currentPlayer)) {
      return true;
    }
  }

  //check diagonals for wins
  if (grid.every((row, i) => grid[i][i] === currentPlayer)) {
    return true;
  }

  if (grid.every((row, i) => grid[i][BOARD_SIZE - 1 - i] === currentPlayer)) {
    return true;
  }
  return false;
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.removeEventListener("click", handleClick, { once: true });
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
}
