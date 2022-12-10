'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(r => r.split(' ')).map(([i, a]) => [i, Number(a)]);

    let c = 1;
    let x = 1;
    let r = 0;

    const cycles = new Set([20, 60, 100, 140, 180, 220]);
    let out = '';
    let pos;

    for (const [i, a] of d) {
        if (i === 'addx') {
            console.log(c, c * x);
            if (cycles.has(c)) {
                r += c * x;
            }
            pos = (c - 1) % 40;
            out += (x >= pos - 1 && x <= pos + 1) ? '#' : ' ';
            c += 1;

            console.log(c, c * x);
            if (cycles.has(c)) {
                r += c * x;
            }
            pos = (c - 1) % 40;
            out += (x >= pos - 1 && x <= pos + 1) ? '#' : ' ';
            c += 1;

            x += a;
        } else if (i === 'noop') {
            console.log(c, c * x);
            if (cycles.has(c)) {
                r += c * x;
            }
            pos = (c - 1) % 40;
            out += (x >= pos - 1 && x <= pos + 1) ? '#' : ' ';
            c += 1;
        }
    }

    for (let i = 0; i < 6; i++) {
        console.log(out.substring(i*40, (i+1)*40));
    }
};

await main();
