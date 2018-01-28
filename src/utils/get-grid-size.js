
const minCellSize = 100;

export function getGridSize(cellsCount, container) {
    const boundingRect = container.node().getBoundingClientRect();
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
    grid.cellSize = Math.floor(boundingRect.width / grid.width);
    if (grid.cellSize < minCellSize) {
        const swap = grid.width;
        grid.width = grid.height;
        grid.height = swap;
        grid.cellSize = Math.floor(boundingRect.width / grid.width);
    }
    return grid;
}