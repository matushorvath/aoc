'use strict';

import fs from 'fs/promises';
import { finished } from 'stream';

const main = async () => {
//    const input = await fs.readFile('example', 'utf8'); const Ly = 10;
    const input = await fs.readFile('input', 'utf8'); const Ly = 2000000;

    const data = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Sensor at x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)/);
        return {
            s: [Number(m[1]), Number(m[2])],
            b: [Number(m[3]), Number(m[4])],
        };
    });

    const line = {};

    for (const { s: [sx, sy], b: [bx, by] } of data) {
        const r = Math.abs(sx - bx) + Math.abs(sy - by);
        const dy = Math.abs(Ly - sy);

        if (by === Ly) line[bx] = 2;

        if (r > dy) {
            const dx1 = sx - (r - dy);
            const dx2 = sx + (r - dy);

            for (let i = dx1; i <= dx2; i++) {
                if (!line[i]) line[i] = 1;
            }
        }
        //console.log(sx, sy, line);
    }

    console.log(Object.values(line).reduce((p, c) => p + (c === 1 ? 1 : 0), 0));
};

await main();
