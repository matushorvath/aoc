'use strict';

import fs from 'fs/promises';

const print = (H, T) => {
    for (let i = 4; i >= 0; i--) {
        let s = '';
        for (let j = 0; j < 6; j++) {
            s += (i === H[1] && j === H[0]) ? 'H' : (i === T[1] && j === T[0]) ? 'T' : '.';
        }
        console.log(s);
    }
    console.log('');
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(r => r.split(' ')).map(([d, l]) => [d, Number(l)]);

    const H = [0, 0];
    const T = [0, 0];
    const V = {};

    for (const [dir, len] of d) {
        console.log('---', dir, len);

        for(let i = 0; i < len; i++) {
            switch (dir) {
                case 'R': H[0] += 1; break;
                case 'L': H[0] -= 1; break;
                case 'U': H[1] += 1; break;
                case 'D': H[1] -= 1; break;
            }

            const delta = [0, 0];
            if (T[1] === H[1]) {
                if (T[0] > H[0] + 1) {
                    delta[0] -= 1;
                } else if (T[0] < H[0] - 1) {
                    delta[0] += 1;
                }
            } else if (T[0] === H[0]) {
                if (T[1] > H[1] + 1) {
                    delta[1] -= 1;
                } else if (T[1] < H[1] - 1) {
                    delta[1] += 1;
                }
            } else if (Math.abs(T[0] - H[0]) > 1 || Math.abs(T[1] - H[1]) > 1) {
                if (T[0] > H[0]) {
                    delta[0] -= 1;
                } else if (T[0] < H[0]) {
                    delta[0] += 1;
                }
                if (T[1] > H[1]) {
                    delta[1] -= 1;
                } else if (T[1] < H[1]) {
                    delta[1] += 1;
                }
            }

            T[0] += delta[0];
            T[1] += delta[1];

            //console.log(H, T);
            print(H, T);

            if (!V[T[0]]) V[T[0]] = {};
            V[T[0]][T[1]] = 1;
        }
    }

    const res = Object.values(V).reduce((p1, c1) => p1 + Object.values(c1).reduce((p2, c2) => p2 + c2, 0), 0);

    console.log(V, res);
};

await main();
