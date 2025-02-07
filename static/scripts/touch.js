import { mover, zoomer } from './util.js';
import { moveCanvas } from './move.js';
import { handleMouseMove } from './grid.js';

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
    const [touchX, touchY] = [
        e.touches.item(0).clientX,
        e.touches.item(0).clientY,
    ];
    const dx = touchX - oldTouches.item(0).clientX;
    const dy = touchY - oldTouches.item(0).clientY;

    moveCanvas(dx, dy);
    oldTouches = e.touches;

    const fakeMouseMove = new MouseEvent('mousemove', {
        clientX: touchX,
        clientY: touchY,
    });

    handleMouseMove(fakeMouseMove);
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

function handleTouchEnd() {
    oldTouches = null;
}

export function initTouch() {
    zoomer.addEventListener('touchmove', handleTouchMove);
    zoomer.addEventListener('touchend', handleTouchEnd);
    zoomer.addEventListener('touchcancel', handleTouchEnd);
}
