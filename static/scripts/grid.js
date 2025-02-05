import { getCellsDim, canvas } from './util.js';
import { scale } from './zoom.js';

/**
 * @type {HTMLDivElement}
 */
const select = /** @type {HTMLDivElement} */ (
    document.getElementById('_grid_select')
);

/**
 * @type {HTMLDivElement}
 */
const coordDisplay = /** @type {HTMLDivElement} */ (
    document.getElementById('_coord_display')
);

/**
 * @type number
 */
const CLICK_THRESHOLD = 200;

/**
 * @type number[]
 */
let cellsDim = [-1, -1];

/**
 * @type number[]
 */
let currentCell = [-1, -1];

/**
 * @type number[]
 */
let lastMousePos = [-1, -1];

/**
 * number
 */
let clickDownTime = 0;

/**
 * number
 */
let zoomCounter = 0;

function handleMouseMove(event = null) {
    if (event) {
        lastMousePos = [event.clientX, event.clientY];
    }

    if (zoomCounter) {
        return;
    }

    const { left, top, width, height } = canvas.getBoundingClientRect();
    const [mouseX, mouseY] = [lastMousePos[0] - left, lastMousePos[1] - top];

    currentCell = [
        Math.floor((mouseX / width) * cellsDim[0]),
        Math.floor((mouseY / height) * cellsDim[1]),
    ];

    const [newX, newY] = [
        left + currentCell[0] * scale,
        top + currentCell[1] * scale,
    ];

    coordDisplay.innerHTML = currentCell;
    select.style.transform = `translate(${newX}px, ${newY}px)`;
    select.style.width = select.style.height = `${scale}px`;
}

function handleMouseDown() {
    clickDownTime = Date.now();
}

function handleMouseUp() {
    if (Date.now() - clickDownTime < CLICK_THRESHOLD) {
        //const colorSelect = document.getElementById("_color_select");
        const colorSelect = document.querySelector(
            'input[name="_color_select"]:checked',
        ).value;
        console.log(colorSelect);
        if (colorSelect) {
            fetch(`/_cells/${currentCell[0]}-${currentCell[1]}-${colorSelect}`);
        }
    }
}

function handleWheel(event) {
    zoomCounter++;
    setTimeout(() => {
        zoomCounter--;
    }, 40);
}

export async function initGrid() {
    cellsDim = await getCellsDim();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    setInterval(() => {
        handleMouseMove();
    }, 10);
}
