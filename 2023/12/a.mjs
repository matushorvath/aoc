import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const [map, rle] = r.split(' ');
    return {
        map, lens: rle.split(',').map(Number)
    }
});

console.log(data);

const isValid = (o, lens) => {
    let curr = 0;
    for (let i = 0; i < o.length; i++) {
        const c = o[i];
        if (curr !== 0 && c !== '#') {
            if (curr !== lens.shift()) return false;
            curr = 0;
        }
        if (c === '#') {
            curr++;
        }
    }
    if (curr > 0 && curr !== lens.shift()) return false;
    if (lens.length > 0) return false;
    return true;
};

//isValid('#.#.###', [1, 1, 3]);
let sum = 0;

for (const d of data) {
    const q = [d.map];
    const opts = [];
    while (q.length) {
        const o = q.pop();
        const ds = o.replace('?', '.');
        const hs = o.replace('?', '#');
        if (ds === hs) opts.push(o);
        else q.push(ds, hs);
    }

//    console.log('opts', opts.length);

    const ok = opts.filter(o => isValid(o, [...d.lens]));
    //console.log('ok', ok.length);
    sum += ok.length;
}

console.log('result', sum);
