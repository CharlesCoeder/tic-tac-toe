const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    return {board};
})();

function playerFactory(char, playerName){
    const character = char;
    const name = playerName;

    function selectPiece(index){
        gameBoard.board[index] = character;
    }

    return {selectPiece, name};
}

const displayController = (() => {
    const gameOver = document.querySelector('.gameOver');
    const winner = document.querySelector('.winner');

    function updateDisplay(){
        for (let i = 0; i < 9; i++){
            gridElements[i].textContent = gameBoard.board[i];
        };
    }

    function showWinner(boolean){
        gameOver.setAttribute('style', 'visibility: visible');
        if (boolean == true){
            winner.textContent = "Winner:" + "\nPlayer " + gameMaster.currentPlayer;
        }
        if (boolean == false){
            winner.textContent = "It's a Tie!";
        }
    }

    return {updateDisplay, showWinner};
})();

const gameMaster = (() => {

    const player1 = new playerFactory("X", "Player One");
    const player2 = new playerFactory("O", "Player Two");

    const players = {player1, player2};
    
    currentPlayer = 1;

    function switchPlayer(){
        gameMaster.currentPlayer == 1 ? gameMaster.currentPlayer = 2 : gameMaster.currentPlayer = 1;
    }

    function checkIfWin(){
        // Rows
        for (let i = 0; i < 7; i += 3){
            if ((gameBoard.board[i] == gameBoard.board[i + 1]) && (gameBoard.board[i] == gameBoard.board[i + 2]) && (gameBoard.board[i] != "")){
                return true;
            }
        }

        // Columns
        for (let i = 0; i < 3; i++){
            if ((gameBoard.board[i] == gameBoard.board[i + 3]) && (gameBoard.board[i] == gameBoard.board[i + 6]) && (gameBoard.board[i] != "")){
                return true;
            }
        }

        // Diagonals
        if ((gameBoard.board[0] == gameBoard.board[4]) && (gameBoard.board[0] == gameBoard.board[8]) && (gameBoard.board[0] != "")){
            return true;
        }
        if ((gameBoard.board[2] == gameBoard.board[4]) && (gameBoard.board[2] == gameBoard.board[6]) && (gameBoard.board[2] != "")){
            return true;
        }

        // Tie
        for (let i = 0; i < 9; i++){
            if (gameBoard.board[i] == ""){
                return;
            }
        }
        return false;
    }

    return {currentPlayer, switchPlayer, players, checkIfWin};
})();

// Creates grid HTML elements
const grid = document.querySelector('.grid');
for (let i = 0; i < 9; i++){
    const gridSpace = document.createElement('div');
    gridSpace.classList.add('gridspace');
    gridSpace.dataset.index = i;
    const value = document.createElement('div');
    gridSpace.appendChild(value);
    grid.appendChild(gridSpace);
}

// Event listener for player selection
const gridElements = document.querySelectorAll('.gridspace');
gridElements.forEach(element => {
    element.addEventListener('click', function(){
        if (element.textContent == ""){
            gameMaster.players['player'+gameMaster.currentPlayer].selectPiece(element.dataset.index);
            if (gameMaster.checkIfWin() == true){
                console.log(gameMaster.players['player'+gameMaster.currentPlayer].name);
                displayController.showWinner(true);
            }
            else if (gameMaster.checkIfWin() == false){
                console.log("TIE");
                displayController.showWinner(false);
            }
            gameMaster.switchPlayer();
            displayController.updateDisplay();
        }
    });
});

const resetBtn = document.querySelector('.reset');
const gameOver = document.querySelector('.gameOver');
resetBtn.addEventListener('click', () => {
    gameOver.setAttribute('style', 'visibility: hidden');
   for (let i = 0; i < 9; i++){
       gameBoard.board[i] = "";
   }
   displayController.updateDisplay();
   gameMaster.currentPlayer = 1;
});

