'use strict';

import fs from 'fs/promises';
import 'core-js/actual/array/find-last-index.js'; // node.js <18

const main = async () => {
    const input = await fs.readFile('example', 'utf8'); const My = 20;
    //const input = await fs.readFile('input', 'utf8'); const My = 4000000;

    const data = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Sensor at x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)/);
        return {
            s: [Number(m[1]), Number(m[2])],
            b: [Number(m[3]), Number(m[4])],
        };
    });

    const lines = {};
    //const f = new Array(21).fill(0).map(() => new Array(21).fill(0));

    for (const { s: [sx, sy], b: [bx, by] } of data) {
        const r = Math.abs(sx - bx) + Math.abs(sy - by);

        const yf = Math.max(sy - r, 0);
        const yt = Math.min(sy + r, My);

        for (let y = yf; y <= yt; y++) {
            if (!lines[y]) lines[y] = [];

            const xf = sx - (r - Math.abs(sy - y));
            const xt = sx + (r - Math.abs(sy - y));

            //for (let a = Math.max(0, xf); a <= Math.min(20, xt); a++) f[y][a] = 1;

            const oldl = lines[y];
            const newl = [];

            const lastBefore = oldl.findLastIndex(l => l[1] < xf - 1);
            let firstAfter = oldl.findIndex(l => l[0] > xt + 1);
            if (firstAfter === -1) firstAfter = oldl.length;

            for (let i = 0; i <= lastBefore; i++) {
                newl.push(oldl[i]);
            }

            let nf = xf;
            if (lastBefore + 1 < oldl.length) {
                nf = Math.min(xf, oldl[lastBefore + 1][0]);
            }
            let nt = xt;
            if (firstAfter - 1 >= 0) {
                nt = Math.max(xt, oldl[firstAfter - 1][1]);
            }

            newl.push([nf, nt]);

            for (let i = firstAfter; i < oldl.length; i++) {
                newl.push(oldl[i]);
            }

            lines[y] = newl;
        }

        //console.log(f.map(r => r.reduce((p, c) => p + (c ? 'X' : '.'), '')).join('\n'));

        //console.log(sx, sy, lines);
    }

    const [y, [,[x]]] = Object.entries(lines).find(([i, l]) => l.length > 1);
    console.log('>', x-1, y);

    console.log('>>', (x-1) * 4000000 + y);
    //console.log(Object.values(line).reduce((p, c) => p + (c === 1 ? 1 : 0), 0));
};

await main();
