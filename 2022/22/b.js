'use strict';

const fs = require('fs/promises');

const normalize = (p, d) => {
    const op = { ...p };
    const od = { ...d };

    if (op.x === -1 && op.y >= 50 && op.y < 100) { // 1
        p.x = 150 + (op.y - 50); p.y = 0;
        d.x = od.y; d.y = -od.x || 0; // R
    } else if (op.x === -1 && op.y >= 100 && op.y < 150) { // 2
        p.x = 199; p.y = op.y - 100;
    } else if (op.y === 49 && op.x >= 0 && op.x < 50) { // 3
        p.x = 149 - op.x; p.y = 0;
        d.x = od.x; d.y = -od.y || 0; // -Y
    } else if (op.y === 150 && op.x >= 0 && op.x < 50) { // 4
        p.x = 149 - op.x; p.y = 99;
        d.x = od.x; d.y = -od.y || 0; // -Y
    } else if (op.x === 50 && op.y >= 100 && op.y < 150) { // 5
        p.x = 50 + (op.y - 100); p.y = 99;
        d.x = od.y; d.y = -od.x || 0; // R
    } else if (op.y === 49 && op.x >= 50 && op.x < 100) { // 6
        p.x = 100; p.y = op.x - 50;
        d.x = -od.y || 0; d.y = od.x; // L
    } else if (op.y === 100 && op.x >= 50 && op.x < 100) { // 7
        p.x = 49; p.y = 100 + (op.x - 50);
        d.x = -od.y || 0; d.y = od.x; // L
    } else if (op.x === 99 && op.y >= 0 && op.y < 50) { // 8
        p.x = 50 + op.y; p.y = 50;
        d.x = od.y; d.y = -od.x || 0; // R
    } else if (op.y === -1 && op.x >= 100 && op.x < 150) { // 9
        p.x = 49 - (op.x - 100); p.y = 50;
        d.x = od.x; d.y = -od.y || 0; // -Y
    } else if (op.y === 100 && op.x >= 100 && op.x < 150) { // 10
        p.x = 49 - (op.x - 100); p.y = 149;
        d.x = od.x; d.y = -od.y || 0; // -Y
    } else if (op.x === 150 && op.y >= 50 && op.y < 100) { // 11
        p.x = 150 + (op.y - 50); p.y = 49;
        d.x = od.y; d.y = -od.x || 0; // R
    } else if (op.y === -1 && op.x >= 150 && op.x < 200) { // 12
        p.x = 0; p.y = 50 + op.x - 150;
        d.x = -od.y || 0; d.y = od.x; // L
    } else if (op.y === 50 && op.x >= 150 && op.x < 200) { // 13
        p.x = 149; p.y = 50 + (op.x - 150);
        d.x = -od.y || 0; d.y = od.x; // L
    } else if (op.x === 200 && op.y >= 0 && op.y < 50) { // 14
        p.x = 0; p.y = 100 + op.y;
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
