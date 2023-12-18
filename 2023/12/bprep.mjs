import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const [map, rle] = r.split(' ');
    return {
        map, lens: rle.split(',').map(Number)
    }
}).map(d => {
    return {
        map: d.map.concat('?', d.map, '?', d.map, '?', d.map, '?', d.map),
        lens: [...d.lens, ...d.lens, ...d.lens, ...d.lens, ...d.lens]
    }
});

let sum = 0;

for (const d of data) {
    const lensre = new RegExp(`^[.?]*${d.lens.map(l => `[#?]{${l}}`).join('[.?]+')}[.?]*$`);

    let map = d.map;
    let totalQ = 0, removedQ = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i] === '?') {
            const ds = `${map.slice(0, i)}.${map.slice(i + 1)}`;
            const viableDs = lensre.test(ds);
            const hs = `${map.slice(0, i)}#${map.slice(i + 1)}`;
            const viableHs = lensre.test(hs);

            totalQ++;
            if (!viableDs) {
                removedQ++;
                map = hs;
            } else if (!viableHs) {
                removedQ++;
                map = ds;
            }
        }
    }

    console.log('total, removed', totalQ, removedQ);

    const q = [map];
    let opts = 0;

    while (q.length) {
        const o = q.pop();

        const ds = o.replace('?', '.');
        const hs = o.replace('?', '#');

        if (ds === hs) {
            opts++;
        } else {
            if (lensre.test(ds)) q.push(ds);
            if (lensre.test(hs)) q.push(hs);
        }
    }

    console.log('opts', opts);

    sum += opts;
}

console.log('result', sum);
