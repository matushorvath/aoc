'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/);

    for (let i = 14; i < d[0].length; i++) {
        const s = new Set(d[0].substring(i - 14, i));
        console.log(s);
        if (s.size === 14) {
            console.log(i);
            break;
        }
    }

    //console.log(res);
};

await main();
