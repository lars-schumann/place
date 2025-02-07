/**
 * @type number[][]
 */
export let cellData;

/**
 * @type number[][] | null
 */
export let updates;

async function updateCells() {
    updates = await (await fetch('/_cells/updates')).json();

    if (updates == null) {
        return;
    }

    updates.forEach(([x, y, colIndex]) => {
        cellData[x][y] = colIndex;
    });
}

export async function initData() {
    cellData = await (await fetch('/_cells/full')).json();
    setInterval(() => updateCells(), 1000);
}
