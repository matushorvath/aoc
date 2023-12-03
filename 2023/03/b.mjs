import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/);

//console.log(data.join('\n'));

const detectPart = (data, r, cb) => {
    let ce;
    for (let i = cb; i < data[r].length; i++) {
        if (!data[r][i].match(/\d/)) {
            ce = i - 1;
            break;
        }
    }
    ce = ce ?? data[r].length;

    const num = Number(data[r].substring(cb, ce + 1));

    const cornerb = Math.max(0, cb - 1);
    const cornere = Math.min(data[r].length - 1, ce + 1);

    const gears = [];

    if (r < data.length - 1) {
        for (let i = cornerb; i < cornere + 1; i++) {
            if (data[r + 1][i] === '*') {
                gears.push([num, r + 1, i]);
            }
        }
    }
    if (r > 0) {
        for (let i = cornerb; i < cornere + 1; i++) {
            if (data[r - 1][i] === '*') {
                gears.push([num, r - 1, i]);
            }
        }
    }
    if (ce < data[r].length - 1) {
        if (data[r][ce + 1] === '*') {
            gears.push([num, r, ce + 1]);
        }
    }
    if (cb > 0) { 
        if (data[r][cb - 1] === '*') {
            gears.push([num, r, cb - 1]);
        }
    }
    return [gears, ce];
};

const found = {};

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j].match(/\d/)) {
            const [gears, nj] = detectPart(data, i, j);
            j = nj;
            //console.log(gears);
            for (const gear of gears) {
                const key = `${gear[1]},${gear[2]}`;
                if (found[key] === undefined) found[key] = [];
                found[key].push(gear[0]);
            }
        }
    }
}

//console.log(JSON.stringify(found, undefined, 2));

const two = Object.values(found).filter(v => v.length === 2);
const res = two.reduce((p, c) => p + c[0] * c[1], 0);

//console.log(JSON.stringify(two, undefined, 2));

console.log('result', res);


// 62976600 wa low
