'use strict';

import fs from 'fs/promises';

const A = [11, 14, 10, 14, -8, 14, -11, 10, -6, -9, 12, -5, -4, -9];
const B = [ 7,  8, 16,  8,  3, 12,   1,  8,  8, 14,  4, 14, 15,  6];
const C = [ 1,  1,  1,  1, 26,  1,  26,  1, 26, 26,  1, 26, 26, 26];

const fn = (w, i) => {
    if (z % 26 + A[i] === w) {
        z = Math.floor(z / C[i]);
    } else {
        z = Math.floor(z / C[i]) * 26 + w + B[i]
    }
}

const main = async () => {
    const cache = {};

    for (let i = 13; i >= 0; i--) {
        for (let n = 1; n <= 9; n++) {
            
        }
    }
};

await main();
