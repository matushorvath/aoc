'use strict';

import fs from 'fs/promises';

const update = (f, c, n, data) => {
    if (n[0] >= data.length || n[0] < 0 || n[1] >= data[0].length || n[1] < 0) {
        return;
    }
    if (data[c[0]][c[1]] - data[n[0]][n[1]] > 1) {
        return;
    }
    if (!f[n[0]][n[1]].v && f[n[0]][n[1]].d > f[c[0]][c[1]].d + 1) {
        f[n[0]][n[1]].d = f[c[0]][c[1]].d + 1;
    }
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.split(''));

//    let S;
    let E;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] === 'S') {
                data[i][j] = 0;
                //S = [i, j];
            } else if (data[i][j] === 'E') {
                data[i][j] = 'z'.charCodeAt(0) - 'a'.charCodeAt(0);
                E = [i, j];
            } else {
                data[i][j] = data[i][j].charCodeAt(0) - 'a'.charCodeAt(0);
            }
        }
    }

    //const st = (a, x, y, v) => (a[x] ?? (a[x] = []))[y] = v;

    const f = [...new Array(data.length)].map(() => [...new Array(data[0].length)].map(() => ({ v: false, d: Infinity })));
    f[E[0]][E[1]] = { d: 0, v: true };

    console.log(data, E);

    let X = 0;

    let amin = Infinity;

    let c = [...E];
    while (true) {
        update(f, c, [c[0] + 1, c[1]], data);
        update(f, c, [c[0] - 1, c[1]], data);
        update(f, c, [c[0], c[1] + 1], data);
        update(f, c, [c[0], c[1] - 1], data);

        f[c[0]][c[1]].v = true;
        X++;

        if (data[c[0]][c[1]] === 0 && f[c[0]][c[1]].d < amin) {
            amin = f[c[0]][c[1]].d;
        }

        let dmin = Infinity;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (!f[i][j].v) {
                    if (f[i][j].d < dmin) {
                        dmin = f[i][j].d;
                        c = [i, j];
                    }
                }
            }
        }

        // if (dmin === Infinity) {
        //     console.log(f.reduce((s, r, i) => s += r.map((p, j) => p.v ? data[i][j] : '.').join('') + '\n', ''));
        //     break;
        // }
        if (dmin === Infinity) break;

        console.log(c, X, dmin, amin);
    }

//    console.log(f);
    console.log(amin);
};

await main();
