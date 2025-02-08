import { mover, zoomer } from './util.js';
import { moveCanvas } from './move.js';
import { handleMouseMove } from './grid.js';
import { handleWheel } from './zoom.js';

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

    const newTouch = /** @type Touch */ (e.touches.item(0)); //this cant be null here
    const [newTouchX, newTouchY] = [newTouch.clientX, newTouch.clientY];

    const oldTouch = /** @type Touch */ (oldTouches.item(0)); //this cant be null here
    const [oldTouchX, oldTouchY] = [oldTouch.clientX, oldTouch.clientY];

    moveCanvas(newTouchX - oldTouchX, newTouchY - oldTouchY);

    oldTouches = e.touches;

    const fakeMouseMove = new MouseEvent('mousemove', {
        clientX: newTouchX,
        clientY: newTouchY,
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

    const newTouch0 = /** @type Touch */ (e.touches.item(0)); //this cant be null here
    const newTouch1 = /** @type Touch */ (e.touches.item(1)); //this cant be null here

    const [newTouch0X, newTouch0Y] = [newTouch0.clientX, newTouch0.clientY];
    const [newTouch1X, newTouch1Y] = [newTouch1.clientX, newTouch1.clientY];

    const oldTouch0 = /** @type Touch */ (oldTouches.item(0)); //this cant be null here
    const oldTouch1 = /** @type Touch */ (oldTouches.item(1)); //this cant be null here

    const [oldTouch0X, oldTouch0Y] = [oldTouch0.clientX, oldTouch0.clientY];
    const [oldTouch1X, oldTouch1Y] = [oldTouch1.clientX, oldTouch1.clientY];

    const deltaLineLen = deltaLineLength(
        oldTouch0X,
        oldTouch0Y,
        oldTouch1X,
        oldTouch1Y,
        newTouch0X,
        newTouch0Y,
        newTouch1X,
        newTouch1Y,
    );

    const newTouchMidPoint = lineMidpoint(
        newTouch0X,
        newTouch0Y,
        newTouch1X,
        newTouch1Y,
    );

    if (Math.abs(deltaLineLen) > 40) {
        const fakeWheel = new WheelEvent('wheel', {
            deltaY: deltaLineLen < 0 ? 1 : -1,
            clientX: newTouchMidPoint[0],
            clientY: newTouchMidPoint[1],
        });
        handleWheel(fakeWheel);
    }
}
/**
 * @param {number} o0x
 * @param {number} o0y
 * @param {number} o1x
 * @param {number} o1y
 * @param {number} n0x
 * @param {number} n0y
 * @param {number} n1x
 * @param {number} n1y
 */
function deltaLineLength(o0x, o0y, o1x, o1y, n0x, n0y, n1x, n1y) {
    const oldLineLength = lineLength(o0x, o0y, o1x, o1y);
    const newLineLength = lineLength(n0x, n0y, n1x, n1y);
    return newLineLength - oldLineLength;
}

/**
 * @param {number} p0x
 * @param {number} p0y
 * @param {number} p1x
 * @param {number} p1y
 */
function lineLength(p0x, p0y, p1x, p1y) {
    return Math.sqrt(Math.pow(p0x - p1x, 2) + Math.pow(p0y - p1y, 2));
}

/**
 * @param {number} p0x
 * @param {number} p0y
 * @param {number} p1x
 * @param {number} p1y
 */
function lineMidpoint(p0x, p0y, p1x, p1y) {
    return [p0x + p1x / 2, p0y + p1y / 2];
}

function handleTouchEnd() {
    oldTouches = null;
}

export function initTouch() {
    zoomer.addEventListener('touchmove', handleTouchMove);
    zoomer.addEventListener('touchend', handleTouchEnd);
    zoomer.addEventListener('touchcancel', handleTouchEnd);
}
