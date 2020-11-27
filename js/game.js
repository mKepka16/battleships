const initGameBox = () => {
    //DOM init
    const game = document.createElement('div');
    game.classList.add('game');

    const leftBar = document.createElement('div');
    leftBar.classList.add('warshipsSelect');

        let counter = 1;
        for(let i=4; i>0; i--) {
            for(let j=0; j<counter; j++) {
                const row = document.createElement('div');
                row.classList.add('row');
                row.setAttribute('data-length', i);

                for(let j=0; j<i; j++) {
                    const field = document.createElement('div');
                    field.classList.add('field');
                    row.appendChild(field);
                }

                leftBar.appendChild(row);
            }
            counter++;
        }
    game.appendChild(leftBar);
    document.body.prepend(game);
}

const startGame = () => {
    // .game div init
    initGameBox();

    //creating player board
    initBoard(playerBoard);
    renderVirtualBoard(playerBoard, 'playerBoard');

    //creating enemy board
    initBoard(enemyBoard);
    placeRandomWarships(enemyBoard);
    renderVirtualBoard(enemyBoard, 'enemyBoard');

    //set up turn
    setSetUpTurn();
    giveFieldsEvents();
};

startGame();

const resetGame = () => {
    const gameBox = document.querySelector('.game');
    document.body.removeChild(gameBox);

    enemyBoard = [];
    playerBoard = [];
    choseTurn = true;
    isDirectionVertical = true;
    chosenWarship = 4;
    fieldType = 'badPlace';
    lastElement = null;
    winner = null;
    turn = 'player';

    startGame();
}

function endInitalGame() {
    removeFieldsEvents();
    startMidGameButtonInit();
    console.log(playerBoard);
}

function startMidGame(e) {
    console.log("Mid game started!");
    e.target.parentNode.removeChild(e.target);
    addShotEvents();
    addPlayersBoardAlert();
}
function finishGame() {
    alert(`Koniec gry. Wygrał ${winner}`);

    const enemyBoardDOM = document.querySelector('.enemyBoard');

    [...enemyBoardDOM.children].forEach(fieldDOM => {
        const [x, y] = getFieldCords(fieldDOM);

        if(enemyBoard[y][x] == 1 || enemyBoard[y][x] == 5) fieldDOM.classList.add('warship');
    });

    setTimeout(resetGame, 5000);
}