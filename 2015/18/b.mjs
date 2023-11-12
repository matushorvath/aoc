import fs from 'fs/promises';

// const input = await fs.readFile('example', 'utf8');
// const maxitr = 4;
const input = await fs.readFile('input', 'utf8');
const maxitr = 100;

let data = input.trimEnd().split(/\r?\n/).map(r => r.split('').map(c => c === '#'));

//console.log(data);

const ngbr = (data, r, c) =>
    (data[r - 1]?.[c - 1] ? 1 : 0) +
    (data[r - 1]?.[c    ] ? 1 : 0) +
    (data[r - 1]?.[c + 1] ? 1 : 0) +
    (data[r    ]?.[c - 1] ? 1 : 0) +
    (data[r    ]?.[c + 1] ? 1 : 0) +
    (data[r + 1]?.[c - 1] ? 1 : 0) +
    (data[r + 1]?.[c    ] ? 1 : 0) +
    (data[r + 1]?.[c + 1] ? 1 : 0);

const nst = (data, r, c) => {
    if (data[r][c]) {
        const n = ngbr(data, r, c);
        return n === 2 || n === 3;
    } else {
        return ngbr(data, r, c) === 3;
    }
};

for (let itr = 0; itr < maxitr; itr++) {
    const nd = [...Array(data.length)].map((_, r) => [...Array(data[0].length)].map((_, c) => nst(data, r, c)));
    data = nd;
    data[0][0] = data[0][data[0].length - 1] = data[data.length - 1][0] = data[data.length - 1][data[0].length - 1] = true;
}

const cnt = data.reduce((p1, c1) => p1 + c1.reduce((p2, c2) => p2 + (c2 ? 1 : 0), 0), 0);

console.log('result', data, cnt);
