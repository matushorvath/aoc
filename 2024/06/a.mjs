import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));
//console.log(data);

let pr, pc;

find: for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (data[r][c] === '^') {
            pr = r;
            pc = c;
            break find;
        }
    }
}

//console.log(pr, pc);

let dr = -1, dc = 0;
data[pr][pc] = 'X';

let count = 1;

while (true) {
    const nr = pr + dr;
    const nc = pc + dc;

    //console.log(pr, pc, dr, dc);

    if (nr < 0 || nr >= data.length || nc < 0 || nc >= data[0].length) {
        break;
    }

    if (data[nr][nc] === '#') {
        [dr, dc] = [dc, -dr + 0];
    } else {
        pr = nr;
        pc = nc

        if (data[nr][nc] === '.') {
            data[nr][nc] = 'X';
            count++;
        }
    }
}

console.log(data.map(r => r.join('')).join('\n'));

console.log('result', count);

// 4987 low
