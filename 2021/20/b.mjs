'use strict';

import fs from 'fs/promises';

const trans = (pic, map, brd) => {
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
                (pic[i-1]?.[j-1] ?? brd), (pic[i-1]?.[j] ?? brd), (pic[i-1]?.[j+1] ?? brd),
                (pic[i]?.[j-1] ?? brd), (pic[i]?.[j] ?? brd), (pic[i]?.[j+1] ?? brd),
                (pic[i+1]?.[j-1] ?? brd), (pic[i+1]?.[j] ?? brd), (pic[i+1]?.[j+1] ?? brd)
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
    let pic = Object.fromEntries(data.slice(2).map((row, i) =>
        [i, Object.fromEntries(row.split('').map((col, j) => [j, col === '#' ? 1 : 0]))]));

    for (let x = 0; x < 50; x++) {
        print(pic);
        console.log('---');
        pic = trans(pic, map, x % 2 === 0 ? 0 : 1);
    }

    console.log(count(pic));
};

await main();

// 20330
// 47425