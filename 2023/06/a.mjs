import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const [time, dist] = input.trimEnd().split(/\r?\n/).map(r => r.split(/\s+/).toSpliced(0, 1).map(Number));

console.log(time, dist);

const calc = (hold, total) => (total - hold) * hold;

let score = 1;

for (let g = 0; g < time.length; g++) {
    for (let hold = 0; hold < time[g]; hold++) {
        if (calc(hold, time[g]) > dist[g]) {
            score *= time[g] - 2 * hold + 1
            break;
        }
    }
}

console.log('result', score);
