'use strict';

const fs = require('fs/promises');

const normalize = (p, d) => {
    if (p.x === -1 && p.y >= 50 && p.y < 100) { // 1
        p.x = 150 + (p.y - 50); p.y = 0;
        d.x = d.y; d.y = -d.x || 0; // R
    } else if (p.x === -1 && p.y >= 100 && p.y < 150) { // 2
        p.x = 199; p.y = p.y - 100;
    } else if (p.y === 49 && p.x >= 0 && p.x < 50) { // 3
        p.x = 149 - p.x; p.y = 0;
        d.x = d.x; d.y = -d.y || 0; // -Y
    } else if (p.y === 150 && p.x >= 0 && p.x < 50) { // 4
        p.x = 149 - p.x; p.y = 99;
        d.x = d.x; d.y = -d.y || 0; // -Y
    } else if (p.x === 50 && p.y >= 100 && p.y < 150) { // 5
        p.x = 50 + (p.y - 100); p.y = 99;
        d.x = d.y; d.y = -d.x || 0; // R
    } else if (p.y === 49 && p.x >= 50 && p.x < 100) { // 6
        p.x = 100; p.y = p.x - 50;
        d.x = -d.y || 0; d.y = d.x; // L
    } else if (p.y === 100 && p.x >= 50 && p.x < 100) { // 7
        p.x = 49; p.y = 100 + (p.x - 50);
        d.x = -d.y || 0; d.y = d.x; // L
    } else if (p.x === 99 && p.y >= 0 && p.y < 50) { // 8
        p.x = 50 + p.y; p.y = 50;
        d.x = d.y; d.y = -d.x || 0; // R
    } else if (p.y === -1 && p.x >= 100 && p.x < 150) { // 9
        p.x = 49 - (p.x - 100); p.y = 50;
        d.x = d.x; d.y = -d.y || 0; // -Y
    } else if (p.y === 100 && p.x >= 100 && p.x < 150) { // 10
        p.x = 49 - (p.x - 100); p.y = 149;
        d.x = d.x; d.y = -d.y || 0; // -Y
    } else if (p.x === 150 && p.y >= 50 && p.y < 100) { // 11
        p.x = 150 + (p.y - 50); p.y = 49;
        d.x = d.y; d.y = -d.x || 0; // R
    } else if (p.y === -1 && p.x >= 150 && p.x < 200) { // 12
        p.x = 0; p.y = 50 + p.x - 150;
        d.x = -d.y || 0; d.y = d.x; // L
    } else if (p.y === 50 && p.x >= 150 && p.x < 200) { // 13
        p.x = 149; p.y = 50 + (p.x - 150);
        d.x = -d.y || 0; d.y = d.x; // L
    } else if (p.x === 200 && p.y >= 0 && p.y < 50) { // 14
        p.x = 0; p.y = 100 + p.y;
    } else {
        return false;
    }
    return true;
};

const scoredir = d => d.x === 0 ? (-d.y + 1) : (-d.x + 2);

const run = async (map, inst) => {
    let p = { x: 0, y: 0 };
    let d = { x: 0, y: 1 };

    while (map[p.x][p.y] !== '.') p.y++;

    //console.log(p, scoredir(d));

    for (const i of inst) {
        if (i === 'L') {
            d = { x: -d.y || 0, y: d.x }; // L
        } else if (i === 'R') {
            d = { x: d.y, y: -d.x || 0 }; // R
        } else {
            for (let delta = 0; delta < i; delta++) {
                const svp = { ...p };
                const svd = { ...d };

                p.x += d.x; p.y += d.y;
                normalize(p, d);

                if (map[p.x][p.y] === '#') {
                    p = svp;
                    d = svd;
                    break;
                }
            }
        }

        //console.log(i, p, scoredir(d));
    }

    return [p, d];
};

exports.run = run;

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const [part1, part2] = input.trimEnd().split(/\r?\n\r?\n/);

    const map = part1.split(/\r?\n/).map(r => r.split(''));
    const inst = part2.match(/\d+|[LR]/g).map(i => isNaN(Number(i)) ? i : Number(i));

    const [p, d] = await run(map, inst);

    //console.log(map, inst, p, d);
    console.log((p.x + 1) * 1000 + (p.y + 1) * 4 + scoredir(d));
    //console.log(d, scoredir(d));
};

if (process.env.NODE_ENV !== 'test') {
    main().catch(e => console.log(e));
}

// WA 156023 high
// WA 83205 high
