const colorsLookup = [
    [255, 255, 255, 255],  //rgb(255, 255, 255)
    [212, 215, 217, 255],  // #d4d7d9
    [137, 141, 144, 255],  // #898d90
    [0, 0, 0, 255],        // #000000
    [156, 105, 38, 255],   // #9c6926
    [255, 153, 170, 255],  // #ff99aa
    [180, 74, 192, 255],   // #b44ac0
    [129, 30, 159, 255],   // #811e9f
    [81, 233, 244, 255],   // #51e9f4
    [54, 144, 234, 255],   // #3690ea
    [36, 80, 164, 255],    // #2450a4
    [126, 237, 86, 255],   // #7eed56
    [0, 163, 104, 255],    // #00a368
    [255, 214, 53, 255],   // #ffd635
    [255, 168, 0, 255],    // #ffa800
    [255, 69, 0, 255]      // #ff4500
];

function sendPlacement() {
    fetch(`/_cells/${document.getElementById('placeInput').value}`);
}

async function fetchData(url) {
    return (await fetch(url)).json();
}

function updatePixelData(data, index, colorIndex) {
    data.set(colorsLookup[colorIndex], index);
}

async function updateCells(cells) {
    const updates = await fetchData('/_cells/updates');
    if (!updates) {
        console.log("no update");
        return;
    }

    updates.forEach(([x, y, colIndex]) => {
        cells[x][y] = colIndex
    });

}

function refreshCanvasWithCellData(canvas, cells) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let clm = 0; clm < cells.length; clm++) {
        for (let row = 0; row < cells[clm].length; row++) {
            const index = (row * canvas.width + clm) * 4;
            updatePixelData(data, index, cells[clm][row]);
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

async function initCanvas() {
    const canvas = document.getElementById('_canvas');
    const cellData = await fetchData('/_cells/full');

    setInterval(() => updateCells(cellData), 1000);
    setInterval(() => refreshCanvasWithCellData(canvas, cellData), 1000);
}

window.onload = initCanvas;
