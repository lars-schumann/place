export let scale = 1.0;

function changeCanvasScale(action) {
    const element = document.getElementById('_canvas_zoom');
    const scaleFactor = 1.4;

    if (action === 'inc') {
        scale = scale * scaleFactor;
    } else if (action === 'dec') {
        scale = scale / scaleFactor;
    }

    scale = Math.max(1.0, Math.min(40.0, scale));

    element.style.transform = `scale(${scale})`;
}


export function initZoom() {
    document.getElementById('_canvas_zoom').addEventListener("wheel", (event) => {
        event.deltaY < 0 ? changeCanvasScale('inc') : changeCanvasScale('dec');
    });
}
