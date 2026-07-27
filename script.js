// containers

const container_actions = document.querySelector('.container_grid_actions');
const container_grid = document.querySelector('.container_grid_elements');
const main_container = document.querySelector('.main_container_sketch');
// actinos

const clean_btn = document.querySelector('.clean_btn')
const grid_squares = document.querySelector('.grid_size');

// grid initial values
const calculate_board_size = () => {
    const declaration = document.styleSheets[0].cssRules[0].style;
    const value = declaration.getPropertyValue('--grid-size');
    return parseFloat(value);
};


const board_size = calculate_board_size();
const board_squares = grid_squares.value;
let isPainting = false;

function determinateInitialSize(board_inline_size, squares) {
    return board_inline_size / squares
}

function normalizeToPx(value) {
    return String(value).concat('px');
}

// crear y agregar celdas al contenedor del grid
function createGridCell(inline_size, block_size) {
    let cell = document.createElement('div');
    cell.classList.add('grid_cell');
    setInlineSizeCell(cell, inline_size);
    setBlockSizeCell(cell, block_size);
    setAttachPaintEvents(cell);
    return cell;
}

function setInlineSizeCell(cell, inline_size) {
    cell.style.setProperty('--cell-width', normalizeToPx(inline_size));
}

function setBlockSizeCell(cell, block_size) {
    cell.style.setProperty('--cell-height', normalizeToPx(block_size));
}

function appendGridCell(board, cell) {
    board.appendChild(cell);
}

function setAttachPaintEvents(cell) {
    cell.addEventListener('mousedown', () => {
        isPainting = true;
    });

    cell.addEventListener('mouseenter', () => {
        if (isPainting) {
            cell.classList.add('grid_cell--painted');
        }
    });

    cell.addEventListener('mouseup', () => {
        isPainting = false;
    });
}

// actions

function cleanGridBoard() {
    const cells = document.querySelectorAll('.grid_cell');

    cells.forEach(cell => {
        cell.classList.remove('grid_cell--painted');
    });
}

clean_btn.addEventListener('click', cleanGridBoard);

// board

function buildGridBoard(board, board_size, board_squares) {

    const cell_inline_size = determinateInitialSize(board_size, board_squares);
    const cell_block_size = determinateInitialSize(board_size, board_squares);

    for (let i = 0; i < board_squares; i++) {
        for (let k = 0; k < board_squares; k++) {
            let cell = createGridCell(cell_inline_size, cell_block_size);
            appendGridCell(board, cell);
        }
    }
}



buildGridBoard(container_grid, board_size, board_squares);
