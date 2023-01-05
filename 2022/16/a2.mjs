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

    const T = 30; // TODO pos2 26

    const stack = [{ rel: 0, time: 0, pos1: vids['AA'], /*pos2: vids['AA'], */open: new Set(), comment: [] }];
    const seen = {};

    let max;

    let state;
    while (state = stack.pop()) {
        // const key = `${state.pos1} ${state.pos2} ${state.rel} ${[...state.open].sort().join(' ')}`;
        // if (seen[key] !== undefined && seen[key] <= state.time) continue;
        // seen[key] = state.time;

        if (max === undefined || max.rel < state.rel) {
            max = state;
            //console.log('time', max.time, 'rel', max.rel, 'open', max.open.size);
        }

        const openable = data.filter(v => v.rate > 0 && !state.open.has(v.id));

        for (const move1 of openable) if (move1.id !== state.pos1) {
            // for (const move2 of openable) if (move2.id !== state.pos2 && move2.id !== move1.id) {
                const newstate = {
                    rel: state.rel + data[move1.id].rate * (T - state.time - dist[state.pos1][move1.id].cost - 1),
                    time: state.time + dist[state.pos1][move1.id].cost + 1,
                    pos1: move1.id,
                    open: new Set([...state.open, move1.id])
                };

                newstate.comment = [
                    ...state.comment,
                    [
                        `${newstate.time + 1}: ${dist[state.pos1][move1.id].route.map(vid => `${names[vid]}(${vid})`)},`,
                        `${names[newstate.pos1]}(${newstate.pos1}), rel ${newstate.rel}`
                    ].join('')
                ];

                if (newstate.time < T) stack.push(newstate);
            // }
        }
    }

    console.log(max?.rel);
    console.log(max?.comment?.join('\n'));
};

await main();
