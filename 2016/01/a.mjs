import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/)[0].split(', ').map(s => {
    return {
        dir: s[0] === 'L' ? [1, -1] : [-1, 1],
        len: Number(s.substring(1))
    };
});

//console.log(data);

let aim = [0, -1];
let loc = [0, 0];

for (const { dir, len } of data) {
    aim = [aim[1] * dir[0], aim[0] * dir[1]];
    loc = [loc[0] + aim[0] * len, loc[1] + aim[1] * len];
}

console.log('result', Math.abs(loc[0]) + Math.abs(loc[1]));
