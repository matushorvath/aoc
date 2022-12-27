'use strict';

import fs from 'fs/promises';

const normalize = (map, p, d) => {
    if (p.x < 0 || p.y < 0 || p.x >= map.length || p.y >= map[p.x].length || map[p.x][p.y] === ' ') {
        p.x = d.x < 0 ? map.length - 1 : d.x > 0 ? 0 : p.x;
        p.y = d.y < 0 ? map[p.x].length - 1 : d.y > 0 ? 0 : p.y;

        while (!map[p.x]?.[p.y] || map[p.x][p.y] === ' ') {
            p.x += d.x; p.y += d.y;
        }
    }
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const [part1, part2] = input.trimEnd().split(/\r?\n\r?\n/);
    const map = part1.split(/\r?\n/).map(r => r.split(''));
    const inst = part2.match(/\d+|[LR]/g).map(i => isNaN(Number(i)) ? i : Number(i));

    const scoredir = d => d.x === 0 ? (-d.y + 1) : (-d.x + 2);

    let p = { x: 0, y: 0 };
    let d = { x: 0, y: 1 };

    while (map[p.x][p.y] !== '.') p.y++;

    //console.log(p, scoredir(d));

    for (const i of inst) {
        if (i === 'L') {
            d = { x: -d.y || 0, y: d.x };
        } else if (i === 'R') {
            d = { x: d.y, y: -d.x || 0 };
        } else {
            for (let delta = 0; delta < i; delta++) {
                p.x += d.x; p.y += d.y;
                normalize(map, p, d);

                if (map[p.x][p.y] === '#') {
                    p.x -= d.x; p.y -= d.y;
                    normalize(map, p, { x: -d.x, y: -d.y });
                    break;
                }
            }
        }

        //console.log(i, p, scoredir(d));
    }

    //console.log(map, inst, p, d);
    console.log((p.x + 1) * 1000 + (p.y + 1) * 4 + scoredir(d));
    //console.log(d, scoredir(d));
};

await main();

// WA 47318 low
