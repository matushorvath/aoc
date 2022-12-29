'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = Object.fromEntries(input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Valve (.+) has flow rate=(.+); tunnels? leads? to valves? (.+)/);
        return [m[1], {
            id: m[1],
            rate: Number(m[2]),
            neig: m[3].split(', ')
        }];
    }));

    const stack = [{ rel: 0, rate: 0, time: 0, pos: 'AA', open: new Set() }];
    const seen = {};

    let maxrel = 0;

    let s;
    while (s = stack.pop()) {
        const key = `${s.pos} ${[...s.open].join(' ')}`;
        if (seen[key] && seen[key].time <= s.time && seen[key].rel >= s.rel) continue;

        if (!seen[key]) seen[key] = { time: Infinity, rel: -Infinity };
        if (seen[key].time > s.time) seen[key].time = s.time;
        if (seen[key].rel < s.rel) seen[key].rel = s.rel;

        if (s.time === 30) {
            if (s.rel > maxrel) {
                maxrel = s.rel;
                console.log(maxrel, 'stack', stack.length);
            }
            continue;
        }

        if (data[s.pos].rate > 0 && !s.open.has(s.pos)) {
            stack.push({
                rel: s.rel + s.rate,
                rate: s.rate + data[s.pos].rate,
                time: s.time + 1,
                pos: s.pos,
                open: new Set([...s.open, s.pos])
            });
        }

        for (const n of data[s.pos].neig) {
            stack.push({
                rel: s.rel + s.rate,
                rate: s.rate,
                time: s.time + 1,
                pos: n,
                open: s.open
            });
        }
    }

    console.log(maxrel);
};

await main();
