'use strict';

import fs from 'fs/promises';

const trans = (pic, map) => {
    const out = {};

    const ik = Object.keys(pic).map(Number);
    const imn = Math.min(...ik);
    const imx = Math.max(...ik);

    const jk = Object.keys(pic[0]).map(Number);
    const jmn = Math.min(...jk);
    const jmx = Math.max(...jk);

    for (let i = imn - 1; i <= imx + 1; i++) {
        out[i] = {};

        for (let j = jmn - 1; j <= jmx + 1; j++) {
            const bits = [
                (pic[i-1]?.[j-1] ?? 0), (pic[i-1]?.[j] ?? 0), (pic[i-1]?.[j+1] ?? 0),
                (pic[i]?.[j-1] ?? 0), (pic[i]?.[j] ?? 0), (pic[i]?.[j+1] ?? 0),
                (pic[i+1]?.[j-1] ?? 0), (pic[i+1]?.[j] ?? 0), (pic[i+1]?.[j+1] ?? 0)
            ];
            const num = parseInt(bits.join(''), 2)
            out[i][j] = map[num];
        }
    }

    return out;
};

const count = (pic) => {
    let sum = 0;

    const ik = Object.keys(pic).map(Number);
    const imn = Math.min(...ik);
    const imx = Math.max(...ik);

    const jk = Object.keys(pic[0]).map(Number);
    const jmn = Math.min(...jk);
    const jmx = Math.max(...jk);

    for (let i = imn; i <= imx; i++) {
        for (let j = jmn; j <= jmx; j++) {
             if (pic[i]?.[j]) sum++;
        }
    }

    return sum;
};

const print = (pic) => {
    const ik = Object.keys(pic).map(Number);
    const imn = Math.min(...ik);
    const imx = Math.max(...ik);

    const jk = Object.keys(pic[0]).map(Number);
    const jmn = Math.min(...jk);
    const jmx = Math.max(...jk);

    const out = [];
    for (let i = imn; i <= imx; i++) {
        const row = [];
        for (let j = jmn; j <= jmx; j++) {
             row.push(pic[i][j] ? '#' : '.');
        }

        out.push(row.join(''));
    }

    console.log(out.join('\n'));
};

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/);

    const map = data[0].split('').map(x => x === '#' ? 1 : 0);
    const pic = Object.fromEntries(data.slice(2).map((row, i) =>
        [i, Object.fromEntries(row.split('').map((col, j) => [j, col === '#' ? 1 : 0]))]));

    const pic2 = trans(pic, map);
    const pic3 = trans(pic2, map);

    print(pic);
    print(pic2);
    print(pic3);

    console.log(count(pic));
    console.log(count(pic2));
    console.log(count(pic3));
};

await main();
