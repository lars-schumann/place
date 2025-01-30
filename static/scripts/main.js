import { initCanvas } from './celldata.js';
import { initZoom } from './zoom.js';
import { initMove } from './move.js';


window.onload = async function () {

    await initCanvas();
    await initZoom();
    await initMove();

};
