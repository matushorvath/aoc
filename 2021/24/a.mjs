'use strict';

import fs from 'fs/promises';

const A = [11, 14, 10, 14, -8, 14, -11, 10, -6, -9, 12, -5, -4, -9];
const B = [ 7,  8, 16,  8,  3, 12,   1,  8,  8, 14,  4, 14, 15,  6];
const C = [ 1,  1,  1,  1, 26,  1,  26,  1, 26, 26,  1, 26, 26, 26];

const D = [ 7,  7,  7,  7,  7,  6,   6,  5,  5,  4,  3,  3,  2,  1];

const fn = (w, a, b, c) => {
    if (z % 26 + a === w) {
        z = z / c
    } else {
        z = (z / c) * 26 + w + b
    }
}

const step = (idx, z, udivs) => {
    if (idx === 14) {
        return z === 0 ? [''] : [];
    }

    const ddivs = C[idx] === 26 ? 1 : 0;

    const nums = [];
    for (let w = 1; w <= 9; w++) {
        if (z % 26 + A[idx] === w) {
            const ok = step(idx+1, Math.floor(z / C[idx]), udivs-ddivs);
            nums.push(...ok.map(n => `${w}${n}`));
        } else if (udivs < D[idx]) {
            const ok = step(idx+1, Math.floor(z / C[idx]) * 26 + w + B[idx], udivs+1-ddivs);
            nums.push(...ok.map(n => `${w}${n}`));
        }
    }
    return nums;
};

const main = async () => {
    // const input = await fs.readFile('input', 'utf8');
    // const data = input.trimEnd().split(/\r?\n/);

    const out = step(0, 0, 0);

    let max = 0;
    for (const o of out) {
        if (o > max) max = o;
    }
    console.log(max);
};

await main();
