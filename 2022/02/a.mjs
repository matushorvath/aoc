'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => l.split(' '));

    let s = 0;

    for (let r of d) {
        const w =
            (r[0] === 'A' && r[1] === 'Y') ||
            (r[0] === 'B' && r[1] === 'Z') ||
            (r[0] === 'C' && r[1] === 'X');
        const d = (r[0].charCodeAt(0) - 'A'.charCodeAt(0)) === (r[1].charCodeAt(0) - 'X'.charCodeAt(0));

        s += (r[1].charCodeAt(0) - 'X'.charCodeAt(0) + 1) + (w ? 6 : d ? 3 : 0);
    }

    console.log(s);
};

await main();
