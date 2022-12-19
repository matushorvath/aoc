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

    console.log(cubes);

    const imx = cubes.length;
    const jmx = cubes.reduce((p, c) => Math.max(p, c.length), 0);
    const kmx = cubes.reduce((p1, c1) => Math.max(p1, c1.reduce((p2, c2) => Math.max(p2, c2.length), 0)), 0);

    console.log(imx, jmx, kmx);

    const queue = [[0, 0, 0]];
    let c;
    while (c = queue.shift()) {
        const [i, j, k] = c;
        if (i >= -1 && i <= imx && j >= -1 && j <= jmx && k >= -1 && k <= kmx
            && !cubes[i]?.[j]?.[k]) {
            set(cubes, i, j, k, -1);

            queue.push([i - 1, j, k]);
            queue.push([i + 1, j, k]);
            queue.push([i, j - 1, k]);
            queue.push([i, j + 1, k]);
            queue.push([i, j, k - 1]);
            queue.push([i, j, k + 1]);
        }
    }

    for (let i = 0; i < imx; i++) {
        for (let j = 0; j < jmx; j++) {
            for (let k = 0; k < kmx; k++) {
                if (cubes[i]?.[j]?.[k] === undefined) {
                    if (cubes[i - 1]?.[j]?.[k]) {
                        cubes[i - 1][j][k]--;
                    }
                    if (cubes[i + 1]?.[j]?.[k]) {
                        cubes[i + 1][j][k]--;
                    }
                    if (cubes[i]?.[j - 1]?.[k]) {
                        cubes[i][j - 1][k]--;
                    }
                    if (cubes[i]?.[j + 1]?.[k]) {
                        cubes[i][j + 1][k]--;
                    }
                    if (cubes[i]?.[j]?.[k - 1]) {
                        cubes[i][j][k - 1]--;
                    }
                    if (cubes[i]?.[j]?.[k + 1]) {
                        cubes[i][j][k + 1]--;
                    }
                }
            }
        }
    }

    const cnt = cubes.reduce((p1, c1) => p1 + c1.reduce((p2, c2) => p2 + c2.reduce((p3, c3) => p3 + (c3 === -1 ? 0 : c3), 0), 0), 0);

    console.log(cubes);
    console.log(cnt);
};

await main();
