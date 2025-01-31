export let scale = 1.0;
const scaleFactor = 1.4;
const zoomer = document.getElementById('_canvas_zoom');

function handleWheel(e) {

    const pow = e.deltaY < 0 ? 1 : -1;
    scale = scale * Math.pow(scaleFactor, pow);

    scale = Math.max(1.0, Math.min(40.0, scale));
    zoomer.style.transform = `scale(${scale})`;
}


export function initZoom() {
    zoomer.addEventListener("wheel", (event) => {
        handleWheel(event)
    });
}
