'use strict';

import fs from 'fs/promises';

const compare = (l, r, d = 0) => {
    console.log(`${' '.repeat(d * 2)}- Compare ${JSON.stringify(l)} vs ${JSON.stringify(r)}`);

    if (typeof(l) === 'number' && typeof(r) === 'number') {
        if (l < r) {
            console.log(`${' '.repeat(d * 2 + 2)}- Left side smaller, right order`);
            return 1;
        } else if (l > r) {
            console.log(`${' '.repeat(d * 2 + 2)}- Right side smaller, not right order`);
            return -1;
        }
        else return 0;
    } else if (Array.isArray(l) && Array.isArray(r)) {
        for (let i = 0; i < Math.min(l.length, r.length); i++) {
            let x = compare(l[i], r[i], d + 1);
            if (x !== 0) return x;
        }

        if (l.length < r.length) {
            console.log(`${' '.repeat(d * 2 + 2)}- Left side ran out of items, right order`);
            return 1;
        } else if (l.length > r.length) {
            console.log(`${' '.repeat(d * 2 + 2)}- Right side ran out of items, not right order`);
            return -1;
        }
        else return 0;
    } else if (Array.isArray(l)) {
        console.log(`${' '.repeat(d * 2 + 2)}- Mixed types; convert right to [${r}]`);
        return compare(l, [r], d+1);
    } else if (Array.isArray(r)) {
        console.log(`${' '.repeat(d * 2 + 2)}- Mixed types; convert left to [${l}]`);
        return compare([l], r, d+1);
    }
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let data = input.trimEnd().split(/\r?\n\r?\n/).flatMap(p => p.split(/\r?\n/).map(JSON.parse));

    const a = [[2]];
    const b = [[6]];
    data.push(a, b);

    //console.log(JSON.stringify(data));
    console.log(JSON.stringify(data.sort((a, b) => compare(b, a))));

    console.log((data.indexOf(a) + 1) * (data.indexOf(b) + 1));
};

await main();
