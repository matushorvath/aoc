import fs from 'fs/promises';

//const input = await fs.readFile('exampleb', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/)[0].split(', ').map(s => {
    return {
        dir: s[0] === 'L' ? [1, -1] : [-1, 1],
        len: Number(s.substring(1))
    };
});

//console.log(data);

const city = {};
const setc = (x, y) => {
    (city[x] ?? (city[x] = {}))[y] = true;
};

let aim = [0, -1];
let loc = [0, 0];

alg: for (const { dir, len } of data) {
    aim = [aim[1] * dir[0], aim[0] * dir[1]];

    for (let i = 0; i < len; i++) {
        loc[0] += aim[0];
        loc[1] += aim[1];
        if (city[loc[0]]?.[loc[1]]) break alg;
        setc(loc[0], loc[1]);
    }
}

console.log('result', loc, Math.abs(loc[0]) + Math.abs(loc[1]));

// 257 high
