/**
 * @type number[][]
 */
export let cellData;

/**
 * @param {number[][]} cells
 */
async function updateCells(cells) {
    /**
     * @type number[][] | null
     */
    const updates = await (await fetch('/_cells/updates')).json();

    if (updates == null) {
        return;
    }

    updates.forEach(([x, y, colIndex]) => {
        cells[x][y] = colIndex;
    });
}

export async function initData() {
    cellData = await (await fetch('/_cells/full')).json();
    setInterval(() => updateCells(cellData), 1000);
}
