const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ROWS = 15;
const COLS = 10;
const BLOCK_SIZE = 10;

let board = [];
for (let r = 0; r < ROWS; r++) {
  board[r] = [];
  for (let c = 0; c < COLS; c++) {
    board[r][c] = 0;
  }
}

let currentPiece = null;
let currentPieceRow = 0;
let currentPieceCol = 0;

const pieces = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 2, 0],
    [2, 2, 2],
  ],
  [
    [0, 3, 3],
    [3, 3, 0],
  ],
  [
    [4, 4, 0],
    [0, 4, 4],
  ],
  [
    [0, 5, 0],
    [5, 5, 5],
  ],
  [
    [6, 0, 0],
    [6, 6, 6],
  ],
  [
    [0, 0, 7],
    [7, 7, 7],
  ],
];

function getRandomPiece() {
  const index = Math.floor(Math.random() * pieces.length);
  const piece = pieces[index];
  return piece;
}

function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = "white";
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c]) {
        drawBlock(c, r, "red");
      } else {
        drawBlock(c, r, "black");
      }
    }
  }
}

function drawCurrentPiece() {
  const piece = currentPiece;
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c]) {
        drawBlock(currentPieceCol + c, currentPieceRow + r, "blue");
      }
    }
  }
}

function movePieceDown() {
  currentPieceRow++;
  if (hasCollision()) {
    currentPieceRow--;
    addPieceToBoard();
    currentPiece = getRandomPiece();
    currentPieceRow = 0;
    currentPieceCol = 3;
    if (hasCollision()) {
      alert("Game Over!");
    }
  }
}

function hasCollision() {
  const piece = currentPiece;
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c]) {
        const row = currentPieceRow + r;
        const col = currentPieceCol + c;
        if (
          row < 0 ||
          row >= ROWS ||
          col < 0 ||
          col >= COLS ||
          board[row][col]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function addPieceToBoard() {
  const piece = currentPiece;
  for (let r = 0; r < piece.length; r++) {
    for (let c = 0; c < piece[r].length; c++) {
      if (piece[r][c]) {
        const row = currentPieceRow + r;
        const col = currentPieceCol + c;
        board[row][col] = piece[r][c];
      }
    }
  }
}

function clearRows() {
  for (let r = 0; r < ROWS; r++) {
    let isFull = true;
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === 0) {
        isFull = false;
        break;
      }
    }
    if (isFull) {
      for (let y = r; y > 0; y--) {
        for (let c = 0; c < COLS; c++) {
          board[y][c] = board[y - 1][c];
        }
      }
      for (let c = 0; c < COLS; c++) {
        board[0][c] = 0;
      }
    }
  }
}

function draw() {
  drawBoard();
  drawCurrentPiece();
}

function update() {
  movePieceDown();
  clearRows();
}

function loop() {
  update();
  draw();
}

currentPiece = getRandomPiece();
currentPieceRow = 0;
currentPieceCol = 3;

setInterval(loop, 500);
