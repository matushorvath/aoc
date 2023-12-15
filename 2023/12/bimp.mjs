import fs from 'fs/promises';

const input = await fs.readFile('example', 'utf8');
//const input = await fs.readFile('input', 'utf8');

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
        return false;
    }

    viable = lensre.test(o);
    cache[o] = viable;

    return viable;
};

const isNew = (cache, o) => cache[o] === undefined;

for (const d of data) {
    const q = [d.map];
    let opts = new Set();
    const cache = {};

    const lensre = new RegExp(`^[.!?]*${d.lens.map(l => `[#!?]{${l}}`).join('[.!?]+')}[.!?]*$`);

    while (q.length) {
        const o = q.pop();

        let hasQ = false;
        for (let i = 0; i < o.length; i++) {
            if (o[i] === '?') {
                hasQ = true;

                const ds = `${o.slice(0, i)}.${o.slice(i + 1)}`;
                const viableDs = isViable(cache, lensre, ds);
                const hs = `${o.slice(0, i)}#${o.slice(i + 1)}`;
                const viableHs = isViable(cache, lensre, hs);

                if (viableDs && viableHs) {
                    q.push(`${o.slice(0, i)}!${o.slice(i + 1)}`);
                } else if (viableDs) {
                    q.push(ds);
                } else if (viableHs) {
                    q.push(hs);
                }
            }
        }

        if (!hasQ) {
            opts.add(o);
        }
        // if (!changed && isViable(lensre, o)) {
        //     opts.push(2 ** [...o].filter(c => c === '?').length);
        // }
    }

    //const dcnt = opts.reduce((p, c) => p + c, 0);
    console.log('opts', opts);
    //sum += optscnt;
}

console.log('result', sum);
