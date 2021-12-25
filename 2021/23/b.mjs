'use strict';

import fs from 'fs/promises';

// ABCD EFGH IJKL MNOP
const chmf = {
    A: 'abcd'.split(''),
    B: 'efgh'.split(''),
    C: 'ijkl'.split(''),
    D: 'mnop'.split(''),
}

const chmb = {
    a: 'A',
    b: 'A',
    c: 'A',
    d: 'A',
    e: 'B',
    f: 'B',
    g: 'B',
    h: 'B',
    i: 'C',
    j: 'C',
    k: 'C',
    l: 'C',
    m: 'D',
    n: 'D',
    o: 'D',
    p: 'D',
}

const mxi = 5;
const seq = (a, b) => [...new Array(Math.abs(a-b)+1)].map((_, i) => i+Math.min(a, b));
const apeq = (a, b) => chmb[a] === chmb[b];
const cost = (o) => ({ A: 1, B: 10, C: 100, D: 1000 }[chmb[o]]);
const roomj = (o) => ({ A: 3, B: 5, C: 7, D: 9 }[chmb[o]]);
const print = (d) => console.log(d.map(row => row.join('')).join('\n'));

let smn = Infinity;

const visited = new Map();
let printed = false;

const mkcfgkey = config => 'aeimbfjncgkodhlp'
    .slice(0, (mxi - 1) * 4)
    .split('')
    .map(o => `${o}[${config[o][0]},${config[o][1]}]`)
    .join(':');

const isdone = (d) => {
    for (const [col, chr] of [[3, 'A'], [5, 'B'], [7, 'C'], [9, 'D']]) {
        for (let row = 2; row <= mxi; row++) {
            if (chmb[d[row][col]] !== chr) return false;
        }
    }
    return true;
};

const step = (d, config, s) => {
    if (s > smn) return false;

    const cfgkey = mkcfgkey(config);
    if (visited[cfgkey] < s) {
        return false;
    }
    visited.set(cfgkey, s);

    //print(d);
    if (isdone(d)) {
        smn = s;
        // if (!printed && s === 12521) {
        //     printed = true;
        //     return true;
        // }
        return false;
    }

    let pr = false;

    for (const [o, [i, j]] of Object.entries(config)) {
        const rjo = roomj(o);
        if (i === 1) { // in hall
            if (seq(j, rjo).every(n => j === n || d[i][n] === '.') && d[2][rjo] === '.' &&
                seq(3, mxi).every(n => d[n][rjo] === '.' || apeq(d[n][rjo], o))) { // can move to own room
                // try move to own room
                const imx = mxi - seq(2, mxi).reverse().findIndex(n => d[n][rjo] === '.');
                d[imx][rjo] = o;
                d[i][j] = '.';
                config[o] = [imx, rjo];
                pr = pr || step(d, config, s + cost(o) * (imx - i + Math.abs(rjo - j)));
                d[i][j] = o;
                d[imx][rjo] = '.';
                config[o] = [i, j];
            }
        } else { // in room
            if (j !== rjo || // not in own room; or
                (i !== mxi && // not on bottom
                seq(i+1, mxi).some(n => d[n][j] !== '.' && !apeq(d[n][j], o)))) { // with different ap below

                if (seq(1, i-1).every(n => d[n][j] === '.') &&
                    (d[1][j+1] === '.' || d[1][j-1] === '.')) { // can move out

                    // try move out
                    const jmn = j - seq(0, j-1).reverse().findIndex(n => d[1][n] !== '.');
                    const jmx = j + seq(j+1, 12).findIndex(n => d[1][n] !== '.');
                    for (let k = jmn; k <= jmx; k++) {
                        if (k !== j) {
                            d[1][k] = o;
                            d[i][j] = '.';
                            config[o] = [1, k];
                            pr = pr || step(d, config, s + cost(o) * (i - 1 + Math.abs(j - k)));
                            d[i][j] = o;
                            d[1][k] = '.';
                            config[o] = [i, j];
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
    const input = await fs.readFile('inputb', 'utf8');
    const d = input.trimEnd().split(/\r?\n/).map(row => row.split(''));

    const config = {};
    for (let i = 1; i < d.length-1; i++) {
        for (let j = 1; j < d[0].length-1; j++) {
            if (d[i][j] >= 'A' && d[i][j] <= 'D') {
                let key = '';
                for (let idx = 0; idx < 4; idx++) {
                    key = chmf[d[i][j]][idx];
                    if (!config[key]) break;
                }
                d[i][j] = key;
                config[key] = [i, j];
            }
        }
    }

    print(d);
    console.log(config);

    step(d, config, 0)
    console.log(smn);
};

await main();

// 12521 too low
