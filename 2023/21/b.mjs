import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8'); const steps = 5000;
//const input = await fs.readFile('input', 'utf8'); const steps = 26501365;

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

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

const poskey = (r, c) => r * data.length + c;
let positions = { [poskey(...start)]: start };

const addposcond = (ps, r, c) => {
    const dr = r.mod(data.length);
    const dc = c.mod(data[0].length);

    if (data[dr][dc] !== '#') {
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
