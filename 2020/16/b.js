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

const canbe = Array(ticket[0].length).fill()
    .map((_, i) => ({ i, fs: rules
        .filter(r => ticket.every(t =>
            (t[i] >= r.r1[0] && t[i] <= r.r1[1]) ||
            (t[i] >= r.r2[0] && t[i] <= r.r2[1])
        ))
        .map(r => r.n)
    }))
    .sort((a, b) => a.fs.length - b.fs.length);

const is = canbe.reduce((p, c) => [...p, {
    i: c.i,
    f: c.fs.filter(f => p.every(i => f !== i.f))[0]
}], []);

const your = yds.split('\n')[1].split(',').map(s => parseInt(s, 10));

const mul = is
    .map(({ i, f }) => /^departure/.test(f) ? your[i] : 1)
    .reduce((p, c) => p * c, 1);

console.log(mul);
