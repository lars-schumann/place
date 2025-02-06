/**
 *
 * @param {string} url
 * @returns {Promise<JSON>}
 */
export async function fetchDataJson(url) {
    return (await fetch(url)).json();
}

export async function getCellsDim() {
    return await fetchDataJson('/_cells/dim');
}

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

/**
 * @type {HTMLCanvasElement}
 */
export const canvas = /** @type {HTMLCanvasElement} */ (
    document.getElementById('_canvas_cell')
);

/**
 * @type {HTMLDivElement}
 */
export const mover = /** @type {HTMLDivElement} */ (
    document.getElementById('_canvas_move')
);
