
export function getGridSize(cellsCount, boundingRect) {
    const grid = { width: cellsCount, height: 1, cellSize: 0 }; 
    let height = Math.floor(Math.sqrt(cellsCount));
    while (height > 0) {
        if (cellsCount % height === 0) {
            grid.width = cellsCount / height;
            grid.height = height;
            break;
        }
        height--;
    }
    const clientWidth = Math.floor(boundingRect.width / grid.width);
    const clientHeight = Math.floor(boundingRect.height / grid.height);
    grid.cellSize = Math.min(clientHeight, clientWidth);
    return grid;
}