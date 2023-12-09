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

    //console.log(ns, depth, firsts, lasts);

    let mul = 1;
    let pres = 0;
    for (let i = 0; i < firsts.length; i++) {
        pres = pres + mul * firsts[i];
        mul = -mul;
    }

    console.log(pres, JSON.stringify(s));
    res += pres;
}

console.log('result', res);

// 2075724761 high
// -16350 WA
// 52 WA
