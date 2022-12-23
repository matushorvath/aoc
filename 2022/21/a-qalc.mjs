'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('example', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.replaceAll(/([a-z]{4})/g, '"$1"').split(': '));

    console.log(`multisolve([${ data.map(e => `${e[0]} = ${e[1]}`).join('; ') }]; [${ data.map(e => e[0]).join('; ') }])`);
};

await main();
