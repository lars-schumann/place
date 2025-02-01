import { getCellsDim } from "./util.js";
import { scale } from "./zoom.js";

const grid = document.getElementById('_canvas_cell');
const select = document.getElementById('_grid_select');
let cellsDim;
export let currentCell = [-1, -1];
const transform = [0.0, 0.0];

export function handleMouse(event) {
    const gridRect = grid.getBoundingClientRect();
    const mouseX = event.clientX - gridRect.left;
    const mouseY = event.clientY - gridRect.top;

    const xPercent = mouseX / gridRect.width;
    const yPercent = mouseY / gridRect.height;

    const cellX = Math.floor(xPercent * cellsDim[0]);
    const cellY = Math.floor(yPercent * cellsDim[1]);

    if (currentCell[0] !== cellX || currentCell[1] !== cellY) {
        //console.log(cellX, cellY);
        currentCell = [cellX, cellY];

        transform[0] = gridRect.left + cellX * scale;
        transform[1] = gridRect.top + cellY * scale;

        select.style.left = `${transform[0]}px`;
        select.style.top = `${transform[1]}px`;
        select.style.width = `${scale}px`;
        select.style.height = `${scale}px`;
    }
}

export async function initGrid() {
    cellsDim = await getCellsDim();

    grid.addEventListener("mousemove", handleMouse);
    // grid.addEventListener("wheel", handleZoom);
}
