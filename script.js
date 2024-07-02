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

    console.table(boardWithSymbolValues);
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

  let round = 1;

  const checkWinner = () => {
    if (round < 5) {
      return;
    }

    const playerSymbol = getActivePlayer().symbol;
    const currentBoard = board.getBoard();
    const rowColumnLength = currentBoard.length;

    // Check each row if there is a winner and return the winner
    for (let i = 0; i < rowColumnLength; i++) {
      let symbolCount = 0;
      for (let j = 0; j < rowColumnLength; j++) {
        if (currentBoard[i][j].getSymbol() === playerSymbol) {
          symbolCount++;
        }
      }
      if (symbolCount === rowColumnLength) {
        return getActivePlayer();
      }
    }

    // Check each column if there is a winner and return the winner
    for (let i = 0; i < rowColumnLength; i++) {
      let symbolCount = 0;
      for (let j = 0; j < rowColumnLength; j++) {
        if (currentBoard[j][i].getSymbol() === playerSymbol) {
          symbolCount++;
        }
      }
      if (symbolCount === rowColumnLength) {
        return getActivePlayer();
      }
    }

    // Check diagonals if there is a winner and return the winner
    for (let i = 0, symbolCount = 0; i < rowColumnLength; i++) {
      if (currentBoard[i][i].getSymbol() === playerSymbol) {
        symbolCount++;
      }
      if (symbolCount === rowColumnLength) {
        return getActivePlayer();
      }
    }
    for (let i = 0, symbolCount = 0; i < rowColumnLength; i++) {
      if (
        currentBoard[i][rowColumnLength - 1 - i].getSymbol() === playerSymbol
      ) {
        symbolCount++;
      }
      if (symbolCount === rowColumnLength) {
        return getActivePlayer();
      }
    }

    // Check if the board is full and return null if it is a tie
    if (round === 9) {
      return null;
    }
  };

  const printWinner = (winner) => {
    console.log(`The winner is: ${winner.name}`);
  };

  const playRound = (row, column) => {
    board.selectSquare(row, column, getActivePlayer().symbol);

    const winner = checkWinner();

    if (winner !== undefined) {
      printNewRound();
      printWinner(winner);
      return;
    }

    round++;
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound };
}

const game = GameController();
