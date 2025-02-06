import { mover } from './util.js';

/**
 * number[]
 */
let transform = [0.0, 0.0];

export function moveCanvas(dx, dy) {
    transform[0] += dx;
    transform[1] += dy;
    mover.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
}

function handleMove(event) {
    //console.log(event.buttons);
    if (event.buttons == 1) {
        moveCanvas(event.movementX, event.movementY);
    }
}

export function initMove() {
    mover.addEventListener('mousemove', handleMove);
}
