'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(l => l.split(' -> ').map(p => p.split(',').map(Number)));

    const f = [];
    const setf = (x, y, v) => { (f[x] ?? (f[x] = []))[y] = v; };

    let max_down = 0;

    for (const path of data) {
        for (let i = 1; i < path.length; i++) {
            if (path[i - 1][0] === path[i][0]) {
                const f = Math.min(path[i - 1][1], path[i][1]);
                const t = Math.max(path[i - 1][1], path[i][1]);
                for (let j = f; j <= t; j++) {
                    setf(path[i - 1][0], j, '#');
                    if (j > max_down) max_down = j;
                }
            } else {
                const f = Math.min(path[i - 1][0], path[i][0]);
                const t = Math.max(path[i - 1][0], path[i][0]);
                for (let j = f; j <= t; j++) {
                    setf(j, path[i - 1][1], '#');
                }
                if (path[i - 1][1] > max_down) max_down = path[i - 1][1];
            }
        }
    }

    const floor = max_down + 1;

    let sand_cnt = 0;

    while (true) {
    //for (let x = 0; x < 10; x++) {
        let s = [500, 0];

        while (true) {
            if (s[1] === floor) {
                break;
            } else if (!f[s[0]]?.[s[1] + 1]) {
                s[1]++;
            } else if (!f[s[0] - 1]?.[s[1] + 1]) {
                s[0]--; s[1]++;
            } else if (!f[s[0] + 1]?.[s[1] + 1]) {
                s[0]++; s[1]++;
            } else break;
        }

        setf(s[0], s[1], 'o');
        sand_cnt++;

        if (s[0] === 500 && s[1] === 0) break;
    }

    console.log(data);

    for (let y = 0; y < 12; y++) {
        let out = '';
        for (let x = 490; x < 510; x++) {
            out += f[x]?.[y] ?? '.';
        }
        console.log(out);
    }

    //console.log(f.map(r => r.map(c => c ?? '.').join('')).reverse().slice(0, 20).join('\n'));

    console.log(sand_cnt);
};

await main();
