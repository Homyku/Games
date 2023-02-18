const squares = document.querySelectorAll(".square");
const restartBtn = document.querySelector("#restart");
let currentPlayer = "X";
let gameEnded = false;

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    if (gameEnded) return;

    // check if the square is already occupied
    if (e.target.textContent !== "") return;

    // add the current player's mark to the square
    e.target.textContent = currentPlayer;

    // check if the game is over
    if (checkWin() || checkTie()) {
      gameEnded = true;
      return;
    }

    // switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

restartBtn.addEventListener("click", () => {
  squares.forEach((square) => {
    square.textContent = "";
  });
  currentPlayer = "X";
  gameEnded = false;
});

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      squares[a].textContent &&
      squares[a].textContent === squares[b].textContent &&
      squares[a].textContent === squares[c].textContent
    ) {
      alert(`Player ${currentPlayer} wins!`);
      return true;
    }
  }

  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }

  alert("It's a tie!");
  return true;
}
