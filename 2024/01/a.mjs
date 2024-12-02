import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(/ +/).map(Number));

//console.log(data);

const l = data.map(([a, b]) => a).sort((i, j) => i - j);
const r = data.map(([a, b]) => b).sort((i, j) => i - j);

console.log(l);
console.log(r);

let sum = 0;

for (let i = 0; i < l.length; i++) {
    sum += Math.abs(l[i] - r[i]);
}

console.log('result', sum);
