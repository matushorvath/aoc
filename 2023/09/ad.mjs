import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(/\s+/).map(Number));

console.log(data);

let res = 0;

for (const s of data) {
    let ns = s;
    let depth = 0;

    const firsts = [];
    const lasts = [];
    while (ns.some(n => n !== 0)) {
        firsts.push(ns[0]);
        lasts.push(ns.at(-1));
        ns = ns.map((_, i) => ns[i + 1] - ns[i]).slice(0, -1);
        depth++;
    }

    console.log(ns, depth, firsts, lasts);

    res += lasts.reduce((p, c) => p + c, 0);
}

console.log('result', res);
