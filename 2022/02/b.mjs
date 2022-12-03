'use strict';

import fs from 'fs/promises';

const value = (r) => {
    switch (r[0]) {
        case 'A':
            switch (r[1]) {
                case 'X': return 3;
                case 'Y': return 1;
                case 'Z': return 2;
            }
        case 'B':
            switch (r[1]) {
                case 'X': return 1;
                case 'Y': return 2;
                case 'Z': return 3;
            }
        case 'C':
            switch (r[1]) {
                case 'X': return 2;
                case 'Y': return 3;
                case 'Z': return 1;
            }
    }
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(l => l.split(' '));

    let s = 0;

    for (let r of d) {
        let val = value(r);
    

        s += val + (r[1] === 'Z' ? 6 : r[1] === 'Y' ? 3 : 0);
    }

    console.log(s);
};

await main();
