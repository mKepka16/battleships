const initBoard = board => {
    for(let i=0; i<BOARD_SIZE+2; i++) {
        const tempArray = [];
        for(let j=0; j<BOARD_SIZE+2; j++) {
            const condition = j == 0 || j == BOARD_SIZE+1 || i == 0 || i == BOARD_SIZE+1;
            tempArray.push(condition ? 2 : 0);
        }
        board.push(tempArray);
    }

}


const isFieldEmpty = (x, y, board) => {
    for(let i=x-1; i<=x+1; i++) {
        for(let j=y-1; j<=y+1; j++) {
            if(board[i][j] == 1)
                return false;
        }
    }
    return true;
}


const placeRandomWarships = board => {
    WARSHIPS.forEach(warship => {
        let goodPlace = true;
        let goodFields = [];
        let direction = '';

        do {
            goodFields = [];
            goodPlace = true;
            const randomX = Math.floor(Math.random() * 10) + 1;
            const randomY = Math.floor(Math.random() * 10) + 1;
            direction = Math.floor(Math.random() * 2) === 0 ? 'vertical' : 'horizontal';


            if(direction == 'vertical') {
                for(let i=randomY; i<randomY+warship; i++) {
                    if(board[randomX][i] == 2) {
                        goodPlace = false;
                        break;
                    }
                    if(!isFieldEmpty(randomX, i, board)) {
                        goodPlace = false;
                        break;
                    }
                    goodFields.push([randomX, i]);
                }
            }
            else if(direction == 'horizontal') {
                for(let i=randomX; i<randomX+warship; i++) {
                    if(board[i][randomY] == 2) {
                        goodPlace = false;
                        break;
                    }
                    if(!isFieldEmpty(i, randomY, board)) {
                        goodPlace = false;
                        break;
                    }
                    goodFields.push([i, randomY]);
                }
            }

        } while(!goodPlace);

        for(let x = goodFields[0][0]-1; x <= goodFields[goodFields.length-1][0]+1; x++) {
            for(let y = goodFields[0][1]-1; y <= goodFields[goodFields.length-1][1]+1; y++) {
                if(board[x][y] != 2) board[x][y] = 3;
            }
        }

        goodFields.forEach(([x, y]) => {
            board[x][y] = 1;
        });



    });
}


const renderVirtualBoard = (board, name) => {
    const boardDOM = document.createElement('div');
    boardDOM.classList.add('board');
    boardDOM.classList.add(name);

    for(let y=1; y<=BOARD_SIZE; y++) {
        for(let x=1; x<=BOARD_SIZE; x++) {
            //Field init
            const fieldDOM = document.createElement('div');

            //Cordinates
            fieldDOM.setAttribute('data-x', x);
            fieldDOM.setAttribute('data-y', y);

            fieldDOM.classList.add('field');
            // if(board[y][x] == 1) fieldDOM.classList.add('warship');
            // else if(board[y][x] == 3) fieldDOM.classList.add('reserved');

            boardDOM.appendChild(fieldDOM);
        }
    }
    const boardTitleDOM = document.createElement('div');
    boardTitleDOM.classList.add('board-title');
    boardTitleDOM.textContent = name == 'playerBoard' ? 'Gracz' : 'Komputer';

    const boardWithTitleDOM = document.createElement('div');
    boardWithTitleDOM.classList.add('board-with-title');

    boardWithTitleDOM.prepend(boardDOM);
    boardWithTitleDOM.prepend(boardTitleDOM);

    document.querySelector('.game').appendChild(boardWithTitleDOM);
}

const findField = (x, y, boardName='playerBoard') => document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
const getFieldCords = field => [field.getAttribute('data-x'), field.getAttribute('data-y')];

const addWarship = (x, y, length, isVertical = true) => {
    const xEnd = x + (isVertical ? 1 : length);
    const yEnd = y + (isVertical ? length : 1);


    for(let i=x-1; i<=xEnd; i++) {
        for(let j=y-1; j<=yEnd; j++) {
            if(playerBoard[j][i] == 0) playerBoard[j][i] = 3;
        }
    }

    for(let i=x; i<=xEnd-1; i++) {
        for(let j=y; j<=yEnd-1; j++) {
            playerBoard[j][i] = 1;
            const fieldDOM = findField(i, j);
            fieldDOM.classList.add('warship');
        }
    }
}


const checkWarshipPlace = (x, y, length, isVertical = true) => {
    const xEnd = x + (isVertical ? 1 : length);
    const yEnd = y + (isVertical ? length : 1);

    let goodPlace = true;

    for(let i=x; i<=xEnd-1; i++) {
        for(let j=y; j<=yEnd-1; j++) {
            if(playerBoard[j][i] != 0) goodPlace = false;
        }
    }

    return goodPlace;
}