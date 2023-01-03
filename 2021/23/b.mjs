'use strict';

import fs from 'fs/promises';

const main = async () => {
    const input = await fs.readFile('examplea', 'utf8');
    //const input = await fs.readFile('exampleb', 'utf8');
    //const input = await fs.readFile('inputa', 'utf8');
    //const input = await fs.readFile('inputb', 'utf8');

    const data = input.trimEnd().split(/\r?\n/);

    console.log(data);
};

await main();
