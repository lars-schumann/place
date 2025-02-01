import { getCellsDim } from "./util.js";
import { scale } from "./zoom.js";

const grid = document.getElementById('_canvas_cell');

const select = document.getElementById('_grid_select');
let cellsDim;
export let currentCell = [-1, -1];
const transform = [0.0, 0.0];
let lastKnownMousePos = [0.0, 0.0];

export function handleMouse(event) {

    if (event != 0) {
        lastKnownMousePos = [event.clientX, event.clientY];
    }


    const gridRect = grid.getBoundingClientRect();

    const mouseX = lastKnownMousePos[0] - gridRect.left;
    const mouseY = lastKnownMousePos[1] - gridRect.top;

    const xPercent = mouseX / gridRect.width;
    const yPercent = mouseY / gridRect.height;

    const cellX = Math.floor(xPercent * cellsDim[0]);
    const cellY = Math.floor(yPercent * cellsDim[1]);

    currentCell = [cellX, cellY];


    transform[0] = gridRect.left + currentCell[0] * scale;
    transform[1] = gridRect.top + currentCell[1] * scale;

    select.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
    select.style.width = `${scale}px`;
    select.style.height = `${scale}px`;
    //select.style.opacity = `${scale * scale / (64 * 64)}`;
}

function updateCell() {

}
export async function initGrid() {
    cellsDim = await getCellsDim();

    grid.addEventListener("mousemove", handleMouse);
    setInterval(() => handleMouse(0), 1);
    //essgrid.addEventListener("wheel", handleMouse);
}
