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
            BOARD[i][j] = [""];
        }
    }

    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => BOARD;

    const placeToken = (row, column, token) => {
        // prevent placing token on already filled square
        if (BOARD[row][column] != "") return "fail";

        BOARD[row][column] = token;
        return "success";
    };

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
        boardWithValues = BOARD.map(row => row.map(array => array[0]));
        console.table(boardWithValues);
    };

    return {getBoard, placeToken, printBoard};
}

// The GameController will be responsible for controlling the 
// flow and state of the game's turns, as well as whether
// anybody has won the game

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

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
        let play = board.placeToken(row, column, getActivePlayer().token);

        // This is where we would check for a winner and handle that logic,
        // such as a win message.

        //Switch player turn
        if (play == "success") switchPlayerTurn();
        printNewRound();
    };

    //Initial play game message
    printNewRound();

    return {getActivePlayer, playRound};
}

const game = GameController();