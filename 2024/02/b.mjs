import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(' ').map(Number));

console.log(data);

let numSafe = 0;

for (const row of data) {
    for (let removeIdx = -1; removeIdx < row.length; removeIdx++) {
        let newRow = row;
        if (removeIdx >= 0) {
            newRow = row.toSpliced(removeIdx, 1);
        }

        let prev;
        let dir;
        let safe = true;

        for (const item of newRow) {
            if (prev !== undefined) {
                if (dir === undefined) {
                    dir = item > prev ? 1 : -1;
                }

                if ((item - prev) * dir > 3 || (item - prev) * dir < 1) {
                    safe = false;
                    break;
                }
            }
            prev = item;
        }

        if (safe) {
            numSafe++;
            break;
        }
    }
    console.log(numSafe);
}

console.log('result', numSafe);

// low 597
// low 599
