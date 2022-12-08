'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

    const v = [];
    let mxv = 0;

    for (let i = 0; i < d.length; i++) {
        v[i] = [];

        for (let j = 0; j < d[0].length; j++) {
            let a;
            v[i][j] = 1;

            for (a = i + 1; a < d.length; a++) {
                if (d[a][j] >= d[i][j]) {
                    break;
                }
            }
            v[i][j] *= Math.min(a, d.length - 1) - i;

            for (a = i - 1; a >= 0; a--) {
                if (d[a][j] >= d[i][j]) {
                    break;
                }
            }
            v[i][j] *= i - Math.max(a, 0);

            for (a = j + 1; a < d[0].length; a++) {
                if (d[i][a] >= d[i][j]) {
                    break;
                }
            }
            v[i][j] *= Math.min(a, d[0].length - 1) - j;

            for (a = j - 1; a >= 0; a--) {
                if (d[i][a] >= d[i][j]) {
                    break;
                }
            }
            v[i][j] *= j - Math.max(a, 0);

            if (mxv < v[i][j]) mxv = v[i][j];
        }
    }

    //const r = v.reduce((p, c) => p + c.reduce((x, y) => x + (y ? 1 : 0), 0), 0);

    console.log(d, v, mxv);
};

await main();
