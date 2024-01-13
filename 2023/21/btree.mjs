import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8'); const steps = 5000;
//const input = await fs.readFile('input', 'utf8'); const steps = 26501365;

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let start;
let dotcount = 0;

for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (data[r][c] === 'S') {
            start = [r, c];
            data[r][c] = '.';
        }
        if (data[r][c] === '.') {
            dotcount++;
        }
    }
}

//console.log(start);

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

const rdim = Math.ceil(2. * steps / data.length);
const cdim = Math.ceil(2. * steps / data.length);

const maxbits = Math.max(rdim, cdim).toString(2).length;

const root = { cnt: 0 };

const isHash = (r, c) => {
    const ridx = r.mod(data.length);
    const cidx = c.mod(data[0].length);
    return data[ridx][cidx] === '#';
};

const get = (r, c) => {
    const rbits = (r / data.length).toString(2).padStart(maxbits, '0');
    const cbits = (c / data[0].length).toString(2).padStart(maxbits, '0');

    let curr = root;
    for (let bi = 0; bi < rbits.length; bi++) {
        if (curr === undefined || curr.cnt === 0) {
            return '.';
        }
        if (curr.cnt === dotcount) {
            return 'O';
        }

        const index = (rbits[bi] === '0' ? 0 : 1) * 2 + (cbits[bi] === '0' ? 0 : 1);
        curr = curr.dta[index];
    }

    return curr.dta[ridx][cidx];
};

const set = (r, c) => {
    const rbits = (r / data.length).toString(2).padStart(maxbits, '0');
    const cbits = (c / data[0].length).toString(2).padStart(maxbits, '0');

    const path = [];

    let curr = root;
    for (let bi = 0; bi < rbits.length; bi++) {
        if (curr.cnt === dotcount) {
            return;
        }

        const index = (rbits[bi] === '0' ? 0 : 1) * 2 + (cbits[bi] === '0' ? 0 : 1);

        if (curr.dta === undefined) {
            curr.dta = [];
        }
        if (curr.dta[index] === undefined) {
            curr.dta[index] = { cnt: 0 };
        }

        path.push(curr);
        curr = curr.dta[index];
    }

    const ridx = r.mod(data.length);
    const cidx = c.mod(data[0].length);

    if (curr === undefined) {
        curr = { cnt: 0 };
    }
    if (curr.dta === undefined) {
        curr.dta = new Array(data.length).fill().map(
            () => new Array(data[0].length).fill('.'));
    }

    curr.dta[ridx][cidx] = 'O';

    curr.cnt++;
    for (const v of path) {
        v.cnt++;
    }
};

const offsetStart = [
    (steps / data.length) * data.length + start[0],
    (steps / data[0].length) * data[0].length + start[1]
];

let positions = { [offsetStart[0]]: { [offsetStart[1]]: offsetStart } };

const addposcond = (ps, r, c) => {
    if (!isHash(r, c)) {
    }
};

const addposcond = (ps, r, c) => {
    if (r >= 0 && c >= 0 && r < data.length && c < data[0].length && data[r][c] !== '#') {
        const key = poskey(r, c);
        ps[key] = [r, c];
    }
};

for (let i = 0; i < steps; i++) {
    const npositions = {};
    for (const pos of Object.values(positions)) {
        addposcond(npositions, pos[0], pos[1] - 1);
        addposcond(npositions, pos[0], pos[1] + 1);
        addposcond(npositions, pos[0] - 1, pos[1]);
        addposcond(npositions, pos[0] + 1, pos[1]);
    }

    //if (i % 100 === 0) 
    console.log(i, Object.values(npositions).filter(p => p[0] === 0).length - Object.keys(positions).filter(p => p[0] === 0).length);

    positions = npositions;
}

console.log('result', Object.keys(positions).length);
