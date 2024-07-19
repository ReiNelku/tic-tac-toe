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
    if (board[row][column].getSymbol() !== null) {
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
  let symbol = null;

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

  const printTie = () => {
    console.log("This game is a Tie!");
  };

  const playRound = (row, column) => {
    board.selectSquare(row, column, getActivePlayer().symbol);

    const winner = checkWinner();

    if (winner === null) {
      printTie();
      return;
    } else if (winner !== undefined) {
      printNewRound();
      printWinner(winner);
      return;
    }

    round++;
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard };
}

(function ScreenController() {
  const showGameStartModal = () => {
    const gameStartModal = document.querySelector(".start-game");
    gameStartModal.showModal();

    return gameStartModal;
  };

  const names = [];
  let game = null;

  const showPlayerNames = () => {
    const playerXNameBox = document.querySelector(".player.x h2");
    const playerONameBox = document.querySelector(".player.o h2");

    if (names[0]) {
      playerXNameBox.textContent = `✕: ${names[0]}`;
    }
    if (names[1]) {
      playerONameBox.textContent = `◯: ${names[1]}`;
    }
  };

  const startGame = () => {
    game = GameController(...names);

    showPlayerNames();
    updateScreen();
  };

  const getPlayerNames = () => {
    const modal = showGameStartModal();

    const startGameBtn = document.querySelector(".start-game-btn");

    function clickHandlerGameStart(e) {
      e.preventDefault();

      const playerXName = document.querySelector("#x-name");
      const playerOName = document.querySelector("#o-name");

      names[0] = playerXName.value;
      names[1] = playerOName.value;

      modal.close();
      startGame();
    }
    startGameBtn.addEventListener("click", clickHandlerGameStart);
  };

  getPlayerNames();
  const playerXNameBox = document.querySelector(".player.x");
  const playerONameBox = document.querySelector(".player.o");
  const boardDiv = document.querySelector(".board");

  const xSymbol = "✕";
  const oSymbol = "◯";

  function updateScreen() {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    switch (activePlayer.symbol) {
      case "X":
        playerONameBox.classList.remove("active");
        playerXNameBox.classList.add("active");
        break;
      case "O":
        playerXNameBox.classList.remove("active");
        playerONameBox.classList.add("active");
        break;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        switch (cell.getSymbol()) {
          case "X":
            cellButton.textContent = xSymbol;
            cellButton.classList.add("x");
            cellButton.disabled = true;
            break;
          case "O":
            cellButton.textContent = oSymbol;
            cellButton.classList.add("o");
            cellButton.disabled = true;
            break;
        }
        boardDiv.appendChild(cellButton);
      });
    });
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
})();
