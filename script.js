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
        if (BOARD[row][column] != "") return;
        
        BOARD[row][column] = token;
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