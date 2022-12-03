'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/);

    let s = 0;

    for (let i = 0; i < d.length; i += 3) {
        const x = new Set(d[i].split(''));
        const y = new Set(d[i+1].split(''));
        const z = new Set(d[i+2].split(''));

        const common = [...x].filter(e => y.has(e) && z.has(e));
        s += ((e) => {
            if (e >= 'a' && e <= 'z') {
                return e.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            } else {
                return e.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
            }
        })(common[0]);
    }

    console.log(s);
};

await main();
