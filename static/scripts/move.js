import { mover } from './util.js';

/**
 * number[]
 */
let transform = [0.0, 0.0];

/**
 * @param {number} dx
 * @param {number} dy
 */
export function moveCanvas(dx, dy) {
    transform[0] += dx;
    transform[1] += dy;
    mover.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
}

/**
 * @param {MouseEvent} e
 */
function handleMove(e) {
    //console.log(event.buttons);
    if (e.buttons == 1) {
        moveCanvas(e.movementX, e.movementY);
    }
}

export function initMove() {
    moveCanvas(
        (window.innerWidth - mover.clientWidth) / 2,
        (window.innerHeight - mover.clientHeight) / 2,
    );
    mover.addEventListener('mousemove', handleMove);
}
