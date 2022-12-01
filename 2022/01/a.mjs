'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(Number);

    console.log(d);

    let mx = 0;
    let c = 0
    for (let n of d) {
        if (n === 0) {
            if (c > mx) mx = c;
            c = 0;
        } else {
            c += n;
        }
    }

    console.log(mx);
};

await main();
