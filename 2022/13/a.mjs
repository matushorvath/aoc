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
        let a, b;
        while (l.length !== 0 && r.length !== 0) {
            a = l.shift();
            b = r.shift();

            let x = compare(a, b, d + 1);
            if (x !== 0) return x;
        }

        if (l.length === 0 && r.length !== 0) {
            console.log(`${' '.repeat(d * 2 + 2)}- Left side ran out of items, right order`);
            return 1;
        } else if (l.length !== 0 && r.length === 0) {
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
    let data = input.trimEnd().split(/\r?\n\r?\n/).map(p => p.split(/\r?\n/).map(JSON.parse));

    let res = 0;

    for (let i = 0; i < data.length; i++) {
        const [l, r] = data[i];
        if (compare(l, r) === 1) {
            res += i + 1;
        }
    }

    console.log(res);
};

await main();
