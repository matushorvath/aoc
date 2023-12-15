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

//console.log(data);

// const isViable = (o, l) => {
//     const lens = [...l];
//     let curr = 0;

//     for (let i = 0; i < o.length; i++) {
//         let c = o[i];

//         if (c === '?') {
//             if (curr > 0 && curr < lens[0]) c = '#';
//             else if (curr > 0 && curr === lens[0]) c = '.';

//         if (curr !== 0 && c === '.') {
//             if (curr !== lens.shift()) return false;
//             curr = 0;
//         }

//         if (c === '#') {
//             curr++;
//         }
//     }

//     if (curr > 0 && curr !== lens.shift()) return false;
//     if (lens.length > 0) return false;
//     return true;
// };

let sum = 0;

for (const d of data) {
    const q = [d.map];
    let opts = 0;

    const lensre = new RegExp(`^[.?]*${d.lens.map(l => `[#?]{${l}}`).join('[.?]+')}[.?]*$`);

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
