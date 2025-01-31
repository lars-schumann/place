import { setCanvasSize, fetchData } from "./util.js";
import { scale } from "./zoom.js";

var currentCell = [0, 0];
const grid = document.getElementById('_canvas_grid');
const select = document.getElementById('_grid_select');
let cellsDim;


let transform = [0.0, 0.0]

function handleMove(event) {


    const gridRect = grid.getBoundingClientRect();

    const mouseX = event.clientX - gridRect.left;
    const mouseY = event.clientY - gridRect.top;

    const gridWidth = gridRect.width;
    const gridHeight = gridRect.height;

    const xPercent = mouseX / gridWidth;
    const yPercent = mouseY / gridHeight;

    const cellX = Math.floor(xPercent * cellsDim[0]);
    const cellY = Math.floor(yPercent * cellsDim[1]);

    if (currentCell != [cellX, cellY]) {
        console.log(cellX, cellY);
        currentCell = [cellX, cellY];
        const ctx = grid.getContext('2d');

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';

        const x = currentCell[0];
        const y = currentCell[1];
        const size = 1;

        ctx.clearRect(0, 0, gridWidth, gridHeight);
        ctx.strokeRect(x, y, size, size);

        transform[0] = gridRect.left + cellX * scale;
        transform[1] = gridRect.top + cellY * scale;
        select.style.left = `${transform[0]}px`;
        select.style.top = `${transform[1]}px`;
        select.style.width = `${scale}px`;
        select.style.height = `${scale}px`;


        //transform: translate(0px, 0px);
        //height: 1px;
        //width: 1px;
    }

}

export async function initGrid() {
    cellsDim = await fetchData('/_cells/dim');
    await setCanvasSize(grid);

    const ctx = grid.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 20, 35);

    grid.addEventListener("mousemove", (event) => {
        handleMove(event);
    });
    //grid.addEventListener("wheel", (event) => {
    //    handleMove(event);
    //});


}