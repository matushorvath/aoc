console.log((([rules, your, tickets]) => Array(rules.length).fill()
    .map((_, i) => ({ i, fs: rules
        .filter(r => tickets.filter(t => t.every(n => rules.some(r =>
            (n >= r.r1[0] && n <= r.r1[1]) ||
            (n >= r.r2[0] && n <= r.r2[1])
        ))).every(t =>
            (t[i] >= r.r1[0] && t[i] <= r.r1[1]) ||
            (t[i] >= r.r2[0] && t[i] <= r.r2[1])
        ))
        .map(r => r.n)
    }))
    .sort((a, b) => a.fs.length - b.fs.length)
    .reduce((p, c) => [...p, {
        i: c.i,
        f: c.fs.filter(f => p.every(i => f !== i.f))[0]
    }], [])
    .map(({ i, f }) => /^departure/.test(f) ? your[i] : 1)
    .reduce((p, c) => p * c, 1)
)((([rds, yds, nds]) => [
    rds.split('\n').map(rd =>
        (([_, n, r1f, r1t, r2f, r2t]) => ({
            n,
            r1: [parseInt(r1f, 10), parseInt(r1t, 10)],
            r2: [parseInt(r2f, 10), parseInt(r2t, 10)]
        }))(rd.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/))
    ),
    yds.split('\n')[1].split(',').map(s => parseInt(s, 10)),
    nds.split('\n').slice(1).map(r => r.split(',').map(s => parseInt(s, 10)))
])(require('fs').readFileSync('input', 'utf8').trim().split('\n\n'))));
