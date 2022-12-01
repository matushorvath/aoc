'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(Number);

    console.log(d);

    let mx = [];
    let c = 0
    for (let n of d) {
        if (n === 0) {
            mx.push(c);
            c = 0;
        } else {
            c += n;
        }
    }
    mx.sort((a, b) => b - a);

    console.log(mx);
};

await main();
