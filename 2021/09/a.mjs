import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.split('').map(Number));

    let rl = 0;

    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (!(data[x-1]?.[y] <= data[x][y]) && 
                !(data[x+1]?.[y] <= data[x][y]) && 
                !(data[x][y-1] <= data[x][y]) && 
                !(data[x][y+1] <= data[x][y])) {
                    rl += 1 + data[x][y];
                    console.log(x, y);
            }
        }
    }

    console.log(rl);
};

await main();
