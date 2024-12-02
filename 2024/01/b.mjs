import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(/ +/).map(Number));

//console.log(data);

const l = data.map(([a, b]) => a);
const r = data.map(([a, b]) => b).reduce((p, c) => ({ ...p, [c]: (p[c] ?? 0) + 1 }), {});

console.log(l);
console.log(r);

let sum = 0;

for (let i = 0; i < l.length; i++) {
    sum += l[i] * (r[l[i]] ?? 0);
}

console.log('result', sum);
