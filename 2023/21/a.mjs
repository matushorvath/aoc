import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8'); const steps = 6;
const input = await fs.readFile('input', 'utf8'); const steps = 64;

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let start;
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (data[r][c] === 'S') {
            start = [r, c];
        }
    }
}

//console.log(start);

const poskey = (r, c) => r * data.length + c;
let positions = { [poskey(...start)]: start };

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

    console.log(i, npositions.length);

    positions = npositions;
}

console.log('result', Object.keys(positions).length);
