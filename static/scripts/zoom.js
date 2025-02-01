import { moveCanvas, mover } from "./move.js";

export let scale = 1.0;
const scaleFactor = Math.SQRT2;
const zoomer = document.getElementById('_canvas_zoom');
let easeCounter = 0;

function handleWheel(event) {

    const pow = event.deltaY < 0 ? 1 : -1;

    if ((pow == -1 && scale == 1) || (pow == 1 && scale == 64)) {
        return;
    }
    scale = scale * Math.pow(scaleFactor, pow);

    scale = Math.max(1.0, Math.min(64.0, scale));
    zoomer.style.transform = `scale(${scale})`;

    const zoomRect = zoomer.getBoundingClientRect();
    const middleX = zoomRect.left + zoomRect.width / 2;
    const middleY = zoomRect.top + zoomRect.height / 2;

    const mouseX = event.clientX - middleX;
    const mouseY = event.clientY - middleY;

    const beforeX = mouseX - middleX;
    const beforeY = mouseY - middleY;

    const xPercent = mouseX / zoomRect.width - .5;
    const yPercent = mouseY / zoomRect.height - .5;

    mover.style.transition = `transform 0.1s ease`;
    easeCounter++;
    console.log(easeCounter);
    //    transition: transform 0.0s ease;


    if (event.deltaY < 0) {
        moveCanvas(-mouseX * (scaleFactor - 1), -mouseY * (scaleFactor - 1));
    } else {
        moveCanvas(mouseX * (scaleFactor - 1) / scaleFactor, mouseY * (scaleFactor - 1) / scaleFactor);
    }

    setTimeout(() => {
        console.log(--easeCounter);
        if (easeCounter == 0) {
            mover.style.transition = `transform 0.0s ease`;
        }
    }, 200);


    //console.log(mouseX, mouseY);

}


export function initZoom() {
    zoomer.addEventListener("wheel", handleWheel);
}
