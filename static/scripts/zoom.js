import { moveCanvas } from './move.js';
import { mover } from './util.js';

/**
 * @type {HTMLDivElement}
 */
const zoomer = /** @type {HTMLDivElement} */ (
    document.getElementById('_canvas_zoom')
);

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
function handleWheel(e) {
    if (zoomCounter) {
        return;
    }
    zoomCounter++;
    setTimeout(() => {
        zoomCounter--;
    }, 51);

    const pow = e.deltaY < 0 ? 1 : -1;

    if ((pow == -1 && scale == 1) || (pow == 1 && scale == 64)) {
        return;
    }
    scale = scale * Math.pow(SCALE_FACTOR, pow);

    scale = Math.max(1.0, Math.min(64.0, scale));
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
