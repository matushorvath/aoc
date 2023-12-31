import fs from 'fs/promises';

//const input = await fs.readFile('example', 'utf8'); const areaMin = 7, areaMax = 27;
const input = await fs.readFile('input', 'utf8'); const areaMin = 200000000000000, areaMax = 400000000000000;

const data = input.trimEnd().split(/\r?\n/).map(r => {
    const m = r.match(/([-0-9]+), +([-0-9]+), +([-0-9]+) +@ +([-0-9]+), +([-0-9]+), +([-0-9]+)/);
    return {
        p: { x: Number(m[1]), y: Number(m[2]), z: Number(m[3]) },
        v: { x: Number(m[4]), y: Number(m[5]), z: Number(m[6]) }
    };
});

//console.log(data);

let res = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
        const h1 = data[i];
        const h2 = data[j];

        const { p: p1, v: v1 } = h1;
        const { p: p2, v: v2 } = h2;

        const a = ((p1.y - p2.y) / v2.y - (p1.x - p2.x) / v2.x) / (v1.x / v2.x - v1.y / v2.y);
        const b = ((p2.y - p1.y) / v1.y - (p2.x - p1.x) / v1.x) / (v2.x / v1.x - v2.y / v1.y);

        if (!isFinite(a) || !isFinite(b)) {
            //console.log(h1, h2, 'never meet');
        } else if (a >= 0 && b >= 0) {
            const cmn = { x: v1.x * a + p1.x, y: v1.y * a + p1.y };
            const inside = cmn.x >= areaMin && cmn.x <= areaMax && cmn.y >= areaMin && cmn.y <= areaMax;
            if (inside) res++;
            //console.log(h1, h2, `meet ${inside ? 'inside' : 'outside'} at ${[cmn.x, cmn.y]}`);
        } else if (a < 0 && b < 0) {
            //console.log(h1, h2, 'met in past for both');
        } else if (a < 0) {
            //console.log(h1, h2, 'met in past for A');
        } else if (b < 0) {
            //console.log(h1, h2, 'met in past for B');
        }
    }
}

console.log('result', res);

/*
x = v1x * a + p1x
y = v1y * a + p1y

x = v2x * b + p2x
y = v2y * b + p2y

p = v1 * a + p1
p = v2 * b + p2

v1 * a + p1 = v2 * b + p2

v1x * a + p1x = v2x * b + p2x
v1y * a + p1y = v2y * b + p2y

a = (v2x * b + p2x - p1x) / v1x
a = (v2y * b + p2y - p1y) / v1y

(v2x * b + p2x - p1x) / v1x = (v2y * b + p2y - p1y) / v1y

b * v2x / v1x + (p2x - p1x) / v1x = b * v2y / v1y + (p2y - p1y) / v1y

b * (v2x / v1x - v2y / v1y) = (p2y - p1y) / v1y - (p2x - p1x) / v1x

b = ((p2y - p1y) / v1y - (p2x - p1x) / v1x) / (v2x / v1x - v2y / v1y);
*/
