'use strict';

import fs from 'fs/promises';
import lcm from 'compute-lcm';

const makebls = (data) => {
    const bls = [];

    bls[0] = data.flatMap((r, x) => r.reduce((p, d, y) => {
        if (d === '>' || d === '<' || d === 'v' || d === '^') {
            return [...p, { d, x, y }];
        } else {
            return p;
        }
    }, []));

    const normx = x => (x - 1 + data.length - 2) % (data.length - 2) + 1;
    const normy = y => (y - 1 + data[0].length - 2) % (data[0].length - 2) + 1;

    const advance = bl => bl.map(({ d, x, y }) => {
        switch (d) {
            case '>': return { d, x, y: normy(y + 1) };
            case '<': return { d, x, y: normy(y - 1) };
            case 'v': return { d, x: normx(x + 1), y };
            case '^': return { d, x: normx(x - 1), y };
        }
    });

    const period = lcm(data.length - 2, data[0].length - 2);
    console.log('period', period);

    for (let i = 1; i < period; i++) {
        bls[i] = advance(bls[i - 1]);
    }

    return { period, bls };
};

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = input.trimEnd().split(/\r?\n/).map(r => r.split(''));

    const { period, bls } = makebls(data);

    const B = { x: 0, y: 1 };
    const E = { x: data.length - 1, y: data[0].length - 2 };

    const stack = [{ ...B, t: 0}];
    const seen = new Set();

    let patht = Infinity;

    let s;
    while (s = stack.pop()) {
        if (patht <= s.t) continue;

        const key = `${s.x} ${s.y} ${s.t % period}`;
        if (seen[key] <= s.t) continue;
        seen[key] = s.t;

        const thisbl = bls[s.t % period];
        if (thisbl.some(b => b.x === s.x && b.y === s.y)) {
            continue;
        }

        if (s.x === E.x && s.y === E.y) {
            patht = s.t;
            console.log(patht, 'stack', stack.length, 'seen', seen.length);
        }

        stack.push({ x: s.x, y: s.y, t: s.t + 1 });

        if (s.x > 0 && data[s.x - 1][s.y] !== '#') {
            stack.push({ x: s.x - 1, y: s.y, t: s.t + 1 });
        }
        if (s.y > 0 && data[s.x][s.y - 1] !== '#') {
            stack.push({ x: s.x, y: s.y - 1, t: s.t + 1 });
        }
        if (s.x < data.length - 1 && data[s.x + 1][s.y] !== '#') {
            stack.push({ x: s.x + 1, y: s.y, t: s.t + 1 });
        }
        if (s.y < data[0].length - 1 && data[s.x][s.y + 1] !== '#') {
            stack.push({ x: s.x, y: s.y + 1, t: s.t + 1 });
        }
    }

    console.log('>', patht);
};

await main();

// WA 701 high
// WA 639 high
// WA 634 high
