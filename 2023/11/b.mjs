import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');
let mul = 1000000;

let data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

const points = data.flatMap((r, ri) => r.flatMap((c, ci) => c === '#' ? [[ri, ci]] : []));

console.log(points);

for (let r = data.length - 1; r >= 0; r--) {
    if (data[r].every(e => e === '.')) {
        for (let p = 0; p < points.length; p++) {
            if (points[p][0] > r) {
                points[p][0] = points[p][0] + mul - 1;
            }
        }
    }
}

console.log(points);

for (let c = data[0].length; c >= 0 ; c--) {
    if (data.every((_, r) => data[r][c] === '.')) {
        for (let p = 0; p < points.length; p++) {
            if (points[p][1] > c) {
                points[p][1] = points[p][1] + mul - 1;
            }
        }
    }
}

console.log(points);

let sum = 0;

for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        sum += Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
    }
}

console.log('result', sum);
