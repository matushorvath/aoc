import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [time, dist] = input.trimEnd().split(/\r?\n/).map(r => r.split(/\s+/).toSpliced(0, 1));

console.log(time, dist);

const calc = (hold, total) => (total - hold) * hold;

let score = 1;

const timeg = Number(time.join(''));
const distg = Number(dist.join(''));

for (let hold = 0; hold < timeg; hold++) {
    if (calc(hold, timeg) > distg) {
        score *= timeg - 2 * hold + 1
        break;
    }
}

console.log('result', score);
