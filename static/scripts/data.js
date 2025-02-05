import { fetchData } from './util.js';

export var cellData;

async function updateCells(cells) {
    const updates = await fetchData('/_cells/updates');
    if (!updates) {
        //console.log("no update");
        return;
    }

    updates.forEach(([x, y, colIndex]) => {
        cells[x][y] = colIndex;
    });
}

export async function initData() {
    cellData = await fetchData('/_cells/full');
    setInterval(() => updateCells(cellData), 1000);
}
