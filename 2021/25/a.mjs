'use strict';

import fs from 'fs/promises';

const print = (s, d) => console.log(d.map(row => row.join('')).join('\n'), `\n------- ${s}\n`);

const main = async () => {
    const input = await fs.readFile('input', 'utf8');
    let d = input.trimEnd().split(/\r?\n/).map(row => row.split(''));

    print('I', d);

    let moved = true;
    let step = 0;
    while (moved) {
        moved = false;

        for (let r = 0; r < d.length; r++) {
            for (let c = 0; c < d[0].length; c++) {
                    if (d[r][c] === '>' && d[r][c === d[0].length - 1 ? 0 : c + 1] === '.') {
                    d[r][c === d[0].length - 1 ? 0 : c + 1] = '-';
                    d[r][c] = 'o';
                    moved = true;
                }
            }
        }

        d = d.map(row => row.map(c => c === '-' ? '>' : c === '|' ? 'v' : c === 'o' ? '.' : c));

        for (let r = 0; r < d.length; r++) {
            for (let c = 0; c < d[0].length; c++) {
                if (d[r][c] === 'v' && d[r === d.length - 1 ? 0 : r + 1][c] === '.') {
                    d[r === d.length - 1 ? 0 : r + 1][c] = '|';
                    d[r][c] = 'o';
                    moved = true;
                }
            }
        }

        d = d.map(row => row.map(c => c === '-' ? '>' : c === '|' ? 'v' : c === 'o' ? '.' : c));
        print(step, d);

        step++;
    }

    console.log(step);
};

await main();
