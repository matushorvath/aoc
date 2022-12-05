'use strict';

import fs from 'fs/promises';

const main = async () => {
  //  const input = await fs.readFile('example.1', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/(\d+)-(\d+),(\d+)-(\d+)/);
        return [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
    });

    let s = 0;

    for (const r of d) {
        if ((r[0] <= r[2] && r[1] >= r[3]) ||
            (r[2] <= r[0] && r[3] >= r[1])) {

            s += 1;
        }
    }

    console.log(s);
};

await main();
