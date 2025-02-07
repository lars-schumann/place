import { canvas } from './util.js';
import { scale, zoomCounter } from './zoom.js';
import { cellData } from './data.js';
import { forceRefreshCanvas } from './draw.js';

const select = /** @type {HTMLDivElement} */ (
    document.getElementById('_grid_select')
);

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
let currentDisplayedCell = [-1, -1];

/**
 * @type number[]
 */
let lastMousePos = [-1, -1];

/**
 * number
 */
let clickDuration = 0;

/**
 * @param {MouseEvent | null}  e
 */
export function handleMouseMove(e) {
    if (e != null) {
        lastMousePos = [e.clientX, e.clientY];
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

    select.style.transform = `translate(${newX}px, ${newY}px)`;
    select.style.width = select.style.height = `${scale}px`;

    if (
        currentDisplayedCell[0] === currentCell[0] &&
        currentDisplayedCell[1] === currentCell[1]
    ) {
        return;
    }

    currentDisplayedCell = [currentCell[0], currentCell[1]];
    coordDisplay.innerHTML = currentDisplayedCell.toString();
}

function handleMouseDown() {
    clickDuration = Date.now();
}

function handleMouseUp() {
    if (Date.now() - clickDuration < CLICK_THRESHOLD) {
        /**
         * @type {HTMLInputElement} | null
         */
        const colorSelected = /** @type {HTMLInputElement} | null */ (
            document.querySelector('input[name="_color_select"]:checked')
        );
        if (colorSelected == null) {
            return;
        }
        fetch(
            `/_cells/${currentCell[0]}-${currentCell[1]}-${colorSelected.value}`,
        );

        //optimistic cell placement:
        cellData[currentCell[0]][currentCell[1]] = parseInt(
            colorSelected.value,
        );
        forceRefreshCanvas();
    }
}

export async function initGrid() {
    cellsDim = await (await fetch('/_cells/dim')).json();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    setInterval(() => {
        handleMouseMove(null);
    }, 10);
}
