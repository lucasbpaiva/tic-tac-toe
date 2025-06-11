// The Gameboard represents the state of the board
// Each square holds a Cell (defined later)
// and we expose a placeToken method to be able to add tokens

function Gameboard() {
    const ROWS = 3;
    const COLUMNS = 3;
    const BOARD = [];

    // Create a 2d array that will represent the state of the game board
    for (let i = 0; i < ROWS; i++) {
        BOARD[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            BOARD[i][j] = "";
        }
    }

    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => BOARD;

    const placeToken = (row, column, token) => {
        // prevent placing token on already filled square
        if (BOARD[row][column] != "") return;

        BOARD[row][column] = token;
    };

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
        console.table(BOARD);
    };

    return {getBoard, placeToken, printBoard};
}

// The GameController will be responsible for controlling the 
// flow and state of the game's turns, as well as whether
// anybody has won the game

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const BOARD = board.getBoard();
    let gameOver = false;

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer == players[0] ? players[1] : players[0]);
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        //place token of current player
        console.log(`Placing ${getActivePlayer().name}'s token on the board...`);
        board.placeToken(row, column, getActivePlayer().token);

        const lines = [
            BOARD[0], //row1
            BOARD[1], //row2
            BOARD[2], //row3
            BOARD.map(row => row[0]), //col1
            BOARD.map(row => row[1]), //col2
            BOARD.map(row => row[2]), //col3
            BOARD.map((row, i) => row[i]), //diagonal
            BOARD.map((row, i) => row.at(-i-1)) //anti diagonal
        ]

        //One of the players wins
        lines.forEach(line => {
            if (line.every(token => token == getActivePlayer().token)) {
                console.log(`${getActivePlayer().name} wins!`);
                board.printBoard();
                gameOver = true;
            }
        });

        //Tie
        if (!gameOver) {
            let filledRows = [];

            BOARD.forEach(row => {
                let numOfEmptyStrings = row.filter(token => token == "").length;
                let filled = numOfEmptyStrings == 0;
                filledRows.push(filled);
            });

            if (filledRows.every(item => item == true)) {
                console.log("It's a tie!");
                board.printBoard();
                gameOver = true;
            }
        }

        //Switch player turn
        if (!gameOver) {
            switchPlayerTurn();
            printNewRound();
        }
    };

    const gameFinished = () => gameOver;

    //Initial play game message
    printNewRound();

    return {getActivePlayer, playRound, getBoard: board.getBoard, gameFinished};
}

function ScreenController() {
    const game = GameController();
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector(".restart-button");

    restartButton.addEventListener("click", () => {
        cells.forEach(cell => cell.textContent = "");
        const board = game.getBoard();
        //change all values of board to ""
    });

    //add event listener for the cells
    cells.forEach(cell => {
        cell.addEventListener("click", (event) => {
            if (cell.textContent == "" && !game.gameFinished()) {
                cell.textContent = game.getActivePlayer().token;
                game.playRound(event.target.dataset.row, event.target.dataset.column);
            }
        });
    });
}

ScreenController();