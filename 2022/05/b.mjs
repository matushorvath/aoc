'use strict';

import fs from 'fs/promises';

const main = async () => {
//    const input = await fs.readFile('example.1', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/);

    const s = [];

    let i = 0;
    for (; d[i + 1] !== ''; i++) {
        for (let j = 0; j * 4 + 1 < d[i].length; j++) {
            const col = j * 4 + 1;
            if (d[i][col] !== ' ') {
                if (!s[j]) s[j] = [];
                s[j].unshift(d[i][col]);
            }
        }
    }

    i += 2;
    for (; d[i]; i++) {
        const m = d[i].match(/move (\d+) from (\d+) to (\d+)/);
        const [hm, f, t] = [m[1], m[2], m[3]].map(Number);

        console.log(hm, f, t);

        const rem = [];
        for (let c = 0; c < hm; c++) {
            rem.push(s[f - 1].pop());
        }
        for (let c = 0; c < hm; c++) {
            s[t - 1].push(rem.pop());
        }
    }

    const r = s.reduce((r, c) => r + c.slice(-1)[0], '');

    console.log(r);
};

await main();
