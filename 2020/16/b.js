const [rds, yds, nds] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

const rules = rds.split('\n').map(rd => {
    const m = rd.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return {
        n: m[1],
        r1: [parseInt(m[2], 10), parseInt(m[3], 10)],
        r2: [parseInt(m[4], 10), parseInt(m[5], 10)]
    };
});

const valid = nds.split('\n').slice(1)
    .map(r => r.split(',').map(s => parseInt(s, 10)))
    .filter(t => t.every(n => rules.some(r =>
        (n >= r.r1[0] && n <= r.r1[1]) ||
        (n >= r.r2[0] && n <= r.r2[1])
    )));

const fields = rules.map(r => r.n).reduce((p, c) => ({ ...p, [c]: true }), {});
const canbe = [...Array(valid[0].length)].map(v => ({ ...fields }));

for (const t of valid) {
    for (const i in t) {
        const n = t[i];
        for (const r of rules) {
            if ((n < r.r1[0] || n > r.r1[1]) && (n < r.r2[0] || n > r.r2[1])) {
                delete canbe[i][r.n];
            }
        }
    }
}

const is = [];

for (let f = 0; f < canbe.length; f++) {
    const next = Object.keys(canbe.filter(c => Object.keys(c).length === 1)[0])[0];

    for (const i in canbe) {
        const c = canbe[i];
        if (Object.keys(c).length === 1) {
            is[i] = next;
        }
        delete c[next];
    }
}

const your = yds.split('\n')[1]
    .split(',').map(s => parseInt(s, 10));

const mul = is
    .map((v, i) => /^departure/.test(v) ? your[i] : 1)
    .reduce((p, c) => p * c, 1);

console.log(mul);
