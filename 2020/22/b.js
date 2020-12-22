const mjs = require('mathjs');

const [d1, d2] = require('fs').readFileSync('input', 'utf8').trim()
    .split('\n\n').map(p => p.split('\n'));

const parsePlayer = (d) => {
    const [head, ...deck] = d;
    return deck.map(c => parseInt(c, 10));
};

// console.log(d1, d2);

let p1 = parsePlayer(d1);
let p2 = parsePlayer(d2);

let gnum = 1;

const game = (p1, p2) => {
    const thisGame = gnum;
    gnum++;
    // console.log(`\n=== Game ${thisGame} ===`);

    if (p1.every(c => c > p1.length) || p2.every(c => c > p2.length)) {
        const mx1 = p1.reduce((p, c) => c > p ? c : p, 0);
        const mx2 = p2.reduce((p, c) => c > p ? c : p, 0);

        const w = mx1 > mx2 ? 1 : 2;
        // console.log('SW', w);
        return [w, undefined];
    }

    let c1, c2;
    let round = 0;
    //let roundCount = mjs.lcm(p1.length, p2.length);

    const was = {};

    //while (round < roundCount && p1.length > 0 && p2.length > 0) {
    while (p1.length > 0 && p2.length > 0) {
        // console.log(`\n--- Round ${round + 1} (Game ${thisGame}) ---`);

        // console.log('P1', p1.join(', '));
        // console.log('P2', p2.join(', '));

        const k = `${p1.join('')}|${p2.join('')}`;
        if (was[k]) {
            // console.log('CW', 1);
            return [1, p1];
        }
        was[k] = true;

        c1 = p1.shift();
        c2 = p2.shift();

        // console.log('C1', c1);
        // console.log('C2', c2);

        if (c1 <= p1.length && c2 <= p2.length) {
            const [w] = game(p1.slice(0, c1), p2.slice(0, c2));

            if (w === 1) {
                p1 = [...p1, c1, c2];
            } else {
                p2 = [...p2, c2, c1];
            }
        } else {
            if (c1 > c2) {
                p1 = [...p1, c1, c2];
            } else {
                p2 = [...p2, c2, c1];
            }
        }

        round++;
    }

    // console.log(p1, p2);

    const w = p1.length > 0 ? 1 : 2;
    // console.log('NW', w);
    return [w, w === 1 ? p1 : p2];
};

const [w, p] = game(p1, p2);

//console.log(p);

let sum = 0;
for (let i = 0; i < p.length; i++) {
    sum += p[i] * (p.length - i);
}

console.log(sum);
