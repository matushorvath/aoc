const [rds, yds, nds] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

const rules = rds.split('\n').map(rd => {
    const m = rd.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return {
        n: m[1],
        r1: [parseInt(m[2], 10), parseInt(m[3], 10)],
        r2: [parseInt(m[4], 10), parseInt(m[5], 10)]
    };
});

const ticket = nds.split('\n').slice(1)
    .map(r => r.split(',').map(s => parseInt(s, 10)))
    .filter(t => t.every(n => rules.some(r =>
        (n >= r.r1[0] && n <= r.r1[1]) ||
        (n >= r.r2[0] && n <= r.r2[1])
    )));

const canbe = Array(ticket[0].length).fill().map((_, i) => rules
    .filter(r => ticket.every(t =>
        (t[i] >= r.r1[0] && t[i] <= r.r1[1]) ||
        (t[i] >= r.r2[0] && t[i] <= r.r2[1])
    ))
    .map(r => r.n)
);

const is = [];

for (let f = 0; f < canbe.length; f++) {
    const next = canbe.filter(c => c.length === 1)[0][0];
    for (const i in canbe) {
        if (canbe[i].length === 1) {
            is[i] = next;
        }
        canbe[i] = canbe[i].filter(c => c !== next);
    }
}

console.log(is);

const your = yds.split('\n')[1]
    .split(',').map(s => parseInt(s, 10));

const mul = is
    .map((v, i) => /^departure/.test(v) ? your[i] : 1)
    .reduce((p, c) => p * c, 1);

console.log(mul);
