function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("Empty");
    }
  }

  const getBoard = () => board;

  const selectSquare = (row, column, player) => {
    if (board[row][column] !== "Empty") {
      return;
    }

    board[row][column] = player;
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, selectSquare, printBoard };
}