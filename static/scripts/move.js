import { scale } from './zoom.js'

let transform = [0.0, 0.0]
let lastMouseLocation = [0.0, 0.0]

function handleDown(event) {
    const element = document.getElementById('_canvas_move');
    transform[0] += 20.0;
    transform[1] += 20.0;
    //newScale = Math.max(1, Math.min(40, newScale));

    element.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
    //transform: translate(0px, 0px);
}
function handleDrag(event) {
    //console.log(event.buttons);
    if (event.buttons == 1) {
        transform[0] += event.movementX / scale;
        transform[1] += event.movementY / scale;
        const element = document.getElementById('_canvas_move');
        element.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
    }

    //transform: translate(0px, 0px);
    //console.log(scale);
}


export function initMove() {
    //document.getElementById('_canvas_move').addEventListener("mousedown", (event) => {
    //  handleDown(event);
    //});
    document.getElementById('_canvas_move').addEventListener("mousemove", (event) => {
        handleDrag(event);
    });
}