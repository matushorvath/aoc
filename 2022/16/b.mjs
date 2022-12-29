'use strict';

import { info } from 'console';
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

    const T = 26;

    const stack = [{ rel: 0, rate: 0, time: 0, pos1: 'AA', pos2: 'AA', open: new Set(), comment: [] }];
    const seen = {};

    let max;
    let maxtime = -Infinity;

    let processed = 0;

    let s;
    while (s = stack.shift()) {
        const key = `${s.pos1} ${s.pos2} ${[...s.open].sort().join(' ')}`;
        if (seen[key] && seen[key].length > 0 && seen[key].every(b => b.time <= s.time && b.rel >= s.rel)) continue;

        if (!seen[key]) seen[key] = [];
        seen[key] = seen[key].filter(b => b.time > s.time && b.rel < s.rel);
        if (seen[key].push({ time: s.time, rel: s.rel }));

        // const key = `${s.pos1} ${s.pos2} [${[...s.open].sort().join(' ')}]`;
        // const best_frel = seen[key];

        // const this_frel = s.rel + s.rate * (T - s.time);
        // if (best_frel !== undefined && best_frel >= this_frel) continue;
        // seen[key] = this_frel;

        if (s.time > maxtime) {
            maxtime = s.time;
            console.log(s.time, ': stack', stack.length, 'seen', Object.keys(seen).length, 'processed', processed, 'rel', s.rel);
        }

        if (s.time === T) {
            if (!max || s.rel > max.rel) {
                max = s;
                console.log(max.rel, ': stack', stack.length, 'seen', Object.keys(seen).length);
            }
            continue;
        }

        processed++;
        if (processed % 10000 === 0) {
            console.log(s.time, ': stack', stack.length, 'seen', Object.keys(seen).length, 'processed', processed, 'rel', s.rel);
        }

        for (const move1 of [s.pos1, ...data[s.pos1].neig]) {
            if (move1 === s.pos1 && (data[s.pos1].rate === 0 || s.open.has(s.pos1))) continue;

            for (const move2 of [s.pos2, ...data[s.pos2].neig]) {
                if (move2 === s.pos2 && (data[s.pos2].rate === 0 || s.open.has(s.pos2))) continue;
                if (move1 === s.pos1 && move2 === s.pos2 && move1 === move2) continue;

                const state = {
                    rel: s.rel + s.rate,
                    rate: s.rate,
                    time: s.time + 1,
                    pos1: move1,
                    pos2: move2
                };

                if (move1 !== s.pos1 && move2 !== s.pos2) {
                    state.open = s.open;
                } else {
                    state.open = new Set([...s.open]);
                }

                if (move1 === s.pos1) {
                    state.rate += data[s.pos1].rate;
                    state.open.add(s.pos1);
                }

                if (move2 === s.pos2) {
                    state.rate += data[s.pos2].rate;
                    state.open.add(s.pos2);
                }

                state.comment = [...s.comment, `${s.time}: ${s.pos1}->${move1}, ${s.pos2}->${move2}, rel ${s.rel}, rate ${s.rate}`]

                stack.push(state);
            }
        }
    }

    console.log(max.rel);
    console.log(max.comment.join('\n'));
};

await main();

// WA 693 low
