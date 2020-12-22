const [d1, d2] = require('fs').readFileSync('input', 'utf8').trim()
    .split('\n\n').map(p => p.split('\n'));

const parsePlayer = (d) => {
    const [head, ...deck] = d;
    return deck.map(c => parseInt(c, 10));
};

console.log(d1, d2);

let p1 = parsePlayer(d1);
let p2 = parsePlayer(d2);

let c1, c2;

while (p1.length > 0 && p2.length > 0) {
    console.log('-----');
    console.log('P1', p1);
    console.log('P2', p2);

    [c1, ...p1] = p1;
    [c2, ...p2] = p2;

    console.log('C1', c1);
    console.log('C2', c2);

    if (c1 > c2) {
        p1 = [...p1, c1, c2];
    } else {
        p2 = [...p2, c2, c1];
    }
}

const p = p1.length > 0 ? p1 : p2;

let sum = 0;
for (let i = 0; i < p.length; i++) {
    sum += p[i] * (p.length - i);
}

console.log(sum);
