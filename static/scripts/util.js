export async function fetchData(url) {
    return (await fetch(url)).json();
}

export async function getCellsDim() {
    return await fetchData('/_cells/dim');
}

export async function setCanvasSize(canvas) {
    const cellsDim = await fetchData('/_cells/dim');
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
