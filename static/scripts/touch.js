import { mover, zoomer } from './util.js';
import { moveCanvas } from './move.js';

/**
 * @type TouchList | null
 */
let oldTouches;

/**
 * @param {TouchEvent} e
 */
function handleTouchMove(e) {
    switch (e.touches.length) {
        case 1:
            handleOneTouch(e);
            break;
        case 2:
            handleTwoTouch(e);
            break;
        default:
            console.log('nope');
            oldTouches = null;
            break;
    }
}

/**
 * @param {TouchEvent} e
 */
function handleOneTouch(e) {
    if (oldTouches == null || oldTouches.length == 2) {
        oldTouches = e.touches;
        return;
    }
    const dx = e.touches.item(0).clientX - oldTouches.item(0).clientX;
    const dy = e.touches.item(0).clientY - oldTouches.item(0).clientY;

    console.log('dx,dy: ', dx, dy);
    moveCanvas(dx, dy);
    oldTouches = e.touches;
}

/**
 * @param {TouchEvent} e
 */
function handleTwoTouch(e) {
    if (oldTouches == null || oldTouches.length == 1) {
        oldTouches = e.touches;
        return;
    }
}

export function initTouch() {
    zoomer.addEventListener('touchmove', handleTouchMove);
}
