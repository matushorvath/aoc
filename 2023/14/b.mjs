import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

let data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

console.log(data);

const north = (data) => {
    let changed = true;
    while (changed) {
        changed = false;
        for (let r = 1; r < data.length; r++) {
            for (let c = 0; c < data[r].length; c++) {
                if (data[r][c] === 'O') {
                    if (data[r - 1][c] === '.') {
                        data[r - 1][c] = 'O';
                        data[r][c] = '.';
                        changed = true;
                    }
                }
            }
        }
    }
};

const rot = (array) => [...array[0].keys()].map(c => array.map(r => r[c]).reverse());

let iter = 0;
const prev = {};

let init;
let period;

while (true) {
    let key = data.map(r => r.join('')).join();
    if (prev[key] !== undefined) {
        console.log('init', init = prev[key]);
        console.log('period', period = iter - prev[key]);
        break;
    }
    prev[key] = iter;

    north(data);
    data = rot(data);

    north(data);
    data = rot(data);

    north(data);
    data = rot(data);

    north(data);
    data = rot(data);

    iter++;

    console.log(data.map(r => r.join('')).join('\n'));
    console.log();
}

const solIter = (1000000000 - init) % period
console.log(solIter);

const solStr = Object.entries(prev).filter(([key, value]) => value === init + solIter)[0][0];
console.log(solStr);

const sol = solStr.split(',').map(r => r.split(''));
console.log(sol.map(r => r.join('')).join('\n'));
console.log();

let score = 0;
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (sol[r][c] === 'O') {
            score += (data.length - r);
        }
    }
}

console.log(score);
