const [rds, yds, nds] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n');

const rules = rds.split('\n').map(rd => {
    const m = rd.match(/(\w+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return {
        n: m[1],
        r1: [parseInt(m[2], 10), parseInt(m[3], 10)],
        r2: [parseInt(m[4], 10), parseInt(m[5], 10)]
    };
});

const invalid = nds.split('\n').slice(1).map(
    r => r.split(',').map(s => parseInt(s, 10)).filter(n =>
        rules.every(r =>
            (n < r.r1[0] || n > r.r1[1]) &&
            (n < r.r2[0] || n > r.r2[1])
        )
    )
).flat();

const sum = invalid.reduce((p, c) => p + c, 0);

console.log(invalid, sum);
