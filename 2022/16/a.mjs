'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = Object.fromEntries(input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Valve (.+) has flow rate=(.+); tunnels? leads? to valves? (.+)/);
        return [m[1], {
            v: m[1],
            f: Number(m[2]),
            t: m[3].split(', ')
        }];
    }));

    let maxr = 0;

    const stack = [{ r: 0, f: 0, t: 0, p: 'AA', o: new Set() }];
    while (stack.length > 0) {
        const s = stack.pop();

        if (s.t >= 30) {
            if (s.r > maxr) {
                maxr = s.r;
                console.log(maxr);
            }
            continue;
        }

        if (!s.o.has(s.p) && data[s.p].f > 0) {
            stack.push({ r: s.r + s.f, f: s.f + data[s.p].f, t: s.t + 1, p: s.p, o: new Set([...s.o, s.p]) });
        }

        for (const n of data[s.p].t) {
            stack.push({ r: s.r + s.f, f: s.f, t: s.t + 1, p: n, o: s.o });
        }
    }

    console.log(maxr);
};

await main();
