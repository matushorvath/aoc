'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(Number));

    const v = [];

    for (let i = 0; i < d.length; i++) {
        v[i] = [];

        let mx = -1;
        for (let j = 0; j < d[0].length; j++) {
            if (d[i][j] > mx) {
                v[i][j] = true;
                mx = d[i][j];
            }
        }
        mx = -1;
        for (let j = d[i].length - 1; j >= 0; j--) {
            if (d[i][j] > mx) {
                v[i][j] = true;
                mx = d[i][j];
            }
        }
    }

    for (let j = 0; j < d[0].length; j++) {
        let mx = -1;
        for (let i = 0; i < d.length; i++) {
            if (d[i][j] > mx) {
                v[i][j] = true;
                mx = d[i][j];
            }
        }
        mx = -1;
        for (let i = d.length - 1; i >= 0; i--) {
            if (d[i][j] > mx) {
                v[i][j] = true;
                mx = d[i][j];
            }
        }
    }

    const r = v.reduce((p, c) => p + c.reduce((x, y) => x + (y ? 1 : 0), 0), 0);

    console.log(d, v, r);
};

await main();
