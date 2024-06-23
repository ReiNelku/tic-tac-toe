function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Player());
    }
  }

  const getBoard = () => board;

  const selectSquare = (row, column, player) => {
    if (board[row][column].getSymbol() !== "Empty") {
      return;
    }

    board[row][column].addSymbol(player);
  };

  const printBoard = () => {
    const boardWithSymbolValues = board.map((row) =>
      row.map((square) => square.getSymbol())
    );

    console.log(boardWithSymbolValues);
  };

  return { getBoard, selectSquare, printBoard };
}

function Player() {
  let symbol = "Empty";

  const addSymbol = (player) => {
    symbol = player;
  };

  const getSymbol = () => symbol;

  return { addSymbol, getSymbol };
}
