import fs from 'fs/promises';

let flashes = 0;

const increase = (d, x, y) => {
    if (d[x]?.[y] === undefined) return;

    d[x][y] += 1;

    if (d[x][y] > 9) {
        flashes++;
        d[x][y] = -Infinity;
        increase(d, x-1, y-1);
        increase(d, x-1, y);
        increase(d, x-1, y+1);
        increase(d, x, y-1);
        increase(d, x, y+1);
        increase(d, x+1, y-1);
        increase(d, x+1, y);
        increase(d, x+1, y+1);
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const d = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    for (let s = 0; s < 100; s++) {
        for (let x = 0; x < d.length; x++) {
            for (let y = 0; y < d[x].length; y++) {
                increase(d, x, y);
            }
        }
        for (let x = 0; x < d.length; x++) {
            for (let y = 0; y < d[x].length; y++) {
                if (d[x][y] === -Infinity) d[x][y] = 0;
            }
        }
        console.log(d);
    }

    console.log(flashes);
};

await main();
