'use strict';

import fs from 'fs/promises';

const cache = {};

const play = (os, op, oi) => {
    const this_key = `${os[0]}:${os[1]}:${op[0]}:${op[1]}:${oi}`;

    for (let d1 = 0; d1 < 3; d1++) {
        for (let d2 = 0; d2 < 3; d2++) {
            for (let d3 = 0; d3 < 3; d3++) {
                const p = [...op];
                const s = [...os];
                const i = oi;

                p[i] = (p[i] + d1 + d2 + d3 + 3) % 10;
                s[i] += p[i] + 1;

                const [tw1, tw2] = cache[this_key] ?? [0, 0];
                if (s[i] < 21) {
                    const next_key = `${s[0]}:${s[1]}:${p[0]}:${p[1]}:${(i+1)%2}`;
                    const [nw1, nw2] = cache[next_key];
                    cache[this_key] = [tw1 + nw1, tw2 + nw2];
                } else {
                    cache[this_key] = i === 0 ? [tw1+1, tw2] : [tw1, tw2+1];
                }
            }
        }
    }
};

const main = async () => {
    const input = await fs.readFile('input.ex', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    for (let s1 = 20; s1 >= 0; s1--) {
        for (let s2 = 20; s2 >= 0; s2--) {
            for (let p1 = 0; p1 < 10; p1++) {
                for (let p2 = 0; p2 < 10; p2++) {
                    for (let i = 0; i < 2; i++) {
                        play([s1, s2], [p1, p2], i);
                    }
                }
            }
        }
    }

    // console.log(cache);
};

await main();
