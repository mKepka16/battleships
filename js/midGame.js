const shotEnemy = (field) => {
  const [x, y] = getFieldCords(field);
  if (enemyBoard[y][x] == 5 || enemyBoard[y][x] == 6) {
    return null;
  } else if (enemyBoard[y][x] == 1) {
    field.innerHTML = '&#10005;';
    enemyBoard[y][x] = 5;
    return true;
  } else {
    field.innerHTML = '&#8226;';
    enemyBoard[y][x] = 6;
    return false;
  }
};

const shotPlayer = (field, x, y) => {
  if (playerBoard[y][x] == 5 || playerBoard[y][x] == 6) {
    return null;
  } else if (playerBoard[y][x] == 1) {
    field.innerHTML = '&#10005;';
    playerBoard[y][x] = 5;
    console.log('Trafiony');
    return true;
  } else {
    field.innerHTML = '&#8226;';
    playerBoard[y][x] = 6;
    console.log('Pudło');
    return false;
  }
};

const isGameFinished = (board) => {
  let ended = true;

  board.forEach((row) => {
    row.forEach((cell) => (ended = cell == 1 ? false : ended));
  });

  return ended;
};
// Computer turn

const computerTurn = () => {
  let x = null,
    y = null;
  let shotValue = null;

  while (true) {
    x = Math.floor(Math.random() * 10) + 1;
    y = Math.floor(Math.random() * 10) + 1;
    field = findField(x, y);
    shotValue = shotPlayer(field, x, y);

    if (shotValue !== null) break;
  }
  console.log(`X: ${x} Y: ${y}`);
  if (shotValue) {
    if (isGameFinished(playerBoard)) {
      winner = 'Computer';
      finishGame();
    } else setTimeout(computerTurn, COMPUTER_SPEED);
  } else {
    turn = 'player';
  }
};

// Player turn

const addShotEvents = () => {
  const fields = document.querySelectorAll('.enemyBoard .field');

  fields.forEach((field) => {
    field.addEventListener('click', () => {
      if (turn == 'computer') {
        alert('Wait for your turn!');
        return;
      }

      const shotValue = shotEnemy(field);
      if (shotValue === null) return;
      if (shotValue) {
        if (isGameFinished(enemyBoard)) {
          winner = 'Player';
          finishGame();
        }
      } else {
        turn = 'computer';
        setTimeout(computerTurn, COMPUTER_SPEED);
      }
    });
  });
};

// Add alert when clicked on player board

const addPlayersBoardAlert = () => {
  document
    .querySelector('.playerBoard')
    .addEventListener('click', () => alert('Player turn!'));
};
