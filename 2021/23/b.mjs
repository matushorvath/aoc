'use strict';

import fs from 'fs/promises';

const mxi = 3;
const seq = (a, b) => [...new Array(Math.abs(a-b)+1)].map((_, i) => i+Math.min(a, b));
const isap = (o) => (o >= 'A' && o <= 'D') || (o >= 'a' && o <= 'd');
const apeq = (a, b) => a.toUpperCase() === b.toUpperCase();
const cost = (o) => ({ A: 1, B: 10, C: 100, D: 1000, a: 1, b: 10, c: 100, d: 1000 }[o]);
const roomj = (o) => ({ A: 3, B: 5, C: 7, D: 9, a: 3, b: 5, c: 7, d: 9 }[o]);
const print = (d) => console.log(d.map(row => row.join('')).join('\n'));

let smn = Infinity;

const visited = new Map();
let printed = false;

const mkcfgkey = config => ['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd']
    .map(o => `${o}[${config[o][0]},${config[o][1]}]`)
    .join(':');

const step = (d, c, s) => {
    if (s > smn) return false;

    //print(d);
    if (['A', 'B', 'C', 'D'].every(o => seq(2, mxi).every(n => d[n][roomj(o)].toUpperCase() === o))) {
        smn = s;
        // if (!printed && s === 12521) {
        //     printed = true;
        //     return true;
        // }
        return false;
    }

    const cfgkey = mkcfgkey(c);
    if (visited[cfgkey] && visited[cfgkey] < s) {
        return false;
    }
    visited.set(cfgkey, s);

    let pr = false;

    for (let i = 1; i < d.length-1; i++) {
        for (let j = 1; j < d[0].length-1; j++) {
            const o = d[i][j];
            if (isap(o)) {
                const rjo = roomj(o);
                if (i === 1) { // in hall
                    if (seq(j, rjo).every(n => j === n || d[i][n] === '.') && d[2][rjo] === '.' &&
                        seq(3, mxi).every(n => d[n][rjo] === '.' || apeq(d[n][rjo], o))) { // can move to own room
                        // try move to own room
                        const imx = mxi - seq(2, mxi).reverse().findIndex(n => d[n][rjo] === '.');
                        d[imx][rjo] = o;
                        d[i][j] = '.';
                        const nc = { ...c, [o]: [imx, rjo] };
                        pr = pr || step(d, nc, s + cost(o) * (imx - i + Math.abs(rjo - j)));
                        d[i][j] = o;
                        d[imx][rjo] = '.';
                    }
                } else { // in room
                    if (seq(1, i-1).every(n => d[n][j] === '.') &&
                        (d[1][j+1] === '.' || d[1][j-1] === '.')) { // can move out
                        if (j !== rjo || // not in own room; or
                            (i !== mxi && // not on bottom
                            seq(i+1, mxi).some(n => d[n][j] !== '.' && !apeq(d[n][j], o)))) { // with different ap below

                            // try move out
                            const jmn = j - seq(0, j-1).reverse().findIndex(n => d[1][n] !== '.');
                            const jmx = j + seq(j+1, 12).findIndex(n => d[1][n] !== '.');
                            for (let k = jmn; k <= jmx; k++) {
                                if (k !== j) {
                                    d[1][k] = o;
                                    d[i][j] = '.';
                                    const nc = { ...c, [o]: [1, k] };
                                    pr = pr || step(d, nc, s + cost(o) * (i - 1 + Math.abs(j - k)));
                                    d[i][j] = o;
                                    d[1][k] = '.';
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (pr) {
        console.log(s);
        print(d);
    }
    return pr;
};

const main = async () => {
    const input = await fs.readFile('inputa', 'utf8');
    const d = input.trimEnd().split(/\r?\n/).map(row => row.split(''));

    const config = {};
    for (let i = 1; i < d.length-1; i++) {
        for (let j = 1; j < d[0].length-1; j++) {
            if (isap(d[i][j])) {
                if (config[d[i][j]]) {
                    d[i][j] = d[i][j].toLowerCase();
                }
                config[d[i][j]] = [i, j];
            }
        }
    }

    step(d, config, 0)
    console.log(smn);
};

await main();

// 12521 too low
