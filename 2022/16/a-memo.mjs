'use strict';

import fs from 'fs/promises';
import BitSet from 'mnemonist/bit-set.js';

const main = async () => {
    const input = await fs.readFile('example', 'utf8');
    //const input = await fs.readFile('input', 'utf8');

    let vdict = { 'AA': 0};
    let nextvdict = 1;

    const data = input.trimEnd().split(/\r?\n/).reduce((a, l) => {
        const m = l.match(/Valve (.+) has flow rate=(.+); tunnels? leads? to valves? (.+)/);
        const vid = vdict[m[1]] ?? (vdict[m[1]] = nextvdict++);
        a[vid] = {
            v: vid,
            f: Number(m[2]),
            t: m[3].split(', ').map(n => vdict[n] ?? (vdict[n] = nextvdict++))
        };
        return a;
    }, []);

    //console.log(vdict, data);

    let maxr = 0;

    // position -> open_valves -> max theoretical release
    const opt = [];

    const stack = [{ r: 0, f: 0, t: 0, p: 0, o: new BitSet(Object.keys(vdict).length) }];

    while (stack.length > 0) {
        const s = stack.pop();

        if (s.t >= 30) {
            if (s.r > maxr) {
                maxr = s.r;
                console.log(maxr);
            }
            continue;
        }

        // cut suboptimal subsolutions
        const theo_flow = s.r + (30 - s.t) * s.f;
        const open = s.o.array.reduce((p, c) => p + ',' + c, '');
        if (opt[s.p]) {
            if (opt[s.p][open] > theo_flow) {
                continue;
            }
        }
        if (!opt[s.p]) opt[s.p] = {};
        opt[s.p][open] = theo_flow;

        if (!s.o.test(s.p) && data[s.p].f > 0) {
            const newo = new BitSet(Object.keys(vdict).length);
            s.o.forEach((b, i) => newo.set(i, b));
            newo.set(s.p, 1);
            stack.push({ r: s.r + s.f, f: s.f + data[s.p].f, t: s.t + 1, p: s.p, o: newo });
        }

        for (const n of data[s.p].t) {
            stack.push({ r: s.r + s.f, f: s.f, t: s.t + 1, p: n, o: s.o });
        }
    }

    console.log(maxr);
};

await main();
