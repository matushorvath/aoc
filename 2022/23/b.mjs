'use strict';

import fs from 'fs/promises';

const print = (data) => {
    const [mnx, mxx] = Object.keys(data).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
    const [mny, mxy] = Object.values(data).reduce((pr, cr) => {
        const [mn, mx] = Object.keys(cr).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
        return [Math.min(pr[0], mn), Math.max(pr[1], mx)];
    }, [Infinity, -Infinity]);

    for (let x = mnx; x <= mxx; x++) {
        let out = '';
        for (let y = mny; y <= mxy; y++) {
            out += data[x]?.[y] === '#' ? '#' : '.';
        }
        console.log(out);
    }
};

const score = (data) => {
    const [mnx, mxx] = Object.keys(data).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
    const [mny, mxy] = Object.values(data).reduce((pr, cr) => {
        const [mn, mx] = Object.keys(cr).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
        return [Math.min(pr[0], mn), Math.max(pr[1], mx)];
    }, [Infinity, -Infinity]);

    let cnt = 0;

    for (let x = mnx; x <= mxx; x++) {
        for (let y = mny; y <= mxy; y++) {
            if (!data[x]?.[y]) cnt++;
        }
    }

    return cnt;
};

const copy = (data) => {
    const data2 = {};

    const [mnx, mxx] = Object.keys(data).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
    for (let x = mnx; x <= mxx; x++) {
        const [mny, mxy] = Object.keys(data[x]).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
        for (let y = mny; y <= mxy; y++) {
            if (data[x][y] === '#') {
                if (!data2[x]) data2[x] = {};
                data2[x][y] = '#';
            }
        }
    }

    return data2;
};

const equal = (data1, data2) => {
    const [mnx1, mxx1] = Object.keys(data1).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
    const [mnx2, mxx2] = Object.keys(data2).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);

    if (mnx1 !== mnx2 || mxx1 !== mxx2) return false;

    for (let x = mnx1; x <= mxx1; x++) {
        const [mny1, mxy1] = Object.keys(data1[x] ?? {}).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
        const [mny2, mxy2] = Object.keys(data2[x] ?? {}).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);

        if (mny1 !== mny2 || mxy1 !== mxy2) return false;

        for (let y = mny1; y <= mxy2; y++) {
            if (data1[x][y] !== data2[x][y]) return false;
        }
    }

    return true;
};

const main = async () => {
    //const input = await fs.readFile('example-1', 'utf8');
    //const input = await fs.readFile('example-2', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data_loaded = Object.fromEntries(input.trimEnd().split(/\r?\n/).map((l, x) => [
        x, Object.fromEntries(l.split('').map((c, y) => [y, c]).filter(([y, c]) => c !== '.'))]));

    //print(data);
    const data = copy(data_loaded);

    const dirs = [
        { check: [[-1, -1], [-1, 0], [-1, 1]], move: [-1, 0] },
        { check: [[ 1, -1], [ 1, 0], [ 1, 1]], move: [ 1, 0] },
        { check: [[-1, -1], [0, -1], [1, -1]], move: [0, -1] },
        { check: [[-1,  1], [0,  1], [1,  1]], move: [0,  1] }
    ];

    let lastData;

    let round = 0;
    for (; ; round++) {
        lastData = copy(data);

        const props = {};

        const [mnx, mxx] = Object.keys(data).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
        for (let x = mnx; x <= mxx; x++) {
            const [mny, mxy] = Object.keys(data[x]).map(Number).reduce((p, c) => [c < p[0] ? c : p[0], c > p[1] ? c : p[1]], [Infinity, -Infinity]);
            for (let y = mny; y <= mxy; y++) {
                if (data[x][y] === '#' && (
                        data[x-1]?.[y] || data[x+1]?.[y] ||
                        data[x-1]?.[y-1] || data[x]?.[y-1] || data[x+1]?.[y-1] ||
                        data[x-1]?.[y+1] || data[x]?.[y+1] || data[x+1]?.[y+1])) {

                    let didx = round % 4;
                    do {
                        const dir = dirs[didx];

                        if (!data[x+dir.check[0][0]]?.[y+dir.check[0][1]] &&
                            !data[x+dir.check[1][0]]?.[y+dir.check[1][1]] &&
                            !data[x+dir.check[2][0]]?.[y+dir.check[2][1]]) {

                            if (!props[x+dir.move[0]]) props[x+dir.move[0]] = {};
                            if (!props[x+dir.move[0]][y+dir.move[1]]) props[x+dir.move[0]][y+dir.move[1]] = [];
                            props[x+dir.move[0]][y+dir.move[1]].push([x, y, didx]);

                            break;
                        }

                        didx = (didx + 1) % 4;
                    } while (didx !== round % 4)
                }
            }
        }

        for (const px in props) {
            for (const py in props[px]) {
                if (props[px][py].length === 1) {
                    delete data[props[px][py][0][0]][props[px][py][0][1]];
                }
            }
        }
        for (const px in props) {
            for (const py in props[px]) {
                if (props[px][py].length === 1) {
                    if (!data[px]) data[px] = {};
                    data[px][py] = '#';
                }
            }
        }

        // console.log(JSON.stringify(props));
        // print(data);

        if (equal(data, lastData)) break;
    }

    console.log(round + 1);
};

await main();
