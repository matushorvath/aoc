import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

console.log(data);

const counts = data.reduce((p, c) => {
    for (let i = 0; i < c.length; i++) {
        if (!p[i]) p[i] = {};
        p[i][c[i]] = (p[i][c[i]] ?? 0) + 1;
    }
    return p;
}, []);

console.log(counts);

const max = counts.map(i => Object.entries(i).sort((a, b) => b[1] - a[1])[0][0]);

console.log('result', max.join(''));
