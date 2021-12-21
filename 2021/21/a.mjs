'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const p = [];
    p[0] = Number(data[0].match(/([0-9]+)$/)[1]);
    p[1] = Number(data[1].match(/([0-9]+)$/)[1]);
    let i = 0;

    let d = 1;
    let dc = 0;

    const s = [0, 0];

    while (true) {
        const steps = 3*d + 3; dc += 3;
        d += 3; if (d > 100) d -= 100;

        p[i] = (p[i] + steps - 1) % 10 + 1;
        s[i] += p[i];

        console.log(i+1, d-3, d-2, d-1, p[i], s[i]);

        if (s[i] >= 1000) break;
        i = (i+1)%2;
    }

    console.log(dc, s, dc * s[(i+1)%2]);
};

await main();
