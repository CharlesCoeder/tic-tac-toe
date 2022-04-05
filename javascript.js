const gameBoard = (() => {
    const board = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

    return {board};
})();

function playerFactory(){

}

const displayController = (() => {

})();

// Creates grid HTML elements
const grid = document.querySelector('.grid');
for (let i = 0; i < 9; i++){
    const gridSpace = document.createElement('div');
    gridSpace.classList.add('gridspace');
    const value = document.createElement('div');
    gridSpace.appendChild(value);
    grid.appendChild(gridSpace);
}