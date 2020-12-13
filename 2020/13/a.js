const data = require('fs').readFileSync('input', 'utf8').trim().split('\n');

const n = parseInt(data[0], 10);

const bs = data[1].split(',').filter(i => i !== 'x').map(i => parseInt(i, 10));

let minb = bs[0];
let minmod = 1000000000;

for (const b of bs) {
    const mod = b * Math.floor(n / b) + b - n;
    console.log(mod);
    if (mod < minmod) {
        minmod = mod;
        minb = b;
    }
}

console.log(minb, minmod, minb * minmod);
