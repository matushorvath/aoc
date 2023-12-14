import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

console.log(data);

let changed = true;
while (changed) {
    changed = false;
    for (let r = 1; r < data.length; r++) {
        for (let c = 0; c < data[r].length; c++) {
            if (data[r][c] === 'O') {
                if (data[r - 1][c] === '.') {
                    data[r - 1][c] = 'O';
                    data[r][c] = '.';
                    changed = true;
                }
            }
        }
    }

    console.log(data.map(r => r.join('')).join('\n'));
    console.log();
}

let score = 0;
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (data[r][c] === 'O') {
            score += (data.length - r);
        }
    }
}

console.log('result', score);
