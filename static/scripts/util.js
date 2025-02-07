/**
 * @param {HTMLCanvasElement} canvas
 */
export async function setCanvasSize(canvas) {
    /**
     * @type {number[]}
     */
    const cellsDim = await (await fetch('/_cells/dim')).json();
    canvas.width = cellsDim[0];
    canvas.height = cellsDim[1];
}

export const mover = /** @type {HTMLDivElement} */ (
    document.getElementById('_canvas_move')
);

export const zoomer = /** @type {HTMLDivElement} */ (
    document.getElementById('_canvas_zoom')
);

export const canvas = /** @type {HTMLCanvasElement} */ (
    document.getElementById('_canvas_cell')
);
