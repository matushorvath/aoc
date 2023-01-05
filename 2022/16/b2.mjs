'use strict';

import fs from 'fs/promises';
import stringify from 'json-stringify-pretty-compact';

const print = dist => console.log(dist.map(row => row.map(d => String(d === undefined ? '-' : d.cost).padStart(3, ' ')).join(', ')).join('\n'));

const main = async () => {
    //const input = await fs.readFile('simple', 'utf8');
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');

    const vids = {};
    let nextvid = 0;
    const getvid = name => vids[name] ?? (vids[name] = nextvid++);

    const data = input.trimEnd().split(/\r?\n/).map(l => {
        const m = l.match(/Valve (.+) has flow rate=(.+); tunnels? leads? to valves? (.+)/);
        return {
            id: getvid(m[1]),
            name: m[1],
            rate: Number(m[2]),
            neig: m[3].split(', ')
        };
    });
    for (const valve of data) {
        valve.neig = valve.neig.map(nn => getvid(nn));
    }

    const names = Object.fromEntries(Object.entries(vids).map(([k, v]) => [v, k]));

    console.log(stringify(data));

    const dist = [];

    for (const valve1 of data) {
        dist[valve1.id] = Array(data.length).fill(undefined);
        dist[valve1.id][valve1.id] = { cost: 0, route: [] };

        for (const vid2 of valve1.neig) {
            dist[valve1.id][vid2] = { cost: 1, route: [valve1.id] };
        }
    }

    // console.log();
    // print(dist);

    let changed = true;
    while (changed) {
        changed = false;
        for (let vid1 = 0; vid1 < dist.length; vid1++) {
            for (let vid2 = 0; vid2 < dist.length; vid2++) {
                if (dist[vid1][vid2] !== undefined) {
                    for (let vid3 = 0; vid3 < dist.length; vid3++) {
                        if (dist[vid2][vid3] !== undefined) {
                            if (dist[vid1][vid3] === undefined || dist[vid1][vid3].cost > dist[vid1][vid2].cost + dist[vid2][vid3].cost) {
                                if (dist[vid1][vid3] === undefined) dist[vid1][vid3] = {};
                                if (dist[vid3][vid1] === undefined) dist[vid3][vid1] = {};
                                dist[vid3][vid1].cost = dist[vid1][vid3].cost = dist[vid1][vid2].cost + dist[vid2][vid3].cost;
                                dist[vid1][vid3].route = [...dist[vid1][vid2].route, ...dist[vid2][vid3].route];
                                dist[vid3][vid1].route = [...dist[vid3][vid2].route, ...dist[vid2][vid1].route];
                                changed = true;
                            }
                        }
                    }
                }
            }
        }
    }

    // console.log();
    // print(dist);

    const T = 26;

    const stack = [{ rel: 0, ac: [{ time: 0, pos: vids['AA'] }, { time: 0, pos: vids['AA'] }], open: new Set(), comment: [] }];
    const seen = {};

    let max;

    let state;
    while ((state = stack.pop()) && (max === undefined || max.rel < 2416)) {
        const key = `${state.ac[0].pos} ${state.ac[1].pos} ${state.rel} ${[...state.open].sort().join(' ')}`;
        if (seen[key] !== undefined && seen[key][0] <= state.ac[0].time && seen[key][1] <= state.ac[1].time) continue;
        seen[key] = [state.ac[0].time, state.ac[1].time];

        const idx = state.ac[0].time < state.ac[1].time ? 0 : 1;
        const oth = idx === 1 ? 0 : 1;

        if (max === undefined || max.rel < state.rel) {
            max = state;
            console.log('time', max.ac[0].time, max.ac[1].time, 'rel', max.rel, 'open', max.open.size);
        }

        const newopen = new Set([...state.open, state.ac[idx].pos]);
        const openable = data.filter(v => v.rate > 0 && !newopen.has(v.id));

        for (const move1 of openable) if (move1.id !== state.ac[0].pos && move1.id !== state.ac[1].pos ) {
            const newstate = {
                rel: state.rel + data[move1.id].rate * (T - state.ac[idx].time - dist[state.ac[idx].pos][move1.id].cost - 1),
                ac: [...state.ac],
                open: newopen
            };

            newstate.ac[idx] = {
                time: state.ac[idx].time + dist[state.ac[idx].pos][move1.id].cost + 1,
                pos: move1.id
            };

            newstate.comment = [
                ...state.comment,
                [
                    `${newstate.ac[idx].time + 1}: [${idx}]: `,
                    `${dist[state.ac[idx].pos][move1.id].route.map(vid => `${names[vid]}(${vid})`)},${names[newstate.ac[idx].pos]}(${newstate.ac[idx].pos}), `,
                    `rel ${newstate.rel}`
                ].join('')
            ];

            if (newstate.ac[idx].time < T) stack.push(newstate);
        }

        // don't do anything until end option
        if (state.ac[oth].time < T) {
            const newstate = {
                rel: state.rel,
                ac: [...state.ac],
                open: newopen,
                comment: state.comment
            };

            newstate.ac[idx] = {
                time: 30,
                pos: state.pos
            };

            stack.push(newstate);
        }
    }

    console.log(max?.rel);
    console.log(max?.comment?.join('\n'));
};

await main();
