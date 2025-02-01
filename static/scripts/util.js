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