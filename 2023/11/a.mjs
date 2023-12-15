import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

let data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let out = [];

for (let r = 0; r < data.length; r++) {
    if (data[r].every(e => e === '.')) {
        out.push([...data[r]]);
    }
    out.push([...data[r]]);
}

//console.log(1, out.map(r => r.join('')).join('\n'));

const rot = (array) => [...array[0].keys()].map(c => array.map(r => r[c]).reverse());

data = rot(out);
out = [];

//console.log(2, data.map(r => r.join('')).join('\n'));

for (let r = 0; r < data.length; r++) {
    if (data[r].every(e => e === '.')) {
        out.push([...data[r]]);
    }
    out.push([...data[r]]);
}

console.log(3, out.map(r => r.join('')).join('\n'));

const points = out.flatMap((r, ri) => r.flatMap((c, ci) => c === '#' ? [[ri, ci]] : []));

console.log(points);

let sum = 0;

for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        sum += Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
    }
}

console.log('result', sum);
