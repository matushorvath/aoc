import fs from 'fs/promises';

const basin = (data, x, y, vis) => {
    if (vis[x] === undefined) {
        vis[x] = [];
    }
    vis[x][y] = true;

    if (data[x][y] === 9) return 0;

    let size = 1;
    if (x > 0 && !vis[x-1]?.[y] && data[x-1][y] >= data[x][y]) {
        size += basin(data, x-1, y, vis);
    }
    if (x < data.length-1 && !vis[x+1]?.[y] && data[x+1][y] >= data[x][y]) {
        size += basin(data, x+1, y, vis);
    }
    if (y > 0 && !vis[x]?.[y-1] && data[x][y-1] >= data[x][y]) {
        size += basin(data, x, y-1, vis);
    }
    if (y < data[x].length-1 && !vis[x]?.[y+1] && data[x][y+1] >= data[x][y]) {
        size += basin(data, x, y+1, vis);
    }
    return size;
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    const sizes = [];

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (!(data[x-1]?.[y] <= data[x][y]) && 
                !(data[x+1]?.[y] <= data[x][y]) && 
                !(data[x][y-1] <= data[x][y]) && 
                !(data[x][y+1] <= data[x][y])) {
                    const size = basin(data, x, y, []);
                    console.log(x, y, size);
                    sizes.push(size);
            }
        }
    }

    console.log(sizes.sort((a, b) => a - b));
    console.log(sizes.sort((a, b) => a - b).slice(-3).reduce((p, c) => p*c, 1));
};

await main();
