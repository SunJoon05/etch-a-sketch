/*
 Seleccionar los contenedores que se van a usar a lo largo del programa.
*/
const container_actions = document.querySelector('.container_grid_actions');
const container_grid = document.querySelector('.container_grid_elements');
const main_container = document.querySelector('.main_container_sketch');
const color_picker = document.querySelector('.color_picker');

/*
 Acciones que tiene disponibles el usuario:
 Limpiar la cuadricula, seleccionar el tamaño, Seleccionar color
*/
const clean_btn = document.querySelector('.clean_btn')
const grid_squares = document.querySelector('.grid_size');

// Valores iniciales de la cuadricula
let board_size = calculate_board_size();
let board_squares = grid_squares.value;
let isPainting = false;
let color_selected = color_picker.value;

/*
 Escuchar los eventos de cambio de tamaño de la cuadricula 
*/
grid_squares.addEventListener('change', (event) => {
    let board = container_grid;
    let value = parseFloat(grid_squares.value);
    let min = parseFloat(grid_squares.min);
    let max = parseFloat(grid_squares.max);

    board.innerHTML = '';

    if (value > max) value = max;
    if (value < min) value = min;

    grid_squares.value = value;
    buildGridBoard(board, board_size, value);
});

// Actualizar el color seleccionado
color_picker.addEventListener('input', () => {
    color_selected = color_picker.value;
});

/* 
 Accede a la variable global --grid-size en la hoja de estilos y retorna los pixeles
*/
function calculate_board_size() {
    const declaration = document.styleSheets[0].cssRules[0].style;
    const value = declaration.getPropertyValue('--grid-size');
    return parseFloat(value);
}

/*
 Determina el tamaño y altura inicial de los elementos de la cuadricula
*/
function determinateInitialSize(board_inline_size, squares) {
    return board_inline_size / squares
}

// Normaliza un valor numerico a pixeles
function normalizeToPx(value) {
    return String(value).concat('px');
}

/*
 Crear las celdas con valores de ancho, alto y agregar los eventos a cada celda de la cuadricula
*/
function createGridCell(inline_size, block_size) {
    let cell = document.createElement('div');
    cell.classList.add('grid_cell');
    setInlineSizeCell(cell, inline_size);
    setBlockSizeCell(cell, block_size);
    setAttachPaintEvents(cell);
    return cell;
}

// Asignar un valor de ancho a la variable --cell-width
function setInlineSizeCell(cell, inline_size) {
    cell.style.setProperty('--cell-width', normalizeToPx(inline_size));
}

// Asignar un valor de alto a la variable --cell-height
function setBlockSizeCell(cell, block_size) {
    cell.style.setProperty('--cell-height', normalizeToPx(block_size));
}

// agregar las celdas a un contenedor principal
function appendGridCell(board, cell) {
    board.appendChild(cell);
}

/*
 Lógica para aplicar color a las celdas mediante una variable booleana isPainting
*/
function setAttachPaintEvents(cell) {

    cell.addEventListener('mousedown', () => {
        isPainting = true;
        cell.style.backgroundColor = color_selected;
    });

    cell.addEventListener('mouseenter', () => {
        if (isPainting) {
            cell.style.backgroundColor = color_selected;
        }
    });

    cell.addEventListener('mouseup', () => {
        isPainting = false;
    });
}

// Cambiar el color de todas las celdas a transparente
function cleanGridBoard() {
    const cells = document.querySelectorAll('.grid_cell');

    cells.forEach(cell => {
        cell.style.backgroundColor = 'transparent';
    });
}

clean_btn.addEventListener('click', cleanGridBoard);

/* 
 Construir la cuadricula con los datos iniciales por defecto: 
 - container -> <div class="container_grid_elements"><div>
 - size -> 700
 - squares -> 16
*/
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
