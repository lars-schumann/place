import { getCellsDim } from './util.js';
import { scale } from './zoom.js';

const grid = document.getElementById('_canvas_cell');
const select = document.getElementById('_grid_select');
const coordDisplay = document.getElementById('_coord_display');

let cellsDim;
let currentCell = [-1, -1];
let lastMousePos = [-1, -1];
let clickDownTime = 0;
let zoomCounter = 0;
const clickThreshold = 200;

function handleMouseMove(event = null) {
    if (event) {
        lastMousePos = [event.clientX, event.clientY];
    }

    if (zoomCounter) {
        return;
    }

    const { left, top, width, height } = grid.getBoundingClientRect();
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
    if (Date.now() - clickDownTime < clickThreshold) {
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

    grid.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mousedown', handleMouseDown);
    grid.addEventListener('mouseup', handleMouseUp);
    grid.addEventListener('wheel', handleWheel);

    setInterval(() => {
        handleMouseMove();
    }, 10);
}
