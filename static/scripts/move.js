let transform = [0.0, 0.0]
const mover = document.getElementById('_canvas_move');

function handleMove(event) {
    //console.log(event.buttons);
    if (event.buttons == 1) {
        transform[0] += event.movementX;
        transform[1] += event.movementY;
        mover.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`;
    }
}

export function initMove() {

    mover.addEventListener("mousemove", (event) => {
        handleMove(event);
    });

}
