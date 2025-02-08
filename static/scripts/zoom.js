import { moveCanvas } from './move.js';
import { mover, zoomer } from './util.js';

/**
 * @type number
 */
const MIN_SCALE = 0.5;

/**
 * @type number
 */
const MAX_SCALE = 64;

/**
 * @type number
 */
const SCALE_FACTOR = Math.SQRT2;

/**
 * @type number
 */
export let scale = 1.0;

/**
 * @type number
 */
export let zoomCounter = 0;

/**
 * @param {WheelEvent} e
 */
export function handleWheel(e) {
    if (zoomCounter) {
        return;
    }
    zoomCounter++;
    setTimeout(() => {
        zoomCounter--;
    }, 55);

    const pow = e.deltaY < 0 ? 1 : -1;

    if ((pow == -1 && MIN_SCALE >= scale) || (pow == 1 && scale >= MAX_SCALE)) {
        return;
    }
    scale = scale * Math.pow(SCALE_FACTOR, pow);

    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    zoomer.style.transform = `scale(${scale})`;

    const zoomRect = zoomer.getBoundingClientRect();
    const middleX = zoomRect.left + zoomRect.width / 2;
    const middleY = zoomRect.top + zoomRect.height / 2;

    const mouseX = e.clientX - middleX;
    const mouseY = e.clientY - middleY;

    mover.style.transition = `transform 0.05s ease`;

    if (e.deltaY < 0) {
        moveCanvas(-mouseX * (SCALE_FACTOR - 1), -mouseY * (SCALE_FACTOR - 1));
    } else {
        moveCanvas(
            (mouseX * (SCALE_FACTOR - 1)) / SCALE_FACTOR,
            (mouseY * (SCALE_FACTOR - 1)) / SCALE_FACTOR,
        );
    }

    setTimeout(() => {
        mover.style.transition = `transform 0.0s ease`;
    }, 51);
}

export function initZoom() {
    zoomer.addEventListener('wheel', handleWheel);
}
