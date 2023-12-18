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

const isViable = (cache, lensre, o) => {
    let viable = cache[o];

    if (viable !== undefined) {
        return viable;
    }

    viable = lensre.test(o);
    cache[o] = viable;

    return viable;
};

for (const d of data) {
    const lensre = new RegExp(`^[.?]*${d.lens.map(l => `[#?]{${l}}`).join('[.?]+')}[.?]*$`);

    const q = [d.map];
    const cache = {};
    let opts = 0;

    while (q.length) {
        let o = q.pop();

        for (let i = 0; i < o.length; i++) {
            if (o[i] === '?') {
                const ds = `${o.slice(0, i)}.${o.slice(i + 1)}`;
                const viableDs = isViable(cache, lensre, ds);
                const hs = `${o.slice(0, i)}#${o.slice(i + 1)}`;
                const viableHs = isViable(cache, lensre, hs);

                if (!viableDs) {
                    o = hs;
                } else if (!viableHs) {
                    o = ds;
                }
            }
        }

        const ds = o.replace('?', '.');
        const hs = o.replace('?', '#');

        if (ds === hs) {
            opts++;
        } else {
            if (isViable(cache, lensre, ds)) q.push(ds);
            if (isViable(cache, lensre, hs)) q.push(hs);
        }
    }

    console.log('opts', opts);

    sum += opts;
}

console.log('result', sum);
