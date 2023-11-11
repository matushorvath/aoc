import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/\w+: capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
    return m.slice(1).map(Number);
});

console.log(data);

let max = -Infinity;
let im, jm, km, lm;

for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
        for (let k = 0; k <= 100 - i - j; k++) {
            const l = 100 - i - j - k;

            const cal = i * data[0][4] + j * data[1][4] + k * data[2][4] + l * data[3][4];
            if (cal > 500) continue;

            const comp0 = i * data[0][0] + j * data[1][0] + k * data[2][0] + l * data[3][0];
            const comp1 = i * data[0][1] + j * data[1][1] + k * data[2][1] + l * data[3][1];
            const comp2 = i * data[0][2] + j * data[1][2] + k * data[2][2] + l * data[3][2];
            const comp3 = i * data[0][3] + j * data[1][3] + k * data[2][3] + l * data[3][3];

            if (comp0 < 0 || comp1 < 0 || comp2 < 0 || comp3 < 0) continue;

            const score = comp0 * comp1 * comp2 * comp3;
            if (score > max && cal === 500) {
                im = i; jm = j; km = k; lm = l;
                max = score;
            }
        }
    }
}

console.log(im, jm, km, lm);

console.log('result', max);

// high 3458145636

