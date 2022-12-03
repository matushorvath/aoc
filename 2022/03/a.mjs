'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/);

    let s = 0;

    for (const l of d) {
        const x = new Set(l.slice(0, l.length / 2).split(''));
        const y = new Set(l.slice(l.length / 2).split(''));

        const common = [...x].filter(e => y.has(e));

        const v = common.reduce((p, e) => {
            if (e >= 'a' && e <= 'z') {
                return p + e.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            } else {
                return p + e.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
            }
        }, 0);
        s += v;
    }

    console.log(s);
};

await main();
