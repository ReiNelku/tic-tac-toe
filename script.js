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

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      symbol: "X",
    },
    {
      name: playerTwoName,
      symbol: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    board.selectSquare(row, column, getActivePlayer().symbol);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound };
}

const game = GameController();
