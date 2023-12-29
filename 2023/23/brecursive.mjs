import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

let max = 0;

const go = (r, c, len) => {
    if (r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
        return;
    }
    if (data[r][c] === '#' || data[r][c] === 'O') {
        return;
    }

    if (r === data.length - 1) {
        if (len > max) {
            max = len;
            console.log(max);
        }
        return;
    }

    data[r][c] = 'O';

    go(r - 1, c, len + 1);
    go(r + 1, c, len + 1);
    go(r, c - 1, len + 1);
    go(r, c + 1, len + 1);

    data[r][c] = '.';
};

const startc = data[0].findIndex(c => c === '.');
go(0, startc, 0);

console.log('result', max);
