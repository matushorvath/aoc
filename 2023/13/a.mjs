import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n\r?\n/).map(b => b.split(/\r?\n/).map(r => r.split('')));

console.log(data);

let score = 0;

for (let di = 0; di < data.length; di++) {
    const d = data[di];
    console.log('case', di);

    for (let r = 0; r < d.length - 1; r++) {
        let match = true;
        for (let c = 0; c < d[0].length; c++) {
            if (d[r][c] !== d[r + 1][c]) {
                match = false;
                break;
            }
        }
        if (match) {
            const mni = Math.min(d.length - r - 1, r + 1);
            row_cycle: for (let i = 1; i < mni; i++) {
                for (let c = 0; c < d[0].length; c++) {
                    if (d[r - i][c] !== d[r + 1 + i][c]) {
                        match = false;
                        break row_cycle;
                    }
                }
            }
        }
        if (match) {
            console.log('r', r);
            score = score + 100 * (r + 1);
        }
    }

    for (let c = 0; c < d[0].length - 1; c++) {
        let match = true;
        for (let r = 0; r < d.length; r++) {
            if (d[r][c] !== d[r][c + 1]) {
                match = false;
                break;
            }
        }
        if (match) {
            const mni = Math.min(d[0].length - c - 1, c + 1);
            col_cycle: for (let i = 1; i < mni; i++) {
                for (let r = 0; r < d.length; r++) {
                    if (d[r][c - i] !== d[r][c + 1 + i]) {
                        match = false;
                        break col_cycle;
                    }
                }
            }
        }
        if (match) {
            console.log('c', c);
            score = score + (c + 1);
        }
    }
}

console.log('result', score);
