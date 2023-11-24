import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/);
    return {
        letters: m[1].split('').filter(c => c !== '-'),
        id: Number(m[2]),
        checksum: m[3]
    };
});

//console.log(data);

const common = data.map(r => r.letters.reduce((p, c) => {
    p[c] = (p[c] ?? 0) + 1;
    return p;
}, {}));

//console.log(Object.entries(common[0]));

const occurs = common.map(r => Object.entries(r).sort((a, b) => a[1] === b[1] ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : b[1] - a[1]));

//console.log(occurs);

const sums = occurs.map(r => r.map(c => c[0]).slice(0, 5).join(''));

//console.log(sums);

const real = data.map((d, i) => d.checksum === sums[i]);

//console.log(real);

const sum = data.reduce((p, c, i) => p + (real[i] ? c.id : 0), 0);

console.log('result', sum);
