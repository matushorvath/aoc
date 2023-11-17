import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const loc = [1, 1];

const pad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (const d of data) {
    for (const i of d) {
        switch (i) {
            case 'U': loc[1] = Math.max(0, loc[1] - 1); break;
            case 'D': loc[1] = Math.min(2, loc[1] + 1); break;
            case 'L': loc[0] = Math.max(0, loc[0] - 1); break;
            case 'R': loc[0] = Math.min(2, loc[0] + 1); break;
        }
    }
    console.log(loc, pad[loc[1]][loc[0]]);
}

//console.log('result', );
// 26562 low