import { initData } from './data.js';
import { initDraw } from './draw.js';
import { initZoom } from './zoom.js';
import { initMove } from './move.js';
import { initGrid } from './grid.js';
import { initTouch } from './touch.js';

window.onload = async function () {
    await initData();
    await initDraw();
    await initZoom();
    await initMove();
    await initGrid();
    await initTouch();
};
