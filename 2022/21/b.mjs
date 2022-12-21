'use strict';

import fs from 'fs/promises';

const main = async () => {
    //const input = await fs.readFile('example', 'utf8');
    const input = await fs.readFile('input', 'utf8');
    const data = Object.fromEntries(input.trimEnd().split(/\r?\n/).map(l => {
        //const m = l.match(/(.+): (\d+)|(?:(.+) (\+-\*\/) (.+))/);
        const m = l.match(/(.+): (?:(\d+)|(.+) (.) (.+))/);
        return [
            m[1],
            m[2] ? {
                n: Number(m[2])
            } : {
                p1: m[3],
                o: m[4],
                p2: m[5]
            }
        ];
    }));
    data['root'].o = '==';
    data['humn'].n = 'x';

    let m;
    const s = ['root'];
    const n = {};
    const o = [];

    while (m = s.pop()) {
        if (data[m].n) {
            n[m] = data[m].n;
        } else {
            o.push(m);
            s.push(data[m].p1, data[m].p2);
        }
    }

    while (m = o.pop()) {
        if (typeof n[data[m].p1] === 'number' && typeof n[data[m].p2] === 'number') {
            n[m] = eval(`${n[data[m].p1]} ${data[m].o} ${n[data[m].p2]}`);
        } else {
            n[m] = `(${n[data[m].p1]} ${data[m].o} ${n[data[m].p2]})`;
        }
    }

    console.log(n['root']);
};

await main();
