const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    return {board};
})();

function playerFactory(char){
    const character = char;

    function selectPiece(index){
        gameBoard.board[index] = character;
    }

    return {selectPiece};
}

const displayController = (() => {
    function updateDisplay(){
        for (let i = 0; i < 9; i++){
            gridElements[i].textContent = gameBoard.board[i];
        };
    }

    return {updateDisplay};
})();

const gameMaster = (() => {

    const player1 = new playerFactory("x");
    const player2 = new playerFactory("o");

    const players = {player1, player2};
    
    currentPlayer = 1;

    function switchPlayer(){
        gameMaster.currentPlayer == 1 ? gameMaster.currentPlayer = 2 : gameMaster.currentPlayer = 1;
    }

    return {currentPlayer, switchPlayer, players};
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
        gameMaster.players['player'+gameMaster.currentPlayer].selectPiece(element.dataset.index);
        gameMaster.switchPlayer();
        displayController.updateDisplay();
    });
});

