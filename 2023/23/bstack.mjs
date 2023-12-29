import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

//console.log(data);

const startc = data[0].findIndex(c => c === '.');
const q = [{ r: 0, c: startc, len: 0 }];

let max = 0;

while (q.length) {
    const i = q.pop();
    if (i.cleanup) {
        const { r, c } = i;
        data[r][c] = '.';
    } else {
        const { r, c, len } = i;

        if (r < 0 || r >= data.length || c < 0 || c >= data[0].length) {
            continue;
        }
        if (data[r][c] === '#' || data[r][c] === 'O') {
            continue;
        }

        if (r === data.length - 1) {
            if (len > max) {
                max = len;
                console.log(max);
            }
            continue;
        }

        data[r][c] = 'O';
        q.push({ cleanup: true, r, c });

        q.push({ r: r - 1, c, len: len + 1 });
        q.push({ r: r + 1, c, len: len + 1 });
        q.push({ r, c: c - 1, len: len + 1 });
        q.push({ r, c: c + 1, len: len + 1 });
    }
}

console.log('result', max);
