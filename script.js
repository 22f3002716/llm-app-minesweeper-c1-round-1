const GRID_SIZE = 8;
const NUM_MINES = 10;

let board = [];
let game_over = false;
let revealed_count = 0;

const gridContainer = document.getElementById('minesweeper-grid');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

function createBoard() {
    board = Array(GRID_SIZE).fill(null).map(() => 
        Array(GRID_SIZE).fill(null).map(() => ({
            isMine: false,
            count: 0,
            isRevealed: false,
            element: null
        }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);
        if (!board[r][c].isMine) {
            board[r][c].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate adjacent mine counts
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (!board[r][c].isMine) {
                let mineCount = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue; // Skip self
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && board[nr][nc].isMine) {
                            mineCount++;
                        }
                    }
                }
                board[r][c].count = mineCount;
            }
        }
    }
}

function renderBoard() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 30px)`;

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            cellElement.addEventListener('click', () => handleClick(r, c));

            board[r][c].element = cellElement;
            gridContainer.appendChild(cellElement);
        }
    }
}

function handleClick(r, c) {
    if (game_over || board[r][c].isRevealed) {
        return;
    }

    const cell = board[r][c];

    if (cell.isMine) {
        revealAllMines();
        messageDisplay.textContent = 'Game Over! You hit a mine. 💣';
        game_over = true;
        cell.element.classList.add('mine');
        cell.element.textContent = '💣';
        return;
    }

    // Not a mine, proceed with revealing
    revealCell(r, c);

    checkWinCondition();
}

// Recursive function to reveal cells
function revealCell(r, c) {
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return; // Out of bounds
    const cell = board[r][c];

    if (cell.isRevealed || cell.isMine) {
        return; // Already revealed or is a mine
    }

    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    revealed_count++;

    if (cell.count > 0) {
        cell.element.textContent = cell.count;
        cell.element.classList.add(`count-${cell.count}`);
    } else {
        // If count is 0, recursively reveal neighbors
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                revealCell(r + dr, c + dc);
            }
        }
    }
}

function revealAllMines() {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = board[r][c];
            if (cell.isMine) {
                cell.element.classList.add('mine');
                if (!cell.isRevealed) { // Only set content if not already revealed by click
                    cell.element.textContent = '💣';
                }
            }
        }
    }
}

function checkWinCondition() {
    if (revealed_count === (GRID_SIZE * GRID_SIZE) - NUM_MINES) {
        messageDisplay.textContent = 'Congratulations! You won! 🎉';
        game_over = true;
        revealAllMines(); // Optionally reveal mines on win
    }
}

function initializeGame() {
    game_over = false;
    revealed_count = 0;
    messageDisplay.textContent = '';
    createBoard();
    renderBoard();
}

document.addEventListener('DOMContentLoaded', initializeGame);
resetButton.addEventListener('click', initializeGame);
