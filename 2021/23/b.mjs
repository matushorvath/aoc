'use strict';

import fs from 'fs/promises';

const mxi = 3;
const seq = (a, b) => [...new Array(Math.abs(a-b)+1)].map((_, i) => i+Math.min(a, b));
const isap = (o) => o >= 'A' && o <= 'D';
const cost = (o) => ({ A: 1, B: 10, C: 100, D: 1000 }[o]);
const roomj = (o) => ({ A: 3, B: 5, C: 7, D: 9 }[o]);
const print = (d) => console.log(d.map(row => row.join('')).join('\n'));

const step = (d) => {
    print(d);
    if (['A', 'B', 'C', 'D'].every(o => seq(2, mxi).every(n => d[n][roomj(o)] === o))) {
        return 0;
    }

    const score = [];
    for (let i = 1; i < d.length-1; i++) {
        for (let j = 1; j < d[0].length-1; j++) {
            const o = d[i][j];
            if (isap(o)) {
                const rjo = roomj(o);
                if (i >= 2) { // in room
                    if (seq(1, i-1).every(n => d[n][j] === '.') &&
                        (d[1][j+1] === '.' || d[1][j-1] === '.')) { // can move out
                        if (j !== rjo || // not in own room; or
                            seq(i+1, mxi).some(n => d[n][j] !== '.' && d[n][j] !== o)) { // with different ap below

                            // try move out
                            const jmn = j - seq(0, j-1).reverse().findIndex(n => d[1][n] !== '.');
                            const jmx = j + seq(j+1, 12).findIndex(n => d[1][n] !== '.');
                            for (let k = jmn; k <= jmx; k++) {
                                if (k !== j) {
                                    d[1][k] = o;
                                    d[i][j] = '.';
                                    score.push(step(d) + cost(o) * (i - 1 + Math.abs(j - k)));
                                    d[i][j] = o;
                                    d[1][k] = '.';
                                }
                            }
                        }
                    }
                } else { // in hall
                    if (seq(j, rjo).every(n => d[i][n] === '.') && d[2][rjo] === '.' &&
                        seq(3, mxi).every(n => d[n][rjo] === '.' || d[n][rjo] === o)) { // can move to own room
                        // try move to own room
                        const imx = mxi - seq(2, mxi).reverse().findIndex(n => d[n][rjo] === '.');
                        d[imx][rjo] = o;
                        d[i][j] = '.';
                        score.push(step(d) + cost(o) * (imx - i + Math.abs(rjo - j)));
                        d[i][j] = o;
                        d[imx][rjo] = '.';
                    }
                }
            }
        }
    }
    return Math.min(...score);
};

const main = async () => {
    const input = await fs.readFile('inputa.ex', 'utf8');
    const d = input.trimEnd().split(/\r?\n/).map(row => row.split(''));

    console.log(step(d));
};

await main();
