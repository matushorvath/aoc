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

    // let vdict = { 'AA': 0 };
    // let nextvdict = 1;

    // const data = input.trimEnd().split(/\r?\n/).reduce((a, l) => {
    //     const m = l.match(/Valve (.+) has flow rate=(.+); tunnels? leads? to valves? (.+)/);
    //     const vid = vdict[m[1]] ?? (vdict[m[1]] = nextvdict++);
    //     a[vid] = {
    //         v: vid,
    //         f: Number(m[2]),
    //         t: m[3].split(', ').map(n => vdict[n] ?? (vdict[n] = nextvdict++))
    //     };
    //     return a;
    // }, []);

    //console.log(Object.entries(vdict).map(([i, e]) => `{ id: '${i}', label: ${e} }`).join(',\n'));

    console.log('graph G {')
    console.log(Object.values(data).map(e => `${e.v}` + (e.f ? ` [label="${e.v} ${e.f}"]` : '')).join('\n'));
    console.log(Object.values(data).map(e => e.t.map(n => e.v < n ? `${e.v} -- ${n}`: '').join('\n')).join('\n\n'));
    console.log('}')
};

await main();
