import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8');
const input = await fs.readFile('input', 'utf8');

const data = input.trimEnd().split(',').map(i => {
    const m = i.match(/([a-z]+)(-|=)([0-9])?/);
    return { l: m[1], o: m[2], ...(m[3] !== undefined ? { n: Number(m[3]) } : undefined) };
});

console.log(data);

const hash = (s) => {
    let curr = 0;

    for (const c of s) {
        const ascii = c.charCodeAt(0);
        curr += ascii;
        curr = curr * 17;
        curr = curr % 256;
    }

    return curr;
};

const boxes = new Array(256).fill(undefined).map(x => ({}));

for (const d of data) {
    const h = hash(d.l);
    if (d.o === '-') {
        delete boxes[h][d.l];
    } else {
        boxes[h][d.l] = d.n;
    }

//    console.log(boxes.filter(b => Object.keys(b).length > 0));
}

let power = 0;

for (const bi in boxes) {
    const b = boxes[bi];
    let slot = 0;

    let pb = 0;
    for (const [key, val] of Object.entries(b)) {
        slot++;
        pb += (1 + Number(bi)) * slot * val;
        console.log(bi, slot, (1 + bi) * slot * val);
    }
    power += pb;

    if (pb) console.log(bi, pb);
}

console.log(power);
