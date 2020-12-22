const [p1, p2] = require('fs').readFileSync('input', 'utf8')
    .trim().split('\n\n')
        .map(p => p.split('\n').slice(1)
            .map(l => parseInt(l)));

const game = (p1, p2, deep) => {
    const mx1 = p1.reduce((p, c) => c > p ? c : p, 0);
    const mx2 = p2.reduce((p, c) => c > p ? c : p, 0);

    if (deep && mx1 > mx2) {
        return [1, undefined];
    }

    const was = {};

    while (p1.length > 0 && p2.length > 0) {
        const k = `${p1.join(',')}|${p2.join(',')}`;
        if (was[k]) {
            return [1, p1];
        }
        was[k] = true;

        const c1 = p1.shift();
        const c2 = p2.shift();

        let w;
        if (c1 <= p1.length && c2 <= p2.length) {
            [w] = game(p1.slice(0, c1), p2.slice(0, c2), true);
        } else {
            w = c1 > c2 ? 1 : 2;
        }

        if (w === 1) {
            p1.push(c1);
            p1.push(c2);
        } else {
            p2.push(c2);
            p2.push(c1);
        }
    }

    const w = p1.length > 0 ? 1 : 2;
    return [w, w === 1 ? p1 : p2];
};

const [, p] = game(p1, p2);

let sum = 0;
for (let i = 0; i < p.length; i++) {
    sum += p[i] * (p.length - i);
}

console.log(sum);
