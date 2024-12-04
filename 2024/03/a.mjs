import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
    return [...m].map(i => Number(i[1])*Number(i[2]));
});

let sum = 0;

for (const d of data) {
    sum += d.reduce((p, c) => p + c, 0);
}

console.log('result', sum);
