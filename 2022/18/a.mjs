'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.split(',').map(Number));

    const set = (c, i, j, k, v) => ((c[i] ?? (c[i] = []))[j] ?? (c[i][j] = []))[k] = v;
    //const dec = (c, i, j, k) => ((c[i] ?? (c[i] = []))[j] ?? (c[i][j] = []))[k] = c[i][j][k] - 1;
    const cubes = [];

    for (const c of data) {
        const [i, j, k] = c;
        set(cubes, i, j, k, 6);

        if (cubes[i - 1]?.[j]?.[k]) {
            cubes[i - 1][j][k]--;
            cubes[i][j][k]--;
        }
        if (cubes[i + 1]?.[j]?.[k]) {
            cubes[i + 1][j][k]--;
            cubes[i][j][k]--;
        }
        if (cubes[i]?.[j - 1]?.[k]) {
            cubes[i][j - 1][k]--;
            cubes[i][j][k]--;
        }
        if (cubes[i]?.[j + 1]?.[k]) {
            cubes[i][j + 1][k]--;
            cubes[i][j][k]--;
        }
        if (cubes[i]?.[j]?.[k - 1]) {
            cubes[i][j][k - 1]--;
            cubes[i][j][k]--;
        }
        if (cubes[i]?.[j]?.[k + 1]) {
            cubes[i][j][k + 1]--;
            cubes[i][j][k]--;
        }
    }

    const cnt = cubes.reduce((p1, c1) => p1 + c1.reduce((p2, c2) => p2 + c2.reduce((p3, c3) => p3 + c3, 0), 0), 0);

    console.log(cnt);
};

await main();
