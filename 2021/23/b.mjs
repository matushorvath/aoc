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

const mxi = 3;
const seq = (a, b) => {
    const f = Math.min(a, b);
    const t = Math.max(a, b);
    return [...new Array(t-f+1)].map((_, i) => i+f);
}
const apeq = (a, b) => chmb[a] === chmb[b];
const cost = (o) => {
    switch (chmb[o]) {
        case 'A': return 1;
        case 'B': return 10;
        case 'C': return 100;
        case 'D': return 1000;
    }
}
const roomj = (o) => {
    switch (chmb[o]) {
        case 'A': return 3;
        case 'B': return 5;
        case 'C': return 7;
        case 'D': return 9;
    }
};
const print = (d) => console.log(d.map(row => row.join('')).join('\n'));

const visited = new Map();

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
    // if (s > smn) return Infinity;

    const cfgkey = mkcfgkey(config);
    if (visited[cfgkey] < s) {
        return visited[cfgkey];
    }
    visited.set(cfgkey, s);

    if (isdone(d)) {
        return s;
    }

    let smn = Infinity;

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
                smn = Math.min(smn, step(d, config, s + cost(o) * (imx - i + Math.abs(rjo - j))));
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
                            smn = Math.min(smn, step(d, config, s + cost(o) * (i - 1 + Math.abs(j - k))));
                            d[i][j] = o;
                            d[1][k] = '.';
                            config[o] = [i, j];
                        }
                    }
                }
            }
        }
    }

    return smn;
};

const main = async () => {
    const input = await fs.readFile('inputa.ex', 'utf8');
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

    const score = step(d, config, 0);
    console.log(score);
};

await main();

// 12521 too low
