let players = ['x', 'o'];
let activePlayer = 0;
let board;

// функция для создания в массиве массивов
function createField(size) {
  // Создаем пустой массив для хранения поля
  let field = [];
  
  for (let i = 0; i < size; i++) {
    field[i] = []; // Создаем строку массива
    for (let j = 0; j < size; j++) {
      field[i][j] = null; 
    }
  }
  return field;
}

// начало игры с определением размера поля
function startGame() {
  let fieldSize;
  while (fieldSize == '' || fieldSize == null || isNaN(fieldSize) || fieldSize < 3 || fieldSize > 10) {
    fieldSize = +prompt("Введите число, которое будет определять размер поля");
  }
  board = createField(fieldSize);

  renderBoard(board);
  console.log(board);

  activePlayer = 0;
}

// процесс игры
function click(row, column) {
  // определяем активного игрока
  board[row][column] = players[activePlayer];

  let rowMove = 0;
  let columnMove = 0;
  let diagonalMove1 = 0;
  let diagonalMove2 = 0;

  
  // подсчет ходов, сделанные активным игроком
  for (let i = 0; i < board.length; i++) {
    if (board[row][i] === players[activePlayer]) { //значение текущей строки и любого столбца
      rowMove += 1;
    } if (board[i][column] === players[activePlayer]) { //значение текущего столбца и любой строки
      columnMove += 1;
    } if (board[i][i] === players[activePlayer]) { // значение на одной из диагоналей;
      diagonalMove1 += 1;
    } if (board[i][board.length - 1 - i] === players[activePlayer]) { //значение на другой диагонали
      diagonalMove2 += 1;
    }
  }

  // проверка выигрыша
  if (rowMove === board.length || columnMove === board.length || diagonalMove1 === board.length || diagonalMove2 === board.length) {
    showWinner(activePlayer);
  }   

  // проверка заполненности поля 
  function isFieldFilled(field) {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (!field[i][j]) {
          return false; // Если найдена пустая ячейка, то поле не заполнено
        }
      }
    }
    showGameDraw(); // Поле полностью заполнено, выводим сообщение о ничье
  }
  isFieldFilled(board);
 
  //смена активного игрока
  activePlayer = 1 - activePlayer;

  //отрисовка поля
  renderBoard(board);
}


 