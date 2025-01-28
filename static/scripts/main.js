const colorsLookup = [
    [255, 255, 255],  // #ffffff
    [212, 215, 217],  // #d4d7d9
    [137, 141, 144],  // #898d90
    [0, 0, 0],        // #000000
    [156, 105, 38],   // #9c6926
    [255, 153, 170],  // #ff99aa
    [180, 74, 192],   // #b44ac0
    [129, 30, 159],   // #811e9f
    [81, 233, 244],   // #51e9f4
    [54, 144, 234],   // #3690ea
    [36, 80, 164],    // #2450a4
    [126, 237, 86],   // #7eed56
    [0, 163, 104],    // #00a368
    [255, 214, 53],   // #ffd635
    [255, 168, 0],    // #ffa800
    [255, 69, 0]      // #ff4500
];

async function fetchFullColors() {
    const response = await fetch('/_canvas/full');
    const colors = await response.json();
    return colors;
}

function initCanvas(canvas, colors) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < colors.length; i++) {
        const colIndex = colors[i]
        if (i == 1) {
            console.log(colIndex)
        }
        const index = i * 4;  // 4 values per pixel (RGBA)
        data[index] = colorsLookup[colIndex][0];
        data[index + 1] = colorsLookup[colIndex][1];
        data[index + 2] = colorsLookup[colIndex][2];
        data[index + 3] = 255;
    }

    // Put the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);
}

async function updateCanvas(canvas) {
    const response = await fetch('/_canvas/updates');
    const updates = await response.json();
    if (updates === null) {
        console.log("nothing to update :)");
        return;
    }
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Get the current image data
    const data = imageData.data; // This is the raw RGBA pixel data

    // Loop through the updates and update the corresponding pixel
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i];
        const x = update[0]; // X coordinate
        const y = update[1]; // Y coordinate
        const colIndex = update[2]; // Color index

        // Calculate the pixel index in the image data array
        const index = (y * canvas.width + x) * 4;

        // Fetch the color from colorsLookup
        const color = colorsLookup[colIndex];
        data[index] = color[0];     // Red
        data[index + 1] = color[1]; // Green
        data[index + 2] = color[2]; // Blue
        data[index + 3] = 255;      // Alpha (full opacity)
    }

    // Put the updated image data back on the canvas
    ctx.putImageData(imageData, 0, 0);
}


window.onload = async function () {
    const canvas = document.getElementById('_canvas');
    const initColors = await fetchFullColors()
    initCanvas(canvas, initColors)



    setInterval(() => updateCanvas(canvas), 1000);
};

