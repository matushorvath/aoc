'use strict';

import fs from 'fs/promises';

const print = (R) => {
    for (let i = 4; i >= 0; i--) {
        let s = '';
        for (let j = 0; j < 6; j++) {
            let c = '';
            for (let k = 9; k >= 0; k--) {
                if (i === R[k][1] && j === R[k][0]) c = `${k}`;
            }
            s += c === '0' ? 'H' : c === '' ? '.' : c;
        }
        console.log(s);
    }
    console.log('');
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(r => r.split(' ')).map(([d, l]) => [d, Number(l)]);

    const R = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    const V = {};

    for (const [dir, len] of d) {
        console.log('---', dir, len);

        for(let j = 0; j < len; j++) {
            switch (dir) {
                case 'R': R[0][0] += 1; break;
                case 'L': R[0][0] -= 1; break;
                case 'U': R[0][1] += 1; break;
                case 'D': R[0][1] -= 1; break;
            }

            for (let i = 1; i < 10; i++) {
                const delta = [0, 0];
                if (R[i][1] === R[i - 1][1]) {
                    if (R[i][0] > R[i - 1][0] + 1) {
                        delta[0] -= 1;
                    } else if (R[i][0] < R[i - 1][0] - 1) {
                        delta[0] += 1;
                    }
                } else if (R[i][0] === R[i - 1][0]) {
                    if (R[i][1] > R[i - 1][1] + 1) {
                        delta[1] -= 1;
                    } else if (R[i][1] < R[i - 1][1] - 1) {
                        delta[1] += 1;
                    }
                } else if (Math.abs(R[i][0] - R[i - 1][0]) > 1 || Math.abs(R[i][1] - R[i - 1][1]) > 1) {
                    if (R[i][0] > R[i - 1][0]) {
                        delta[0] -= 1;
                    } else if (R[i][0] < R[i - 1][0]) {
                        delta[0] += 1;
                    }
                    if (R[i][1] > R[i - 1][1]) {
                        delta[1] -= 1;
                    } else if (R[i][1] < R[i - 1][1]) {
                        delta[1] += 1;
                    }
                }

                R[i][0] += delta[0];
                R[i][1] += delta[1];
            }

            console.log(R);
            print(R);

            if (!V[R[9][0]]) V[R[9][0]] = {};
            V[R[9][0]][R[9][1]] = 1;
        }
    }

    const res = Object.values(V).reduce((p1, c1) => p1 + Object.values(c1).reduce((p2, c2) => p2 + c2, 0), 0);

    console.log(V, res);
};

await main();
